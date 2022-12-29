const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session")


// routes

const UserRouter = require("./routes/users")
const PassportRouter = require("./routes/passport"); 



const server = express();

server.use(session({
    secret: "secret", 
    resave: false, 
    saveUninitialized: true, 
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

// middleware
server.use(passport.initialize()); 
server.use(passport.session());
server.use(cors());
server.use(helmet());
server.use(express.json());


// after middleware
server.use("/api", UserRouter);

// passport
server.use(PassportRouter);


module.exports = server;
