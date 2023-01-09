const pool = require("../../../../db")


const getCommentsByPostId = async (id) => {

    const comments = await pool.query("select * from comments where post_id = $1", [id])
    
    return comments.rows; 

}

const addComment = async (currentComment) => {

    const { comment, comment_link, user_id, community_id, post_id } = currentComment;

    const newComment = await pool.query("insert into comments (comment, comment_link, user_id, community_id, post_id, created_on) values ($1, $2, $3, $4, $5, timezone('US/Pacific', current_timestamp)) returning *", [comment, comment_link, user_id, community_id, post_id])

    return newComment.rows[0]
}


module.exports = {
    getCommentsByPostId,
    addComment
}