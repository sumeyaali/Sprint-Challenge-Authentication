const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session= require('express-session')
const knexSessionStore = require('connect-session-knex')(session);

const configureMiddleware = require('./configure-middleware');
const dbConnection = require('../database/dbConfig');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionConfig = {
    name: "Sprint Cookie",
    secret: process.env.SESSION_SECRET || "Shhhh keep this a secret",
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new knexSessionStore({
        knex: dbConnection,
        tablename:'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 60000,
    })
}


server.use(helmet());
server.use(session(sessionConfig))
server.use(cors());
server.use(express.json());

configureMiddleware(server)

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req,res) => {
    res.json({api: "It's Working!"})
})

module.exports = server;


