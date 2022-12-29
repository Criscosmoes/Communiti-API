const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy; 

//user model
const Users = require("../models/users")

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

            console.log(newUser)
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

    res.redirect("/")
  }
); // this now uses the google strategy call back URL up above

router.get("/api/logout", async (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;