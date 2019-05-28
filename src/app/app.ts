import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import { requestLoggerMiddleware } from '../../middleware/request_logger_middleware';

const app = express();

// set CORS headers on response from this api
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:8080' }));
app.use(bodyparser.json());

// add middleware
app.use(requestLoggerMiddleware);

// register routes



export { app }
