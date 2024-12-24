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

module.exports.findOne = function(email, callback){
    var query = "select * from users where email = '"+email+"'"
    dbconnection.query(query,callback)
    console.log(query)
}

module.exports.temp = function(id, email, token, callback){
    var query = "insert into `temp`(`id`,`email`,`token`) values ('"+id+"','"+email+"','"+token+"')"
    dbconnection.query(query, callback);
    console.log(query);
}

module.exports.add_doctor = function(first_name, last_name, email, dob, gender, address,phone, image, department,biography){
    var query = "insert into `doctor`(`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`,`image`,`department`,`biography`) values ('"+first_name+"','"+last_name+"','"+email+"','"+dob+"','"+gender+"','"+address+"','"+phone+"','"+image+"','"+department+"','"+biography+"')"
    dbconnection.query(query, callback);
    console.log(query);
}

module.exports.getAlldoc = function(callback){
    var query = "select * from doctor"
    dbconnection.query(query,callback)
    console.log(query)
}

module.exports.getDocbyId = function(id, callback){
    var query = "select * from doctor where id = '"+id+"'"
    dbconnection.query(query, callback);
    console.log(query);
}

module.exports.editDoc = function(first_name, last_name, email, dob, gender, address,phone, image, department,biography){
    var query = "update `doctor` set `first_name` = '"+first_name+"',`last_name` = '"+last_name+"',`email` = '"+email+"' ,`dob` = '"+dob+"',`gender` = '"+gender+"',`address` = '"+address+"',`phone` = '"+address+"',`image` = '"+image+"',`department` = '"+department+"',`biography` = '"+biography+"'where id = "+id
    dbconnection.query(query, callback);
    console.log(query);
}

module.exports.delteDoc = function(id, callback){
    var query = "delete from doctor where id = '"+id
    dbconnection.query(query, callback);
    console.log(query);
}

module.exports.searchDoc = function(id, callback){
    var query = "select * from where first_name like "%'+key+'%"'"
    dbconnection.query(query, callback);
    console.log(query);
}

module.exports.getAlldept = function(callback){
    var query = "select * from departments"
    dbconnection.query(query,callback)
    console.log(query)
}

module.exports.getleavebyid = function(id, callback){
    var query = "select * from leaves where id = '"+id
    dbconnection.query(query, callback);
    console.log(query);
}
module.exports.getAllleave = function(callback){
    var query = "select * from leaves"
    dbconnection.query(query, callback);
    console.log(query);
}
module.exports.getAllemployee = function(callback){
    var query = "select * from employee"
    dbconnection.query(query, callback);
    console.log(query);
}

module.exports.add_leave = function(name, id, type, from, to, reason, callback){
    var query = "insert into `leaves`(`employee`, `emp_id`, `leave_type`, `date_from`, `date_to`, `reason`) values('"+name+"','"+id+"','"+type+"','"+from+"','"+to+"','"+reason+"')"
    console.log(query)
    dbconnection.query(query, callback)
}

module.exports.deleteleave = function(id, callback){
    var query = "delete from leaves where id = '"+id
    dbconnection.query(query, callback);
    console.log(query);
}
module.exports.add_employee = function(name, email, contact, join_date, role, salary, callback){
    var query = "insert into `employee`(`name`, `email`, `contact`, `join_date`, `role`, `salary`) values('"+name+"','"+email+"','"+contact+"','"+join_date+"','"+role+"','"+salary+"')"
    console.log(query)
    dbconnection.query(query, callback)
}

module.exports.searchEmp = function(id, callback){
    var query = "select * from employee where first_name like "%'+key+'%"'"
    dbconnection.query(query, callback);
    console.log(query);
}

module.exports.deleteEmp = function(id, callback){
    var query = "delete from employee where id = "+id
    dbconnection.query(query, callback)
}

module.exports.editEmp = function(id, name,email, contact, join_date, role, callback){
    var query = "update `emplopyee` set `name`='"+name+"',`email`='"+email+"',`contact`='"+contact+"',`join_date`='"+join_date+"',`role`='"+role+"' where id ="+id
    dbconnection.query(query, callback)
}

module.exports.getEmpbyId = function(id, callback){
    var query = "select * from employee where id = "+id
    dbconnection.query(query, callback)
}

module.exports.edit_leave = function(id, name, leave_type, from, to, reason, callback){
    var query = "update `leaves` set `employee`='"+name+"',`leave_type`='"+leave_type+"',`from`='"+from+"',`to`='"+to+"',`reason`='"+reason+"' where id ="+id
    dbconnection.query(query, callback)
}