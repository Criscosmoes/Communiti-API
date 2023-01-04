const pool = require("../../../db")


const addPost = async (post) => {

    const { title, description, post_link, community_id, user_id } = post

    const newPost = await pool.query("insert into posts (title, description, post_link, community_id, user_id, created_on) values ($1, $2, $3, $4, $5, timezone('US/Pacific', current_timestamp)) returning *", [title, description, post_link, community_id, user_id])

    return newPost.rows[0]; 

}

const getPostsByCommunityId = async (id) => {

    const posts = await pool.query("select p.*, u.username, (select count(c.comment_id) from comments c where c.post_id = p.post_id) as comment_count from posts p inner join users u on p.user_id = u.user_id where p.community_id = $1", [id])

    return posts.rows; 
}

module.exports = {
    addPost, 
    getPostsByCommunityId
}