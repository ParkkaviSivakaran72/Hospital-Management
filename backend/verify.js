var express = require('express')
var router = express.Router()
var bodyParser = require("body-parser")
const dbConnection = require('./dbconnection')
var db=require.main.require('./db_controller')

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())


// router.get('/',function(req,res){
//     res.render('verify.ejs')
// })


router.post('/',function(req,res){
    var id = req.body.id;
    var token = req.body.token;
    db.matchtoken(id,token,function(err,result){
        console.log(result)
        if(result.length>0){
            var email = result[0].email
            var email_status = 'verified'
            db.updateVerify(email,email_status,function(err,result){
                res.send("Email verified")
            })

        }
        else{
            res.send('token did not match')
        }
    })
})


module.exports=router