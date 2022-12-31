const pool = require("../../db")

const getAllCommuinties = () => {

    const communities = pool.query("select * from communities"); 

    return communities; 
}

const addCommunity = (community) => {

    const { community_name, image, description } = community; 


    const newCommunity = pool.query(`insert into communities (community_name, image, description, created_on) values ('${community_name}', '${image}', '${description}', CURRENT_TIMESTAMP) returning community_id, community_name, image, description, followers, created_on`)

    return newCommunity
}

module.exports = { getAllCommuinties, addCommunity }