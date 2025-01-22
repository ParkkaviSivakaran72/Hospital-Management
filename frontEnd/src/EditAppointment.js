import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAppointment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3400/appointment/edit_appointment/${id}`)
            .then((res) => res.json())
            .then((data) => setForm(data[0]))
            .catch((err) => console.error('Error:', err));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3400/appointment/edit_appointment/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
            .then(() => navigate('/'))
            .catch((err) => console.error('Error:', err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Appointment</h1>
            <input name="p_name" value={form.p_name || ''} onChange={handleChange} required />
            <button type="submit">Save</button>
        </form>
    );
};

export default EditAppointment;
