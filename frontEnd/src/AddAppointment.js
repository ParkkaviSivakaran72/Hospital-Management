import React, { useState,useEffect } from 'react';
import Alert from './Alert';

const AddAppointment = () => {
    const [form, setForm] = useState({
        p_name: '',
        department: '',
        doctor_id: '',
        date: '',
        time: '',
        email: '',
        phone: ''
    });
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [doctors, setDoctors] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3400/doctors/doctors') // Backend route to fetch doctors
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data); // Set doctors list
            })
            .catch((error) => console.error('Error fetching doctors:', error));
    }, []);
    useEffect(() => {
        if (doctorDetails) {
            console.log("Doctor details updated:", doctorDetails);
        }
    }, [doctorDetails]);
    

    const handleDoctorSelect = (doctorId) => {
        
        fetch(`http://localhost:3400/doctors/doctor/${doctorId}`) // Backend route to fetch doctor details
            .then((response) => response.json())
            .then((data) => {
                setDoctorDetails(data); 
                // setForm({ ...form, [e.target.name]: e.target.value });
                console.log(data);
                console.log(doctorDetails)
            })
            .catch((error) => console.error('Error fetching doctor details:', error));
            
    };
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3400/appointment/add_appointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
            .then((response) => {
                // Check if the response is ok (status code 200-299)
                if (!response.ok) {
                    // If not, handle the error (try to parse error message if available)
                    return response.text().then((text) => {
                        throw new Error(text || 'Error occurred');
                    });
                }
                
                // If response is ok, check if content type is JSON
                if (response.headers.get('Content-Type').includes('application/json')) {
                    return response.json();
                } else {
                    throw new Error('Unexpected response type');
                }
            })
            .then((data) => {
                // If the response is JSON, show the success message
                setAlert({ message: data.message, type: 'success' });
            })
            .catch((error) => {
                // Display error message if anything fails
                setAlert({ message: error.message, type: 'error' });
            });
    };

    return (
        <div>
            <Alert message={alert.message} type={alert.type} />
            <form onSubmit={handleSubmit}>
                <h1>Add Appointment</h1>
                <input name="p_name" placeholder="Patient Name" onChange={handleChange} required />
                <input name="department" placeholder="Department" onChange={handleChange} required />
                <select name= "doctor_id" onChange={(e) => {handleDoctorSelect(e.target.value);handleChange(e);}} defaultValue="">
                    <option value="" disabled>Select a Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.first_name} {doctor.last_name} ({doctor.department})
                        </option>
                    ))}
                </select>
                {doctorDetails &&  (
                    <div>
                        <h2>Doctor Details</h2>
                        <p>Name: {doctorDetails[0].first_name} {doctorDetails.last_name}</p>
                        <p>Department: {doctorDetails[0].department}</p>
                        <p>Email: {doctorDetails[0].email}</p>
                        <p>Phone: {doctorDetails[0].phone}</p>
                        
                    </div>
                )}
                 
                <input type="date" name="date" onChange={handleChange} required />
                <input type="time" name="time" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddAppointment;
