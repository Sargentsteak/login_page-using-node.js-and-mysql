//we need to import express to make sure we can start the server from node js
const express = require ("express");
//importing mysql
const mysql = require ("mysql");
//import dotenv to store sensitive information such as passwords
const dotenv = require("dotenv")
require('dotenv').config();
const path = require("path");

const cookieParser = require("cookie-parser");

dotenv.config({ path: ' ./.env'});



// to make sure we start the server with this "app"
const app = express();

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

//Here in the path goes all the HTMl and the CSS
const publicdirectory = path.join(__dirname,'./public');
app.use(express.static(publicdirectory))

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended : false}));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());
app.set('view engine' , 'hbs');

db.connect( (error)=> {
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL CONNECTED...")
    }

});

//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log("Server started on port 5000");
})

