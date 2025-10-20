import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Proyectos - Prueba Técnica",
      version: "1.0.0",
      description: "Documentación de la API CRUD con IA generativa y PostgreSQL",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Aquí se leerán las anotaciones Swagger
};

export const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Documentación Swagger disponible en: http://localhost:4000/api-docs");
};
