const router = require("express").Router();
const Users = require("../models/users"); 

// middlewares

const { checkPayload } = require("../middlewares/users")


router.get("/users", async (req, res) => {

    try {
        const users = await Users.getAllUsers(); 

        res.status(200).send(users.rows)
    } catch (error) {

        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
    }
})


router.get("/users/:id", async (req, res) => {

    const { id } = req.params; 

    console.log(id)

    try {
        
        const user = await Users.getByOauthId(id); 

        res.status(200).send(user.rows); 

    } catch (error) {
        
        res.status(500).send({ ERROR: error.message, DETAIL: error.detail })
    }
})



router.post("/users", [checkPayload], async (req, res) => {

    try {
        const newUser = await Users.addUser(req.payload)

        res.status(200).send(newUser.rows)
    } catch (error) {

        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
    }
})


module.exports = router; 