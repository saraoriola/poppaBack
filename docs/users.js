module.exports = {
  paths: {
    "/users": {
      get: {
        tags: ["Users"],
        summary: "Obtener todos los usuarios",
        description:
          "Obtiene una lista de todos los usuarios almacenados en la base de datos MySQL.",
        operationId: "getUsers",
        responses: {
          200: {
            description: "Lista de usuarios",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/users",
                  },
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
          },
        },
      },
    },
  },
};
