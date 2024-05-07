import swaggerAutogen from 'swagger-autogen';

const port = process.env.PORT || 5000;

const doc = {
  info: {
    version: '', // by default: '1.0.0'
    title: 'CommentsApi', // by default: 'REST API'
    description: 'CRUD сервис для работы с комментариями', // by default: ''
  },
  tags: [
    {
      name: 'Comments',
      description: 'Эндпоинт для получения комментариев',
    },
  ],
  host: `http://localhost:${port}`, // by default: 'localhost:3000'
  basePath: '', // by default: '/'
};

const outputFile = './swagger-output.json';
const routes = ['../index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
