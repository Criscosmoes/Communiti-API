const router = require("express").Router();
const Comment = require("../Queries/comments"); 


router.post("/comments", async (req, res) =>  {

    try {

        const newComment = await Comment.addComment(req.body); 

        res.status(200).send(newComment); 
        
    } catch (error) {

        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
        
    }
})

router.get("/comments/postId/:id", async (req, res) => {

    try {

        const { id } = req.params; 

        const comments = await Comment.getCommentsByPostId(id)

        res.status(200).send(comments); 
        
    } catch (error) {
        
        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });

    }

})

router.delete("/comments/delete/:id", async (req, res) => {

    try {
        const { id } = req.params; 

        await Comment.deleteComment(id); 

        res.status(200).send("Successfully deleted comment")
    } catch (error) {
        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
        
    }
})




module.exports = router; 