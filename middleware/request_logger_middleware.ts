import * as express from 'express'
// express middleware takes 3 params
// request , response, next
const requestLoggerMiddleware = (req:express.Request, resp: express.Response, next: express.NextFunction) => {
  // log the request method and the original URL
  console.info(`${req.method} ${req.originalUrl}`);

  // record the time it takes for the request to process 
  const start = new Date().getTime();
  resp.on('finish', () => {
    const elapsed = new Date().getTime() - start; 
    console.info(`${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsed}ms`);
   });

  next();
};

export { requestLoggerMiddleware }