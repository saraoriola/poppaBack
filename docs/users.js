// NOTE: No funcionan muy allá pero ya está la estructura de los 4 hechas
module.exports = {
  paths: {
    "/users/getall": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        description:
          "Retrieves a list of all users stored in the MySQL database.",
        operationId: "getAllUsers",
        responses: {
          200: {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/user",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },

    "/users/register": {
      post: {
        tags: ["Users"],
        summary: "Create a user",
        description: "Register a new user in the database.",
        operationId: "registerUser",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/user",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/user",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },

    "/update/{id}": {
      put: {
        tags: ["Users"],
        summary: "Update a user",
        description: "Updates an existing user in the database.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of the user to be updated.",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/user",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/user",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },

    "/delete/{id}": {
      delete: {
        tags: ["Users"],
        summary: "Delete a user",
        description: "Deletes a user from the database by their ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of the user to be deleted.",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      description: "A message confirming the user deletion.",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      description:
                        "A message indicating that the user was not found.",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      description:
                        "A message indicating an internal server error.",
                    },
                    error: {
                      type: "string",
                      description: "Details about the internal server error.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
