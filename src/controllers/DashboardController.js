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

    if (typeof id === 'undefined' || isNaN(id)) {
      return res.status(400).json({ message: 'ID de evento no válido' });
    }

    try {

      const event = await Event.findByPk(id, {
        include: [
          {
            model: Location,
            as: 'location',
            attributes: ['capacity'],
          },
        ],
      });

      if (!event) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

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
        },
      });

      const location = event.location;

      const users = await EventUser.findAll({
        where: { event_id: id },
        attributes: ['user_id', 'arriveTime', 'leaveTime'],
      });

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
        id: result.typeId,
        typeName: result.typeName,
        typeCount: result.typeCount,
      }));

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

      const formattedUserResults = userCounts.map((result) => ({
        country: result.country,
        userCount: result.total,
      }));


      const fullEvent = event.toJSON(); 


      const response = {
          title: event.title, // Titulo evento
          description: event.description, // Descripción evento
          speacker: event.speacker, // Orador evento
          day: formatDateTime(event.dateTime).split('-')[0], // Día evento
          month: formatDateTime(event.dateTime).split('-')[1], // Mes evento
          attendees: {
            registered: uniqueUserCount, // Nº usuarios inscritos
            confirmed: confirmedAttendees, // Nº usuarios confirmados
            present: attendeeCount, // Nº usuarios asistentes q han pasado el qr
          },
          capacity: location.capacity, // Nº de aforo
          entry_exit: entryExitData, // Reistro de entradas y salidas
          nationality: formattedUserResults, // Nº de personas y países
          type: formattedResults,  // Nº de personas y organizaciones
    
      };

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  },
};

module.exports = DashboardController;