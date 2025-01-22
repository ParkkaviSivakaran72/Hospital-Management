var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var db = require.main.require('./db_controller')



router.get('*', function(req, res, next){
    if(req.cookies['username']==null){
        res.redirect('/login')
    }
    else{
        next()
    }
})

router.get('/',function(req,res){
    db.getallappointment(function(err,result){
        console.log(result)
        res.render('appointment.ejs',{list:result})
    })
})

router.get('/add_appointment', function(req,res){
    res.render('add_appointment.ejs')
})

router.post('/add_appointment',function(req,res){
    const appointmentDate = new Date(req.body.date); // Parse the provided date
    const currentDate = new Date(); // Get the current date

    currentDate.setHours(0, 0, 0, 0);

    if (appointmentDate < currentDate) {
  
        return res.status(400).json({message:'Error: You cannot book an appointment for a past date.'});
    }
    db.add_appointment(req.body.p_name, req.body.department, req.body.d_name, req.body.date, req.body.time, req.body.email, req.body.phone,
        function(err, result){
            if (err) {
                return res.status(500).json({ message: 'Failed to add appointment.' });
            }
            res.status(200).json({ message: 'Appointment added successfully!' });
        }
    )
})

router.get('/edit_appointment/:id',function(req,res){
    var id = req.params.id;
    db.getappointmentbyid(id, function(err,result){
        console.log(result)
        res.render('edit_appointment.ejs',{list:result})
    })
})
router.post('/edit_appointment/:id',function(req,res){
    var id = req.params.id;
    db.editappointment(id, function(err,result){
        
        res.redirect('/appointment')
    })
})

router.get('/delete_appointment/:id', function(req,res){
    var id = req.params.id;
    db.getallappointmentbyid(id, function(err,result){
        console.log(results)
        res.render('delete_appointment.ejs',{list:result})
    })
})

router.post('/delete_appointment/:id', function(req,res){
    var id = req.params.id;
    db.deleteappointment(id, function(err, result){
        res.redirect('/appointment')
    })
})

module.exports = router