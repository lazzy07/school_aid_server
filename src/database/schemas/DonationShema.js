var mongoose = require("mongoose");
var DONATION_DATABASE = require("../../constants").DONATION_DATABASE;

var donationSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  total: String,
  money: String,
  description: String
})

var donationDB = mongoose.model(DONATION_DATABASE, donationSchema);

module.exports = donationDB;