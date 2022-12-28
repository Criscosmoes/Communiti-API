const { Client } = require("pg");
const dotenv = require('dotenv')

dotenv.config(); 

const client = new Client({
  host: process.env.DATABASE_URL, 
  port: process.env.PORT, 
  user: process.env.USER, 
  password: process.env.PASSWORD, 
  database: process.env.DB
});

client.connect(); 

client.query("select * from users", (err, res) => {

    return console.log(res.rows)
})

module.exports = client;