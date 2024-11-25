const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Users and Notes API',
    description: 'API for managing users and notes',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json'; // Generated file
const endpointsFiles = ['./src/routes/users.ts']; // Routes to analyze

swaggerAutogen(outputFile, endpointsFiles);