const express = require("express");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

app = express();

app.use(
  cookieSession({
    max_age: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

//if we used deployment(heroku) environment use first and if we are using the development  environment default used 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT);
