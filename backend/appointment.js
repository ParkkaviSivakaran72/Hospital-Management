var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var db = require.main.require('./db_controller')



// router.get('*', function(req, res, next){
//     if(req.cookies['username']==null){
//         res.redirect('/login')
//     }
//     else{
//         next()
//     }
// })

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
    db.add_appointment(req.body.patient_name, req.body.department, req.body.doctor_id, req.body.date, req.body.time, req.body.email, req.body.phone,
        function(err, result){
            if (err) {
                console.log(err)
                return res.status(500).json({ message: 'Failed to add appointment.' });
            }
            res.status(200).json({ message: 'Appointment added successfully!' });
        }
    )
})

router.get('/edit_appointment/:id',function(req,res){
    var appointmentId = req.params.id;
    db.getappointmentbyid(appointmentId, function(err,result){
        if(err){
            // console.log(err)
            
        }
        console.log(result)
        // res.render('edit_appointment.ejs',{list:result})
        res.json(result)
    })
})
router.post('/edit_appointment/:id', function(req, res) {
    var appointmentId = req.params.id;
    // var { patient_name, department,  date, time, email, phone,doctor_id } = req.body;
    // const formattedDate = new Date(date).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
    // console.log(formattedDate)

    db.editappointment(appointmentId, req.body.patient_name, req.body.department,  req.body.date, req.body.time, req.body.email, req.body.phone,req.body.doctor_id, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to edit appointment.' });
        }
        res.status(200).json({ message: 'Appointment edited successfully!' });
    });
});


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

router.get('/departments',(req,res) => {
    db.getDepartment(function(err,departments) {
        if(err){
            console.log(err)
            res.status(500).json({message:'Failed to fetch depatments'})
        }
        res.json(departments)
    })
})

router.get('/departments/:dep_id', function(req, res) {
    const dep_id=Number(req.params.dep_id);
    db.getDepByName(dep_id, function(err, department) {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'Failed to fetch department details' });
        }
        res.json(department); // Send doctor details to the frontend
    });
});

module.exports = router