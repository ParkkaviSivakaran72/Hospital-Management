var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var db = require.main.require('./db_controller')

// router.get('*', function(res,req,next){
//     if(req.cookies['username'] == null){
//         res.redirect('/login')
//     }
//     else{
//         next()
//     }
// })

router.get('/',function(req,res){
    // res.render('complain.ejs')
    db.getcomplain(function(err,result){
        if(err){
            console.log(err)
            res.status(200).json({Message:'Failed to complain'})
        }
        res.json(result);
    })
    
})

router.post('/postcomplain',function(req,res){
    var message = req.body.message;
    var name= req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    db.postcomplain(message, name,email,subject,
        function(err,result){
            res.redirect('back')
        }
    )
})

module.exports = router