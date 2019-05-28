import { app } from './app/app';
import * as http from 'http';
import * as dotenv from 'dotenv';

// `db` will be the mongo uri as a string


// load secret keys from .env
dotenv.config();

// Set the key based on the current environemnt
// Set to secret key base test if in test
if (process.env.TESTENV) {
  process.env.KEY = process.env.SECRET_KEY_BASE_TEST;
// Set to secret key base development if not test and no key present
// process.env.KEY is present in production and set through heroku
} else if (!process.env.KEY) {
  process.env.KEY = process.env.SECRET_KEY_BASE_DEVELOPMENT;
}

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);

server.on('listening', async () => {
  console.info(`Listening on port ${ port }`)

})

