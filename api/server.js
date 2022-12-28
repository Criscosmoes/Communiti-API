const express = require("express");
const cors = require("cors");
const helmet = require("helmet");


// routes

const UserRouter = require("./routes/users")


const server = express();

// middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

// after middleware
server.use("/api", UserRouter); 


module.exports = server;
