import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3400/appointment')
            .then((res) => res.json())
            .then((data) => setAppointments(data))
            .catch((err) => console.error('Error:', err));
    }, []);

    return (
        <div>
            <h1>Appointments</h1>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                        {appointment.p_name} - {appointment.department} 
                        <Link to={`/edit_appointment/${appointment.id}`}>Edit</Link> | 
                        <Link to={`/delete_appointment/${appointment.id}`}>Delete</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
