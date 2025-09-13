const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * @typedef {Object} SwaggerOptions
 * @property {Object} definition - Configuración principal de OpenAPI.
 * @property {string} definition.openapi - Versión de OpenAPI.
 * @property {Object} definition.info - Información de la API.
 * @property {string} definition.info.title - Título de la API.
 * @property {string} definition.info.version - Versión de la API.
 * @property {string} definition.info.description - Descripción de la API.
 * @property {Array<Object>} definition.servers - Lista de servidores donde corre la API.
 * @property {string} definition.servers[].url - URL del servidor.
 * @property {Array<string>} apis - Rutas de archivos donde se encuentran los endpoints para documentar.
 */

/**
 * Configuración de opciones para Swagger.
 * @type {SwaggerOptions}
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "Documentación de la API",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

/**
 * Genera las especificaciones de Swagger a partir de las opciones definidas.
 */
const specs = swaggerJsdoc(options);

/**
 * Configura Swagger en la aplicación Express.
 * @param {import('express').Express} app - Instancia de la aplicación Express donde se montará Swagger.
 */
function setupSwagger(app) {
  /**
   * Ruta principal para acceder a la documentación de la API
   * @example
   * // Acceder desde el navegador:
   * // http://localhost:8080/api-docs
   */
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;
