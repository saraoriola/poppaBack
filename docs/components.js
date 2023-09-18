module.exports = {
  components: {
    schemas: {
      user: {
        type: "object",

        properties: {
          id: {
            type: "objectId",
            description: "User identification number",
            example: "1",
          },

          name: {
            type: "string",
            description: "A user name",
            example: "Ethan",
          },

          organization_id: {
            type: "integer",
            description: "A organization identification number",
            example: "2",
          },

          surname: {
            type: "string",
            description: "A user surname",
            example: "Anderson",
          },

          email: {
            type: "string",
            description: "A user email",
            example: "anderson@example.es",
          },

          password: {
            type: "string",
            description: "A user password",
            example: "anderson1234",
          },

          tel: {
            type: "integer",
            description: "A user phone",
            example: "123 12 12 12",
          },

          birthdate: {
            type: "integer",
            description: "A user birth",
            example: "10/10/1980",
          },

          avatar: {
            type: "string",
            description: "A user image",
            example: "(image url)",
          },
        },
      },
    },
  },
};
