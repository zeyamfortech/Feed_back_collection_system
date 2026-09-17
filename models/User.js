const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema property of mongoose actually removes the mongoDB property to add different attributes inside individual instance of same collection
const userSchema = new Schema({
  googleId: String,
});

mongoose.model("users", userSchema);
