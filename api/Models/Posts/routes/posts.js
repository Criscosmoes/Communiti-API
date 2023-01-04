const router = require("express").Router();
const Posts = require("../../Queries/queries")

router.get("/posts/community/:id", async (req, res) => {

    try {
        
        const { id } = req.params; 

        const posts = await Posts.getPostsByCommunityId(id)

        res.status(200).send(posts); 

    } catch (error) {

        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
        
    }
})

router.post("/posts", async (req, res) => {

    try {
        
        const newPost = await Posts.addPost(req.body); 

        res.status(200).send(newPost); 

    } catch (error) {
        
        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });

    }

})

module.exports = router; 