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
            format: "email",
            description: "A user email. The email must be unic",
            example: "anderson@example.es",
          },

          password: {
            type: "string",
            description:
              "A user password. The password must have a minimum of 8 characters, one uppercase letter, one lowercase letter, and one special character",
            example: "Anderson1234!",
          },

          tel: {
            type: "integer",
            description: "A user phone",
            example: 123121212,
          },

          birthdate: {
            type: "date",
            description: "A user birth",
            example: "10/10/1980",
          },

          avatar: {
            type: "string",
            description: "A user image",
            example: "(image url)",
          },

          confirmed: {
            type: "boolean",
            description: "A user email confirmed",
            example: 1,
          },

          file: {
            type: "string",
            description: "A user file",
            example: ".doc",
          },

          course: {
            type: "string",
            description: "A user course",
            example: "Elementary school",
          },

          interest: {
            type: "string",
            description: "A user interests",
            example: "I love swagger",
          },

          catchment: {
            type: "string",
            description: "A user catch",
            example: "This user loves swagger",
          },
        },
        required: ["name", "email", "password"],
      },
    },
  },
};
