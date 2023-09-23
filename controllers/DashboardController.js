const { EventUser, Event, User, Location, Type, Organization } = require("../models/index.js");
const { Sequelize } = require('sequelize');


function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const day = date.getDate().toString().padStart(2, '0'); 
  const month = getMonthInLetters(date.getMonth() + 1); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function getMonthInLetters(monthNumber) {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[monthNumber - 1];
}

const DashboardController = {
async getEventById(req, res) {
    const { id } = req.params;

    try {
      const eventUser = await EventUser.findOne({
        where: { event_id: id },
        include: [
          {
            model: Event,
            as: 'Event',
          },
        ],
      });

      if (!eventUser) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      const event = eventUser.Event;
      const formattedDateTime = formatDateTime(event.dateTime);
      
      const [day, month] = formattedDateTime.split('-');

      return res.status(200).json({ ...event.toJSON(), day, month });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
},

async getCapacity(req, res) {
  const { id } = req.params;

  if (typeof id === 'undefined' || isNaN(id)) {
    return res.status(400).json({ message: 'ID de evento no válido' });
  }

  try {
    const event = await EventUser.findOne({
      where: { id },
      include: [
        {
          model: Event,
          as: 'Event',
          include: [
            {
              model: Location,
              as: 'location',
              attributes: ['capacity'],
            },
          ],
        },
      ],
    });

    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    const location = event.Event.location;
    return res.status(200).json(location);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
},

async getSpeacker(req, res) {
  const { id } = req.params;

  if (typeof id === 'undefined' || isNaN(id)) {
      return res.status(400).json({ message: 'ID de evento no válido' });
  }

  try {
      const event = await EventUser.findOne({
          where: { event_id: id },
          include: [
              {
                  model: Event,
                  as: 'Event',
                  attributes: ['speacker'], 
              },
          ],
      });

      if (!event) {
          return res.status(404).json({ message: 'Evento no encontrado' });
      }

      const speackerName = event.Event.speacker;

      return res.status(200).json({ speacker: speackerName });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
  }
}, 

async getTimes(req, res) {
  const { id } = req.params;

  if (typeof id === 'undefined' || isNaN(id)) {
    return res.status(400).json({ message: 'ID de evento no válido' });
  }

  try {
    const users = await EventUser.findAll({
      where: { event_id: id },
      attributes: ['user_id', 'arriveTime', 'leaveTime'],
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios para este evento' });
    }

    const entryCounts = {};
    const exitCounts = {};

    function roundToHour(date) {
      const roundedDate = new Date(date);
      roundedDate.setMinutes(0, 0, 0);
      return roundedDate;
    }
    function formatHour(date) {
      return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
    }

    users.forEach((user) => {
      const roundedArrivalTime = roundToHour(user.arriveTime);
      const roundedDepartureTime = roundToHour(user.leaveTime);

      if (!entryCounts[formatHour(roundedArrivalTime)]) {
        entryCounts[formatHour(roundedArrivalTime)] = 1;
      } else {
        entryCounts[formatHour(roundedArrivalTime)]++;
      }

      if (!exitCounts[formatHour(roundedDepartureTime)]) {
        exitCounts[formatHour(roundedDepartureTime)] = 1;
      } else {
        exitCounts[formatHour(roundedDepartureTime)]++;
      }
    });

    const entryExitData = [
      {
        id: 'Entradas',
        data: [],
      },
      {
        id: 'Salidas',
        data: [],
      },
    ];

    for (const [hour, count] of Object.entries(entryCounts)) {
      entryExitData[0].data.push({
        x: hour, 
        y: count,
      });
    }

    for (const [hour, count] of Object.entries(exitCounts)) {
      entryExitData[1].data.push({
        x: hour, 
        y: count,
      });
    }

    return res.status(200).json({ entry_exit: entryExitData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
},

async getType(req, res) {
  const { id } = req.params; 

  try {
    const typeCounts = await EventUser.count({
      where: { event_id: id },
      include: [
        {
          model: User,
          as: 'User',
          include: [
            {
              model: Organization,
              as: 'organization',
              include: [
                {
                  model: Type,
                  as: 'type',
                  attributes: ['id', 'name'],
                },
              ],
            },
          ],
        },
      ],
      group: ['User.organization.type.id'], 
      attributes: [
        [Sequelize.col('User.organization.type.id'), 'typeId'],
        [Sequelize.col('User.organization.type.name'), 'typeName'],
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'typeCount'], 
      ],
    });

    const formattedResults = typeCounts.map((result) => ({
      id: result.typeName,
      label: result.typeName,
      value: result.typeCount,
    }));

    return res.status(200).json(formattedResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
},

async getAttendees(req, res) {
  const { id } = req.params;

  if (typeof id === 'undefined' || isNaN(id)) {
    return res.status(400).json({ message: 'ID de evento no válido' });
  }

  try {
    const uniqueUserCount = await EventUser.count({
      distinct: true,
      col: 'user_id',
      where: {
        event_id: id,
      },
    });

    const attendeeCount = await EventUser.count({
      where: {
        event_id: id,
        arriveTime: {
          [Sequelize.Op.not]: null,
        },
      },
    });

    const confirmedAttendees = await EventUser.count({
      where: {
        event_id: id,
        '$User.confirmed$': true,
      },
      include: [
        {
          model: User,
          as: 'User',
          attributes: [],
        },
      ],
    });

    return res.status(200).json({
      attendees: {
        registered: uniqueUserCount,
        confirmed: confirmedAttendees,
        present: attendeeCount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
},

async getUserById(req, res) {
  const { id } = req.params;

  if (typeof id === 'undefined' || isNaN(id)) {
      return res.status(400).json({ message: 'ID de usuario no válido' });
  }

  try {
      const user = await EventUser.findOne({
          where: { user_id: id },
          include: [
              {
                  model: User,
                  as: 'User',
              },
          ],
      });

      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      return res.status(200).json(user);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
  }
},

async getCountry(req, res) {
  const { id } = req.params;

  if (typeof id === 'undefined' || isNaN(id)) {
    return res.status(400).json({ message: 'ID de evento no válido' });
  }

  try {
    const userCounts = await EventUser.findAll({
      where: { event_id: id },
      include: {
        model: User,
        as: 'User',
        attributes: ['country'],
      },
      attributes: [
        [Sequelize.col('User.country'), 'country'],
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'total'],
      ],
      group: ['User.country'],
      raw: true,
    });

    const formattedResults = userCounts.map((result) => ({
      country: result.country,
      [result.country]: result.total,
    }));

    return res.status(200).json(formattedResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
},

};

module.exports = DashboardController;