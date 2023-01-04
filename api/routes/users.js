const router = require("express").Router();
const Users = require("../queries/users"); 

// middlewares

const { checkPayload } = require("../middlewares/users")


router.get("/users/user/:id", async (req, res) => {

    try {

        const { id } = req.params; 

        const user = await Users.getUserByOauthId(id);

        res.status(200).send(user); 
    } catch (error) {
        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
        
    }
})

router.get("/users", async (req, res) => {

    try {
        const users = await Users.getAllUsers(); 

        res.status(200).send(users.rows)
    } catch (error) {

        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
    }
})

router.get("/recent_users", async (req, res) => {

    try {
        const users = await Users.getRecentUsers(); 

        res.status(200).send(users.rows)
    } catch (error) {

        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
    }
})


router.get("/users/:id", async (req, res) => {

    const { id } = req.params; 

    try {
        
        const user = await Users.getByOauthId(id); 

        res.status(200).send(user.rows); 

    } catch (error) {
        
        res.status(500).send({ ERROR: error.message, DETAIL: error.detail })
    }
})



router.post("/users", [checkPayload], async (req, res) => {

    try {
        const newUser = await Users.addUser(req.body)

        res.status(200).send(newUser.rows)
    } catch (error) {

        res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
    }
})


module.exports = router; 