const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api Documentation Gloupper',
      version: '1.0.0',
      description: 'Api Documentation for Gloupper Express.js',
    },
  },
  apis: ['./routes/*.js'], // Ruta a tus archivos de ruta
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;