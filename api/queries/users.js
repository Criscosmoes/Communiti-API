const pool = require("../../db"); 

const getAllUsers = () => {

    const users = pool.query("select * from users"); 

    return users; 
}

const getByOauthId = (id) => {

    const user = pool.query(`select * from users where oauth_id ='${id}'`)

    return user; 

}

const addUser = (user) => {

    const { username, oauth_id, image } = user;
    
    console.log(user)

    const newUser = pool.query(`insert into users (username, oauth_id, image) values ('${username}', '${oauth_id}', '${image}') returning user_id, username, oauth_id, image`)

    return newUser; 
}

module.exports = {
    getAllUsers,
    addUser,
    getByOauthId
}