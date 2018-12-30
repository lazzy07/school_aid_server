import mongoose from "mongoose";
import { resolve } from "path";
const userDB = require("./schemas/UserSchema");
const donationDB = require("./schemas/DonationShema");
const donatesDB = require("./schemas/DonatesSchema");

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
    return new Promise((resolve, reject) => {
      const {username, password} = user;
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
   * @param {object} user must have {userName, email, password, type}
   */
  static registerUser(user){
    return new Promise((resolve, reject) => {
      userDB.find({userName: user.userName}).then(foundData => {
        if(foundData.length === 0){
          let newUser = new userDB(user);
          newUser.save().then(savedData => {
            resolve(savedData)
          }).catch(err => {
            reject(err);
          })
        }else{
          reject({message: "User Already Exists"})
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static addDonation(donationData){
    return new Promise((reject, resolve) => {
      let newDonation = new donationDB(donationData);
      
      newDonation.save().then(savedData => {
        resolve(savedData);
      }).catch(err => {
        reject(err);
      })
    })
  }

  static getUsers(){
    return new Promise((resolve, reject) => {
      userDB.find({}).then(users => {
        resolve(users);
      }).catch(err => {
        reject(err);
      })
    })
  }

  static deleteUser(data){
    return new Promise((resolve, reject) => {
      userDB.findOneAndDelete({_id: data.id}).then(() => {
        resolve(true);
      }).catch(err => {
        reject(err);
      })
    })
  }

  static deleteCause(data){
    return new Promise((resolve, reject) => {
      donationDB.findOneAndDelete({_id: data.id}).then(() => {
        resolve(true);
      }).catch(err => {
        reject(err);
      })
    })
  }

  static getCauses(){
    return new Promise((resolve, reject) => {
      donationDB.find({}).then(saveddata => {
        resolve(saveddata);
      }).catch(err => {
        console.log(err);
      })
    })
  }

  static donate(data){
    return new Promise((resolve, reject) => {
      let newDonate = new donatesDB(data);
      donationDB.findOne({_id: data.causeId}).then(foundData => {
        if(foundData.total < foundData.money+data.amount){
          foundData.money = foundData.total;
        }else{
          foundData.money += data.amount;
        }

        foundData.save().then(savedData => {
          resolve(savedData);
        }).catch(err => {
          reject(err);
        })
      })
      newDonate.save().then(savedData => {
        resolve(savedData);
      }).catch(err => {
        reject(err);
      }).catch(err => {
        reject(err);
      })
    })
  }
}

export default Database;