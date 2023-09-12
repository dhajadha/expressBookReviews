const express = require('express');
let books = require("./booksdb.js");
const { promises } = require('fs');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

function getBookList(){
  let Books;
  return new Promise((resolve, reject)=> {
    Books = JSON.stringify(books);
  
  if(!Books)
    {
        return reject( new Error('Books not found'));
    }
    else
    {
        return resolve (Books);
    }
  });
}
const getAllBooks = async (req,res) => {
  const result = await getBookList();
  try{
    return res.status(200).json({result})
  }
  catch(err)
  {
    return res.status(404).json({err})
  }
}

function getBookByIsbn(req){
  const id = req.params.id;
  let Books;
  return new Promise((resolve, reject)=> {
    Books = JSON.stringify(books[id]);
    if(!Books)
    {
      return reject( new Error('Book ISBN number not found'));
    }
    else
    {
      return resolve (Books);
    }
  })
}

const getBookByIsbnNumber = async(req,res)=>{
  const result = await getBookByIsbn(req);
  try{
    return res.status(200).json({result})
  }
  catch(err)
  {
    return res.status(404).json({err})
  }
}

function getBookByAuther(req){
  const author1 = req.params.author;
  let Books;
  Books = Object.values(books).filter(book => book.author === author1);
  return new Promise((resolve,reject)=>{
    if(!Books){
      return reject( new Error('Book Title not found'));
    }
    else
    {
      return resolve (Books);
    }

  })
}

const getBookByAuthers = async(req,res) => {
  const result = await getBookByAuther(req);
  try{
    return res.status(200).json({result})
  }
  catch(err)
  {
    return res.status(404).json({err})
  }
}

function getBookByTitle(req){
  const title1 = req.params.title;
  let Books;
  Books = Object.values(books).filter(book => book.title === title1);
  return new Promise((resolve,reject)=>{
    if(!Books){
      return reject( new Error('Book auther not found'));
    }
    else
    {
      return resolve (Books);
    }
  })
}

const getBookByTitles = async(req,res)=>{
  const result = await getBookByTitle(req);
  try{
    return res.status(200).json({result})
  }
  catch(err)
  {
    return res.status(404).json({err})
  }
}

public_users.get('/', getAllBooks);
// Get the book list available in the shop


// Get book details based on ISBN
public_users.get('/isbn/:id',getBookByIsbnNumber)
  
// Get book details based on author
public_users.get('/author/:author',getBookByAuthers)

// Get all books based on title
public_users.get('/title/:title',getBookByTitles)

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const id = req.params.isbn;
  let Books;
  try {
    Tests = (books[id]);
    Books = Tests.reviews;
  }
  catch (err){
    console.log(err)
  }
  if(!Books)
    {
        return res.status(404).json({messgae:"Books not found"})
    }
    else
    {
        return res.status(200).json({Books})
    }
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
