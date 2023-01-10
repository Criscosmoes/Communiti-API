const pool = require("../../../../db")

const followCommunity = async (community) => {

    const { community_id, user_id } = community; 

    const check = await checkIfFollowingExists(user_id, community_id); 

    if (!check) {

        await pool.query("insert into user_communities (user_id, community_id) values ($1, $2)", [user_id, community_id])

        await pool.query('update communities set followers = followers + 1 where community_id = $1', [community_id])

        return true; 
    }

    return false; 


}

const unFollowCommunity = async (community) => {

    const { community_id, user_id } = community; 

    const check = await checkIfFollowingExists(user_id, community_id);

    if (check) {

        await pool.query("delete from user_communities where user_id = $1 and community_id = $2", [user_id, community_id])

        await pool.query('update communities set followers = followers - 1 where community_id = $1', [community_id])

        return true; 
    }

    return false; 

}

const checkIfFollowingExists = async (user_id, community_id) => {

    const check = await pool.query("select * from user_communities where user_id = $1 and community_id = $2", [user_id, community_id])


    if (check.rows.length > 0) {

        return true; 

    }

    return false; 

}

module.exports = { followCommunity, unFollowCommunity }