const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const mongose = require('mongoose');
const User = require("./model/User");
let users = [];

mongose.connect("mongodb+srv://admin:m2w41Dk6bBcZgcDm@cluster0.d9ryo61.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("Connected to database"));
var db=mongose.connection;
const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
try {
  // check if the user exists
  const user = User.findOne({ username: username });
  if (user) {
    //check if password matches
    const result = password === user.password;
    if (result) {
      return result;
    } 
  } 
} catch (error) {
   return error;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {

  const user = authenticatedUser(req.params.username,req.params.password)
  try{
    return res.json({ token: jwt.sign({ username: req.params.username }, 'RESTFULAPIs') });
  }
  catch(err)
  {
    return res.status(404).json({err})
  }
  // var username = req.body.username;
  //   var email =req.body.email;
  //   var pass = req.body.password;
  //   var phone =req.body.phone;
  //   var data = {
  //       "username": username,
  //       "email":email,
  //       "password":pass,
  //       "phone":phone
  //   }

  // const name = User.findOne({ username: req.body.username });
  // if(name)
  // {
  //   return res.status(200).json({ message: "Usename already exist" })
  // }else
  // {
  //   db.collection('details').insertOne(data,function(err, collection){
  //     if(err)
  //     {
  //       return res.status(200).json({ err })
  //     }
  //     else
  //     {
  //       return res.status(404).json({messgae:"User inserted succesfully"})
  //     }
                 
  //       });
  // }

 //return res.status(300).json({message: "Yet to be implemented"});

});

// Add a book review
regd_users.put("/review/:isbn", (req, res) => {
  const id = req.params.isbn;
  let userid = req.params.userid;
  let Books;
  Books = (books[id]);
  const entries = Object.entries(Books);
  try
    {
      //let a= ;
      let b = entries.push({user_id:"aa",text: "aa"});
      //console.log(entries.push(a))
      return res.status(404).json({messgae:"User inserted succesfully"})
    }
    catch(err)
    {
      return res.status(200).json({ err });
    }
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
