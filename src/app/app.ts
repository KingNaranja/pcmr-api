import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';

const app = express();

app.use(cors() );
app.use(bodyparser.json());

// add middleware


// register routes



export { app }
