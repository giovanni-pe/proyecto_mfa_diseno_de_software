const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definir la configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Conferencias',
      version: '1.0.0',
      description: 'API para gestionar conferencias',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Conferencia: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de la conferencia',
            },
            title: {
              type: 'string',
              description: 'Título de la conferencia',
            },
            description: {
              type: 'string',
              description: 'Descripción de la conferencia',
            },
            status: {
              type: 'string',
              enum: ['Active', 'Inactive'],
              description: 'Estado de la conferencia',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
          required: ['title', 'description'],
        },
      },
    },
  },
  apis: ['./routes/conferencias.js'], // Especifica la ubicación de las rutas
};

// Generar la especificación Swagger a partir de las opciones
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };

