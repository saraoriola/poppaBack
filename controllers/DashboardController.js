const { EventUser, Event, User, Location } = require("../models/index.js");
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

  async getArrivalAndDepartureTimeForEvent(req, res) {
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
  
      const hourOptions = { hour: '2-digit', minute: '2-digit' };
  
      const userTimes = {};
      users.forEach((user) => {
        userTimes[user.user_id] = {
          arriveTime: user.arriveTime.toLocaleTimeString('es-ES', hourOptions),
          leaveTime: user.leaveTime.toLocaleTimeString('es-ES', hourOptions),
        };
      });
  
      return res.status(200).json(userTimes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  },
  
  async countAttendeesForEvent(req, res) {
    const { id } = req.params;
  
    if (typeof id === 'undefined' || isNaN(id)) {
      return res.status(400).json({ message: 'ID de evento no válido' });
    }
  
    try {
      const attendeeCount = await EventUser.count({
        where: {
          event_id: id,
          arriveTime: {
            [Sequelize.Op.not]: null, 
          },
        },
      });
  
      return res.status(200).json({ attendees: attendeeCount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  },

  async getSpeackerName(req, res) {
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

async getLocationDescription(req, res) {
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

async countConfirmedAttendeesForEvent(req, res) {
  const { id } = req.params;

  if (typeof id === 'undefined' || isNaN(id)) {
    return res.status(400).json({ message: 'ID de evento no válido' });
  }

  try {
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

    return res.status(200).json({ confirmedAttendees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
},

async countInterested(req, res) {
  const { id } = req.params;

  try {
    const uniqueUserCount = await EventUser.count({
      distinct: true,
      col: 'user_id',
      where: {
        event_id: id,
      },
    });

    return res.status(200).json({ count: uniqueUserCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
},

async countUsersByCountryForEvent(req, res) {
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
      attributes: [],
      group: ['User.country'],
      raw: true,
      attributes: [
        [Sequelize.col('User.country'), 'country'],
      ],
    });

    return res.status(200).json(userCounts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
}

};

module.exports = DashboardController;
