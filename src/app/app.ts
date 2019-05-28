import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import { requestLoggerMiddleware } from '../middleware/request_logger_middleware';
import './routes/post_controller';

import { RegisterRoutes } from './routes/routes';
import * as swaggerUi from 'swagger-ui-express';

const app = express();

// set CORS headers on response from this api
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:8080' }));
app.use(bodyparser.json());

// add middleware
app.use(requestLoggerMiddleware);

// register routes
RegisterRoutes(app);


// load swagger JSON file
try {
  const swaggerDocument = require('./../../swagger.json');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  console.error('Unable to read swagger.json', err)
}


export { app }
