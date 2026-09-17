// figure out which credentials should return
// auto detected by render/heroku as if deployment environment exists

const { request } = require("express");

if (process.env.NODE_ENV === "production") {
  // we are in production -- return the prod credentials
  module.exports = require("./prod");
} else {
  //we are in the development -- return the dev credentials
  module.exports = require("./dev");
}
