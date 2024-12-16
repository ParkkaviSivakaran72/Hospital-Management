var express = require('express')
var router = express.Router()
var bodyParser=require('body-parser')
var db=require.main.require('./db_controller')
var mysql=require('mysql')
var nodemailer=require('nodemailer')
var randomToken=require('random-token')
var session = require('express-session')
var sweetalert = require('sweetalert2')
const dbconnection = require('./dbconnection');
const {check,validationResult}=require('express-validator')


router.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

router.post('/',[check('username').notEmpty().withMessage("username is required"),
    check('password').notEmpty().withMessage("password is required")
],function(request,response){
    const errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(422).json({errors:errors.array()})

    }
    var email = request.body.email;
    var password = request.body.password;

    if(username && password){
        dbconnection.query('select * from users where username = ? , and password = ?',[username,password],
            
        )
    }


})