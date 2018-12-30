var mongoose = require("mongoose");
var DONATION_DATABASE = require("../../constants").DONATION_DATABASE;

var donationSchema = new mongoose.Schema({
  causeId: String,
  title: String,
  schoolName: String,
  province: String,
  district: String,
  image: String,
  money: {type:Number, default: 0},
  total: {type:Number, default: 0},
  additionalNote: String
})

var donationDB = mongoose.model(DONATION_DATABASE, donationSchema);

module.exports = donationDB;