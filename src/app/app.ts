import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import { requestLoggerMiddleware } from '../middleware/request_logger_middleware';
// import routes for tsoa 
import './controller/pcmr_controller';
import './controller/pc_gaming_controller';
import './controller/build_pc_controller';
import './controller/pc_sale_controller';
import { RegisterRoutes } from './routes';

const app = express();

// set CORS headers on response from this api
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' }));
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
  console.error('Unable to read swagger.json', err);
}


export { app }
