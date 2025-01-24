import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3400/appointment/get_appointments')
            .then((res) => res.json())
            .then((data) => {
                setAppointments(data)
                console.log(appointments)})
            .catch((err) => console.error('Error:', err));
    }, []);

    return (
        <div>
            <h1>Appointments</h1>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient Name</th>
                        <th>Department</th>
                        <th>Doctor_name</th>
                        <th>Date</th>
                        <th>Time</th>
                        
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                            <td>{appointment.patient_name}</td>
                            <td>{appointment.department}</td>
                            <td>{appointment.doctor_id}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>
                                <Link to={`/edit_appointment/${appointment.id}`}>Edit</Link> | 
                                <Link to={`/delete_appointment/${appointment.id}`}> Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentList;
