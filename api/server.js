const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require('dotenv')

dotenv.config();


// pg sessoin db
const pg = require('pg');




// routes

const UserRouter = require("./routes/users")
const CommunitiesRouter = require("./routes/communities")
const PostsRouter = require("./Models/Posts/routes/posts")
const CommentsRouter = require("./Models/Comments/routes/comments")
const FollowRouter = require("./Models/Follow/routes/follow")


const server = express();



// middleware

server.use(cors());
server.use(helmet());
server.use(express.json());



// after middleware
server.use("/api", UserRouter);
server.use("/api", CommunitiesRouter)
server.use("/api", PostsRouter)
server.use("/api", CommentsRouter)
server.use("/api", FollowRouter)



module.exports = server;
