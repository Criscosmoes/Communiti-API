const router = require("express").Router();
const Following = require("../Queries/queries")


router.post("/follow", async (req, res) => {


    try {


        const followed = await Following.followCommunity(req.body); 

        res.status(200).send({success: followed})
        
        
    } catch (error) {
        
        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });

    }

})

router.post("/unfollow", async (req, res) => {

    try {

        const unfollowed = await Following.unFollowCommunity(req.body); 

        res.status(200).send({success: unfollowed})
        
    } catch (error) {

        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
        
    }
})

module.exports = router; 