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
    var username = request.body.username;
    var password = request.body.password;

    if(username && password){
        dbconnection.query('select * from users where username = ? , and password = ?',[username,password],
            function(error,results,fields){
                if(results.length>0){
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.cookie('username',username)
                    var status = result[0].email_status
                    if(status == "not_verified"){
                        response.send("please verify your email")
                    }
                    else{
                        sweetalert.fire('logged in')
                        response.redirect('/home')
                    }
                }
                else{
                    response.send("incorrect username/password")
                }
                response.end()
            }
        )
    }
    else{
        response.send("please enter your username and password")
        response.end()
    }


})

module.exports = router