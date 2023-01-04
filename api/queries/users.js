const pool = require("../../db"); 

const getUserByOauthId = async (id) => {

    const user = await pool.query("select * from users where oauth_id = $1", [id])

    return user.rows[0]; 
}

const getAllUsers = () => {

    const users = pool.query("select * from users"); 

    return users; 
}

const getRecentUsers = () => {

    const users = pool.query("select * from users order by created_on asc limit 5"); 

    return users; 
}


const getByOauthId = (id) => {

    const user = pool.query(`select * from users where oauth_id ='${id}'`)

    return user; 

}

const addUser = (user) => {

    const { username, oauth_id, image } = user;
    

    const newUser = pool.query(`insert into users (username, oauth_id, image, created_on) values ('${username}', '${oauth_id}', '${image}', CURRENT_TIMESTAMP) returning user_id, username, oauth_id, image, created_on`)

    return newUser; 
}

module.exports = {
    getAllUsers,
    addUser,
    getByOauthId, 
    getRecentUsers,
    getUserByOauthId
}