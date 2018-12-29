import mongoose from "mongoose";
import { resolve } from "path";
const userDB = require("./schemas/UserSchema");
class Database{
  static initDatabase(databaseConnection){
    mongoose.connect(databaseConnection, { useNewUrlParser: true });
    console.log("SchoolAid local database connected");
  }

  /**
   * 
   * @param {object} user user object from the server
   * @returns {object} server user data or if not fount null
   */
  static loginUser(user){
    return Promise((resolve, reject) => {
      const {userName, password} = user;
      userDB.findOne({userName, password}).then(userData => {
        if(userData){
          resolve(userData);
        }else{
          resolve(null);
        }
      }).catch(err => {
        console.log(err);
        reject(err.message);
      })
    })
  }

  /**
   * Saving users into the server
   * @param {object} user must have {userName, password, type}
   */
  static registerUser(user){
    return Promise((resolve, reject) => {
      let newUser = new userDB(user);
      newUser.save().then(savedData => {
        resolve(savedData)
      }).catch(err => {
        reject(err);
      })
    })
  }

  static addDonation(donationData){
    return Promise((reject, resolve) => {
      let newDonation = new dona
    })
  }
}

export default Database;