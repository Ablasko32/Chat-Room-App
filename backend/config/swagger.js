// SWAGGER config
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SafeRoom API",
      version: "1.0.0",
      description: "API docs for backend part of SafeRoom app",
    },
    schemes: ["https"],
    servers: [
      {
        url: "https://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
