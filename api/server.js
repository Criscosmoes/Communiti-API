const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session")
const dotenv = require('dotenv')

dotenv.config();


// pg sessoin db
const pg = require('pg');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

const pgPool = new pg.Pool({
    host: process.env.DATABASE_URL, 
    port: process.env.PORT, 
    user: process.env.USER, 
    password: process.env.PASSWORD, 
    database: process.env.DB
});



// routes

const UserRouter = require("./routes/users")
const PassportRouter = require("./routes/passport"); 
const CommunitiesRouter = require("./routes/communities")
const PostsRouter = require("./Models/Posts/routes/posts")


const server = express();


server.use(expressSession({
    store: new pgSession({
      pool : pgPool,                
      tableName : process.env.SESSION_DB
    }),
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true, 
    cookie: { sameSite: false, httpOnly: true, secure: false, maxAge: 1 * 24 * 60 * 60 * 1000 } // 1 days
}));


// middleware
server.use(passport.initialize()); 
server.use(passport.session());
server.use(cors());
server.use(helmet());
server.use(express.json());



// after middleware
server.use("/api", UserRouter);
server.use("/api", CommunitiesRouter)
server.use("/api", PostsRouter)

// passport
server.use(PassportRouter);


module.exports = server;
