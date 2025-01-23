import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteAppointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [appointments,setAppointments] =useState([])
    const [alert, setAlert] = useState({ message: '', type: '' });
    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    
        fetch(`http://localhost:3400/appointment/delete_appointment/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(text || 'Error occurred');
                    });
                }
                return response.json();
            })
            .then((data) => {
                setAlert({ message: data.message, type: 'success' });
                // Optionally refresh data or remove the deleted appointment from state
            })
            .catch((error) => {
                setAlert({ message: error.message, type: 'error' });
            });
    };
    useEffect(() => {
        fetch('http://localhost:3400/appointment/get_appointments')
            .then((response) => response.json())
            .then((data) => setAppointments(data))
            .catch((error) => console.error('Error fetching appointments:', error));
    }, []);    

    return (
        <div>
            <h2>Appointments</h2>
            {appointments.map((appointment) => (
                <div key={appointment.id}>
                    <p>Patient: {appointment.patient_name}</p>
                    <p>Department: {appointment.department}</p>
                    <p>Doctor: {appointment.doctor_id}</p>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.time}</p>
                    <p>Email: {appointment.email}</p>
                    <p>Phone: {appointment.phone}</p>
                    <button onClick={() => handleDelete(appointment.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default DeleteAppointment;
