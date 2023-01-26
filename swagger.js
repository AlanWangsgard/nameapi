const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'nameapi.onrender.com/contacts',
  schemes: ['http'],
};

const outputFile = 'routes/swagger.json';
const endpointsFiles = ['routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);