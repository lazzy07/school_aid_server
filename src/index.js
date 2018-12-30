/**
 * @author Ravilal Senanayake
 */

import { SERVER_PORT, DATABASE, ADMIN_USERNAME, ADMIN_PASSWORD } from "./constants";
import Database from "./database";
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');



class MainClass{
  static main(){
    console.log(__dirname)
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //initialize databse
    Database.initDatabase(DATABASE);
    
    //Sending index file to users
    app.get('/', (req, res) => res.sendFile(__dirname+"/index.html"));
    
    //api call to login users
    app.post("/api/login_user", (req, res) => {
      let data = req.body;
      console.log("login user")
      if(data.username === ADMIN_USERNAME && data.password === ADMIN_PASSWORD){
        res.status(200).json({userName: data.username, password: data.password, type: "admin"});
        console.log("admin login")
      }else{
        Database.loginUser(data).then(loggedData => {
          if(loggedData){
            res.json({...loggedData});
          }else{
            res.json({err: "User Not Found"})
          }
        }).catch(err => {
          console.log(err);
          res.status(500).json({message: "Internal Error"});
        })
      }
    })

    app.post("/api/register_user", (req,res) => {
      let data = req.body;
      console.log("register user");
      Database.registerUser(data).then(savedData => {
        console.log("register user complete");
        res.status(200).json(savedData);
      }).catch(er => {
        console.log(er)
      });
    })

    app.post("/api/get_users", (req, res) => {
      let data = req.body;
      console.log("get users");

      if(data.type === "admin"){
        Database.getUsers().then(users => {
          res.status(200).json(users);
        }).catch(err => {
          console.log(err);
        })
      }
    })

    app.post("/api/delete_user", (req, res) => {
      let data = req.body;
      console.log("delete user");

      if(data.type === "admin"){
        Database.deleteUser(data).then(correct => {
          res.status(200).json({status: "ok"});
        }).catch(err => {
          console.log(err);
        })
      }
    })

    app.post("/api/delete_cause", (req, res) => {
      let data = req.body;
      console.log("delete cause");

      if(data.type === "admin" || data.type === "member"){
        Database.deleteCause(data).then(correct => {
          console.log("delet cause complete")
          res.status(200).json({status: "ok"});
        }).catch(err => {
          console.log(err);
        })
      }
    })

    app.post("/api/add_cause", (req, res) => {
      let data = req.body;
      console.log("add cause");

      Database.addDonation(data).then(savedData => {
        res.status(200).json(savedData);
      }).catch(err => {
        console.log(err);
      })

    })

    app.post("/api/get_causes", (req, res) => {
      Database.getCauses().then(data => {
        res.status(200).json(data);
      }).catch(err => {
        console.log(err);
      })
    })

    app.post("/api/donate", (req, res) => {
      let data  = req.body;
      Database.donate(data).then(saveddData => {
        res.status(200).json(data);
      }).catch(err => {
        console.log(err);
      })
    })


    app.listen(SERVER_PORT, console.log("\n\nSchoolAid server running on "+ SERVER_PORT))
  }
}

MainClass.main()
