const pool = require("../../db")

const getAllCommuinties = () => {

    const communities = pool.query("select * from communities"); 

    return communities; 
}

const getCommunitiesByUserId = async (id) => {

    const communities = await pool.query(`select c. *, case when f.user_id is null then false else true end as following from communities c left join user_communities f on c.community_id = f.community_id and f.user_id = $1 order by following desc`, [id])

    return communities.rows; 
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

const getCommunityById = async (userCommunity) => {

    const { user_id, community_id } = userCommunity; 

    const community = await pool.query(`select c.*, (case when exists (select 1 from user_communities uc where uc.community_id = c.community_id and uc.user_id = $1) then true else false end) as following from communities c where c.community_id = $2`, [user_id, community_id])

    return community.rows[0]
}

const getPopularCommunities = () => {

    const communities = pool.query("select * from communities order by followers desc limit 5")

    return communities;

}

module.exports = { getAllCommuinties, addCommunity, getRecentlyAddedCommunities, getPopularCommunities, getCommunitiesByTerm, getCommunityById, getCommunitiesByUserId}