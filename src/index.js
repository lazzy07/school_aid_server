/**
 * @author Ravilal Senanayake
 */

import { SERVER_PORT, DATABASE } from "./constants";
import Database from "./database";
const express = require("express");
const app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


class MainClass{
  static main(){
    //initialize databse
    Database.initDatabase(DATABASE);
    
    //Sending index file to users
    app.get('/', (req, res) => res.send('Hello World!'));
    
    /**
     * @param {object} must include a object/json with data {userName: user's name, password: password of the user}
     */
    app.post("/login_user", (req) => {
      console.log(req.body.parse());
      
    })


    app.listen(SERVER_PORT, console.log("\n\nSchoolAid server running on "+ SERVER_PORT))
  }
}

MainClass.main()
