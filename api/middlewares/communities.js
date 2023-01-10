const checkPayload = (req, res, next) => {


    try {
        
        const { community_name, description } = req.body; 

        if (!community_name || !description) {

            return res.status(400).send("Please include community name, description, and image")
        }

        next(); 
    } catch (error) {
        
        return res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
    }


}


module.exports = {
    checkPayload,
  };
  