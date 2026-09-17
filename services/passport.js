const passport = require("passport");
const keys = require("../config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

// user.id is not googleId(profile.id) instead its auto generated id by mongoDB
//why we use this >>>  while we are on the OAuth side we are depending
// on the 3rd party integration but after sign in why we are depending
//  on the external id ....thats why depends upon in the internal id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      //   console.log("access_token", accessToken);
      //   console.log("refresh_token", refreshToken);
      //   console.log("profile", profile);

      // mongo query returns a (asynchronous operation)promise not an object that's why such syntax below using .then
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //Already have an record with same ID, No need to create new one
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    },
  ),
);
