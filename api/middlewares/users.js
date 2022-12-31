const checkPayload = async (req, res, next) => {
    try {
      const { username, oauth_id } = req.body;
  
      if (!username || !oauth_id) {
        return res
          .status(400)
          .send("Please provide a username and oauth id.");
      }
  
      next();
    } catch (error) {
      res.status(500).send({ ERROR: error.message, DETAIL: error.detail });
    }
  };
  
  module.exports = {
    checkPayload,
  };
  