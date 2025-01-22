import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteAppointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch(`http://localhost:3400/appointment/delete_appointment/${id}`, {
            method: 'POST',
        })
            .then(() => navigate('/'))
            .catch((err) => console.error('Error:', err));
    };

    return (
        <div>
            <h1>Are you sure you want to delete this appointment?</h1>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => navigate('/')}>No</button>
        </div>
    );
};

export default DeleteAppointment;
