//Imports
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')


/**
  Do what needs to be done to support sessions with the `express-session` package!
  To respect users' privacy, do NOT send them a cookie unless they log in.
  This is achieved by setting 'saveUninitialized' to false, and by not
  changing the `req.session` object unless the user authenticates.

  Users that do authenticate should have a session persisted on the server,
  and a cookie set on the client. The name of the cookie should be "chocolatechip".

  The session can be persisted in memory (would not be adecuate for production)
  or you can use a session store like `connect-session-knex`.
 */
//Instance Of Express App
const server = express();


//Calling Middleware
server.use(session({
  name: 'chocolatechip', //Name Of Cookie
  secret: 'keep it secret', //Gets Encrypted
  cookie: {
    maxAge: 1000 * 60 * 60,  
    secure: false, // if true, only works over TLS/https
    httpOnly: false, // if true, cookie not in document
  }, 
  rolling: true, //Pushes Back Expiration Date
  resave: false, // required by some session stores
  saveUninitialized: false, // session not saved automatically
}));
server.use(helmet());
server.use(express.json());
server.use(cors());


//Consuming Routers
server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);


//Endpoints
server.get("/", (req, res) => {
  res.json({ api: "up" });
});


//Error-Handling Middleware
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});


//Exports; Exposing
module.exports = server;
