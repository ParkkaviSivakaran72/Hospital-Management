const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const dbconnection = require('./dbconnection'); // Adjust path as needed

var session=require('express-session')
var cookie=require('cookie-parser')
var path=require('path')
var ejs=require('ejs')
var multer=require('multer')
var async =require('async')
var nodemailer=require('nodemailer')
var crypto=require('crypto')
var expressValidator=require('express-validator')
var sweetalert=require('sweetalert2')
var bodyParser=require('body-parser')
const http=require('http')
var signup=require('./signup')
var login = require('./login')

const app = express()
app.set('view engine','ejs')
const server=http.createServer(app)

app.use(express.static('./public'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookie())

app.use('/signup',signup)
app.use('/login',login)

// const db=mysql.createConnection({
//     host:"localhost",
//     user:'root',
//     password:'Kavi72*02',
//     database:'hospitalmanagements'
// })

// db.connect(err => {
//     if (err) {
//       console.error('Error connecting: ' + err.stack);
//       return;
//     }
//     console.log('Connected as id ' + db.threadId);
//   })

app.get('/',(re,res)=>{
    return res.json("from backend side");
})

app.get('/patients',(req,res)=>{
    const sql="select * from patient";
    dbconnection.query(sql,(err,data)=>{
        if(err)
            return res.json(err);
        return res.json(data);
    })
})


const PORT=process.env.PORT||3400
app.listen(PORT,() =>{
    console.log("listening");
})