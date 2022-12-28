const router = require("express").Router();


router.get("/users", async (req, res) => {

    try {
        res.status(200).json("This is working")
    } catch (error) {
        res.status(500).json("There was an error")
    }
})

module.exports = router; 