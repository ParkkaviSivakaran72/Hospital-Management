const express = require('express');
const mysql = require('mysql');
const router=express.Router();
const dbconnection = require('./dbconnection');
const bodyParser=require('body-parser')

module.exports.signup=function(username,email,password,status,callback){
    dbconnection.query('select email from users where email=`${email}`'),
    function(err,result){
        if(result[0]==undefined){
            var query="insert into `users`(`username`, `email`,`password`,`email_status`) values (`${username},${email},${password},${email_status}`)"
            console.log(query);
        }
        else{
            console.log("error")
        }
    }
}

module.exports.verify=function(username,email,token,callback){
    var query="insert into `verify`(`username`,`email`,`token`) values (`${username},${email},${token}`)"
    dbconnection.query(query,callback)
}

module.exports.getuserid=function(email,callback){
    var query="select * from verify where email = `${email}`"
    dbconnection.query(query,callback)
}
