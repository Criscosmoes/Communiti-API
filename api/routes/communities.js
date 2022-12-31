const router = require("express").Router();
const multer = require("multer"); 
const { checkPayload } = require("../middlewares/communities")

const Communities = require("../queries/communities")
const { uploadImageS3 } = require("../middlewares/s3")

// multer
const storage = multer.memoryStorage(); 
const upload = multer({storage: storage})

const mpUpload = upload.fields([{name: "community", maxCount: 1}, {name: "description", maxCount: 1}, {name: "image", maxCount: 1}])


router.get("/communities", async (req, res) => {

    try {
        const communities = await Communities.getAllCommuinties(); 

        res.status(200).send(communities.rows); 
        
    } catch (error) {

        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
        
    }
})

router.get("/recent_communities", async (req, res) => {

    try {

        
        const communities = await Communities.getRecentlyAddedCommunities(); 

        res.status(200).send(communities.rows); 

    } catch (error) {

        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
        
    }
})

router.post("/communities", [mpUpload], async (req, res) => {

    try {

        console.log(req.files, req.body)

        const s3Object = await uploadImageS3(req.files.image)


        const newCommunity = await Communities.addCommunity({...req.body, image: s3Object.Location})

        res.status(200).send(newCommunity.rows)


    } catch (error) {

        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
    }
})


module.exports = router; 