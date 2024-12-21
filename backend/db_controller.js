const express = require('express');
const mysql = require('mysql');
const router=express.Router();
const dbconnection = require('./dbconnection');
const bodyParser=require('body-parser')

module.exports.signup=function(username,email,password,status,callback){
    dbconnection.query('select email from users where email=`${email}`',
    function(err,result){
        if(result[0]==undefined){
            var query="insert into `users`(`username`, `email`,`password`,`email_status`) values (`${username},${email},${password},${email_status}`)"
            console.log(query);
        }
        else{
            console.log("error")
        }
    }
)
}

module.exports.verify=function(username,email,token,callback){
    var query="insert into `verify`(`username`,`email`,`token`) values (`${username},${email},${token}`)"
    dbconnection.query(query,callback)
}

module.exports.getuserid=function(email,callback){
    var query="select * from `verify` where email = `${email}`"
    dbconnection.query(query,callback)
}

module.exports.matchtoken=function(id,token,callback){
    var query="select * from `verify` where token = '"+token+"' and id= "+id
    dbconnection.query(query,callback)
    console.log(query)
}
module.exports.updateverify=function(email,email_status,callback){
    var query="update `users` set `email_status` = '"+email_status+"' where `email` = '"+email_status+"'"
    dbconnection.query(query,callback)
    console.log(query)
}