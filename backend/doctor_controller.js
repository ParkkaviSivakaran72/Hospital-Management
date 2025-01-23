var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var db = require.main.require('./db_controller')
var multer = require('multer')
var fs = require('fs')
var path = require('path')

// router.get('*',function(req,res,next){
//     if(req.cookies['username']==null){
//         res.redirect('/login')
//     }
//     else{
//         next()
//     }

// })
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets/images/upload_images")
    },
    filename: function(req, file, cb){
        console.log(file)
        cb(null, file.originalname)
    }
})
var upload = multer({storage:storage})



router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

router.get('/add_doctor',function(req,res){
    db.getalldept(function(err,result){
        res.render('add_doctor.ejs',{list:result})
    })
})

router.post('/add_doctor',upload.single('image'),function(req,res){
    db.add_doctor(req.body.first_name, req.body.last_name, req.body.email, req.body.dob, req.body.gender, req.body.address,req.body.phone, req.file.filename, req.body.department, req.body.biography)
    if(db.add_doctor){
        console.log('1 doctor inserted')
    }
    res.render('add_doctor')

})

router.get('/edit_doctor/:id', function(req,res){
    var id = req.params.id;
    db.getDocbyId(id, function(err,result){
        res.render('edit_doctor.ejs',{list:result})
    })
})

router.post('/edit_doctor/:id',function(res,req){
    var id = req.params.id;
    db.editDoc(req.body.first_name, req.body.last_name, req.body.email, req.body.dob, req.body.gender, req.body.address,req.body.phone, req.file.filename, req.body.department, req.body.biography),
    function(err,result){
        if(err)
            throw err;
        res.redirect('back')
    }
})

router.post('/delete_doctor/:id',function(req,res){
    var id = req.params.id;
    db.getDocbyId(id, function(err,result){
        res.redirect('doctor')
    })
})

router.get('/doctors',function(req,res){
    db.getAllDoc(function(err,result){
        if(err)
            throw err;
        res.json(result)
    })
})

router.post('/search', function(req,res){
    var key = req.body.search;
    db.searchDoc(key, function(err,result){
        console.log(result)
        res.render('doctor.ejs',{list:result})
    })
})


router.get('/doctors/:dep_id', function(req, res) {
    const depId = Number(req.params.dep_id)
    db.getDocbyDep(depId,function(err, doctors) {
        if (err) {
            return res.status(500).json({ message: 'Failed to fetch doctors' });
        }
        res.json(doctors); // Send list of doctors to the frontend
    });
});


router.get('/doctor/:id', function(req, res) {
    const doctorId = Number(req.params.id);
    db.getDocbyId(doctorId, function(err, doctor) {
        if (err) {
            return res.status(500).json({ message: 'Failed to fetch doctor details' });
        }
        res.json(doctor); // Send doctor details to the frontend
    });
});


module.exports = router