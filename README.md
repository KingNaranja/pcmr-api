# PCMR API - [Demo](https://pcmr-api.herokuapp.com/docs/)

[PCMR Client](https://modest-cray-5c4ae9.netlify.com/) + [Source](https://github.com/kingnaranja/pc-master-race)

The PCMR API is an express server that handles requests from the PCMR client and repopulates the server database with recent submissions from Reddit.com.

Users can request the `hot` posts from the /r/pcmasterrace and a few related subreddits.

## Development 

As a baseline Reddit limits the amount of requests developers can submit to the API every ten minutes. As a result connecting clients directly to the API is quite concerning and wouldn't encourage users to post freely. 

[Snoowrap](https://github.com/not-an-aardvark/snoowrap) is a fully featured Javascript wrapper for the Reddit API that provides a simple interface to access every Reddit API endpoint. All of Snoowraps calls are asynchronous and will be handled by node-cron's scheduler.

## Tech 

* Typescript 
* Express 
* MongoDB
* Mongoose 
* Snoowrap
* Node-Cron
* Tsoa / Swagger UI ( API Documentation )



## Local Setup 

 ```npm install ```    Install dependencies 

```npm run start```   Start local development server  

