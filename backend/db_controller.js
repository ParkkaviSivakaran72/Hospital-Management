const express = require('express');
const mysql = require('mysql');
const router=express.Router();
const dbconnection = require('./dbconnection');
const bodyParser=require('body-parser')

module.exports.signup=function(username,email,password,email_status,callback){
    dbconnection.query(`select email from users where email=${email}`,
    function(err,result){
        if(result==undefined){
            var query=`insert into users(username, email,password,email_status) values (${username},${email},${password},${email_status})`
            console.log(query);
        }
        else{
            console.log("error")
            console.log(err)
        }
    }
)
}

module.exports.verify=function(username,email,token,callback){
    var query=`insert into verify(username,email,token) values ('${username}','${email}','${token}')`
    dbconnection.query(query,callback)
}

module.exports.getuserid=function(email,callback){
    var query=`select * from verify where email = '${email}'`
    dbconnection.query(query,callback)
}

module.exports.matchtoken=function(id,token,callback){
    var query="select * from `verify` where token = '"+token+"' and id= "+id
    dbconnection.query(query,callback)
    console.log(query)
}
module.exports.updateverify=function(email,email_status,callback){
    var query=`update users set email_status = '`+email_status+`' where email= '`+email_status+`'`
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

module.exports.getDocbyDep = function(dep_id,callback){
    var query = `SELECT de.id,d.* FROM doctor d JOIN departments de ON de.department_name=d.department WHERE de.id = `+dep_id
    dbconnection.query(query,callback)
}
module.exports.getDocbyId = function(id, callback){
    var query = "select first_name,last_name,department,email,phone from doctor where id = "+id
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

module.exports.add_appointment = function(p_name, department, doctor_id, date, time, email, phone, callback) {
    const currentDate = new Date();
    const appointmentDate = new Date(date); 

    if (appointmentDate < currentDate) {
        return callback({ message: "Error: You cannot book an appointment for a past date." }, null);
    }

    var query = "INSERT INTO appointment (patient_name, department, doctor_id, date, time, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    dbconnection.query(query, [p_name, department, doctor_id, date, time, email, phone], (err, result) => {
        if (err) {
            return callback({ message: "Database error: " + err.message }, null);
        }
        callback(null, { message: "Appointment added successfully!" });
    });
};


module.exports.getallappointment = function(callback){
    var query = "select * from appointment"
    dbconnection.query(query,callback)
}

module.exports.editappointment = function(id, p_name, department, doctor_id, date, time,email,phone, callback){
    var query = "update `appointment` set `patient_name`='"+p_name+"',`department`='"+department+"',`doctor_id`='"+doctor_id+"',`date`='"+date+"',`time`='"+time+"',`email`='"+email+"',`phone`='"+phone+"' where id ="+id
    dbconnection.query(query, callback)
}

module.exports.deleteappointment = function(id, callback){
    var query= "delete from appointment where id = "+id
    dbconnection.query(query,callback)
}

module.exports.getallmed = function(callback){
    var query = "select * from store order by id desc"
    dbconnection.query(query,callback)
}

module.exports.addMed = function(name, p_date,expire,e_date,price,quantity,callback){
    var query = "insert into store(name,p_date,expire,expire_end,price,quantity) values('"+name+"','"+p_date+"','"+expire+"','"+e_date+"','"+price+"','"+quantity+"')"
    dbconnection.query(query,callback)
}
module.exports.getMedbyId = function(id, callback){
    var query = "select * from store where id = "+id;
    dbconnection.query(query,callback)
}

module.exports.editMed = function(name, p_date,expire,e_date,price,quantity,callback){
    var query = "update store set name = '"+name+"',p_date= '"+p_date+"',expire = '"+expire+"',expire_end = '"+expire_end+"',price = '"+price+"',quantity = '"+quantity+"' where id ="+id 
    dbconnection.query(query,callback)
}

module.exports.deletemed = function(id , callback){
    var query = "delete from store where id ="+id
    dbconnection.query(query,callback)
}

module.exports.searchmed = function(key, callback){
    var query ="select * from where name like '%"+key+"%'"
    dbconnection.query(query, callback)
}

module.exports.postcomplain = function(message,name,email,subject,callback){
    var query ="insert into complain (message,name,email,subject) values ('"+message+"','"+name+"','"+email+"','"+subject+"')"
    dbconnection.query(query,callback)
}

module.exports.getcomplain = function(callback){
    var query ="select * from complain"
    dbconnection.query(query,callback)
}

module.exports.getDepartment = function(callback){
    var query = `SELECT DISTINCT de.id,  d.department,de.department_desc FROM doctor d JOIN departments de on de.department_name= d.department`
    dbconnection.query(query,callback)
}

module.exports.getDepByName = function(dep_id,callback){
    var query = `SELECT de.id,d.department,de.department_desc FROM doctor d JOIN departments de on de.department_name= d.department WHERE de.id = `+dep_id
    dbconnection.query(query,callback);
}