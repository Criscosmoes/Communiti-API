const pool = require("../../db")

const getAllCommuinties = () => {

    const communities = pool.query("select * from communities"); 

    return communities; 
}

const addCommunity = (community) => {

    const { community_name, image, description } = community; 

    console.log(community, "community")

    const newCommunity = pool.query(`insert into communities (community_name, image, description) values ('${community_name}', '${image}', '${description}') returning community_id, community_name, image, description, followers`)

    return newCommunity
}

module.exports = { getAllCommuinties, addCommunity }