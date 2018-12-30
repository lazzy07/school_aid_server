var mongoose = require("mongoose");
var USERS_DATABASE = require("../../constants").USERS_DATABASE;

var userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  type: {default: "member", type: String}
})


var userDB = mongoose.model(USERS_DATABASE, userSchema);

module.exports = userDB;