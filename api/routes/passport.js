const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy; 
const dotenv = require('dotenv')

dotenv.config(); 


//user model
const Users = require("../queries/users")

passport.serializeUser((user, done) => {

  done(null, user.rows[0].oauth_id);

});

passport.deserializeUser( async (id, done) => {


  try {

    const user = await Users.getByOauthId(id);

    done(null, user.rows[0])
  } catch (error) {
    
    console.log(error); 
  } 

  
});

// passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback", 
      // this links up with server.get("/auth/google/callback")
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
       
        const userTaken = await Users.getByOauthId(profile.id)


        if (userTaken.rows.length === 0) {

            const newUser = await Users.addUser({username: profile.name.givenName, oauth_id: profile.id})

            done(null, newUser); 

        }
        else {
            
            done(null, userTaken); 

        }

      } catch (e) {
        console.log(e.message);
      }
    }
  )
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"), (req, res) => {

    res.redirect("http://localhost:3000")
  }
); // this now uses the google strategy call back URL up above

router.get("/api/logout", async (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy(); 
        res.redirect('http://localhost:3000');
      });
});

router.get("/api/current_user", (req, res) => {

  try {
   
    res.send(req.user)

  } catch (error) {
    res.send(error)
  }
});

module.exports = router;