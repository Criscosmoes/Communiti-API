const pool = require("../../db")

const getAllCommuinties = () => {

    const communities = pool.query("select * from communities"); 

    return communities; 
}

const addCommunity = (community) => {

    const { community_name, image, description, caption } = community; 


    const newCommunity = pool.query(`insert into communities (community_name, image, caption, description, created_on) values ('${community_name}', '${image}', '${caption}', '${description}', timezone('US/Pacific', current_timestamp)) returning *`)

    return newCommunity;
}

const getRecentlyAddedCommunities = () => {

    const communities = pool.query("select * from communities order by created_on asc limit 5")

    return communities;

}

const getCommunitiesByTerm = (term) => {

    const communities = pool.query(`select * from communities where community_name ilike '%${term}%' limit 10 `); 

    return communities; 

        
}

const getCommunityById = async (id) => {

    const community = await pool.query(`select row_to_json(t) from (select * from communities where community_id = $1) t`, [id])

    return community.rows[0]["row_to_json"]
}

const getPopularCommunities = () => {

    const communities = pool.query("select * from communities order by followers desc limit 5")

    return communities;

}

module.exports = { getAllCommuinties, addCommunity, getRecentlyAddedCommunities, getPopularCommunities, getCommunitiesByTerm, getCommunityById }