const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Users and Notes API',
    description: 'API for managing users and notes',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

let outputFile = './swagger-output.json'; // Generated file
let endpointsFiles = ['./src/routes/users.ts']; // Routes to analyze
 outputFile = './swagger-output-notes.json'; // Generated file
 endpointsFiles = ['./src/routes/notes.ts']; // Routes to analyze

swaggerAutogen(outputFile, endpointsFiles);