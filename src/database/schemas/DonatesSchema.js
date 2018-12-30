var mongoose = require("mongoose");
var DONATES_DATABASE = require("../../constants").DONATES_DATABASE;

var donatesSchema = new mongoose.Schema({
  causeId: String,
  amount: String,
  fName: String,
  lName: String,
  email: String,
  phone: String,
  nic: String,
  additionalNode: String
})

var donatesDB = mongoose.model(DONATES_DATABASE, donatesSchema);

module.exports = donatesDB;