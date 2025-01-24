import React, { useState, useEffect } from 'react';
import Alert from './Alert';

const AddAppointment = () => {
    const [form, setForm] = useState({
        patient_name: '',
        department: '',
        doctor_id: '',
        date: '',
        time: '',
        email: '',
        phone: ''
    });
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [doctors, setDoctors] = useState([]);
    const [alldoctors,setAllDoctors] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [departmentDesc, setDepartmentDesc] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3400/doctors/doctors')
            .then((response) => response.json())
            .then((data) => {
                setAllDoctors(data)
                setDoctors(data)})
            .catch((error) => console.error('Error fetching departments:', error));
    }, []);


    // Fetch departments once on component mount
    useEffect(() => {
        fetch('http://localhost:3400/appointment/departments')
            .then((response) => response.json())
            .then((data) => setDepartments(data))
            .catch((error) => console.error('Error fetching departments:', error));
    }, []);

    // Fetch doctor details when a doctor is selected
    const handleDoctorSelect = (doctorId) => {
        fetch(`http://localhost:3400/doctors/doctor/${doctorId}`)
            .then((response) => response.json())
            .then((data) => setDoctorDetails(data))
            .catch((error) => console.error('Error fetching doctor details:', error));
    };

    // Fetch department description when a department is selected
    const handleDepSelect = (dep_id) => {
        fetch(`http://localhost:3400/appointment/departments/${dep_id}`)
            .then((response) => response.json())
            .then((data) => {
                setDepartmentDesc(data)
                console.log(departmentDesc)
                console.log(data)})
            .catch((error) => {
                console.error('Error fetching department description:', error)
                console.log(error)});
    };
    const handleDocSelectByDep = (dep_id)=>{
        fetch(`http://localhost:3400/doctors/doctors/${dep_id}`)
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data)
            })
            .catch((error) => {
                console.error('Error fetching doctors from department',error)
            })
    }
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
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(text || 'Error occurred');
                    });
                }
                return response.json();
            })
            .then((data) => {
                setAlert({ message: data.message, type: 'success' });
            })
            .catch((error) => {
                setAlert({ message: error.message, type: 'error' });
            });
    };

    return (
        <div>
            <Alert message={alert.message} type={alert.type} />
            <form onSubmit={handleSubmit}>
                <h1>Add Appointment</h1>
                <div>
                    <input 
                        name="patient_name" 
                        placeholder="Patient Name" 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <select
                        name="department"
                        onChange={(e) => {
                            handleDepSelect(e.target.value);
                            handleDocSelectByDep(e.target.value);
                            handleChange(e);
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>Select a department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.department}
                            </option>
                        ))}
                    </select>

                    {departmentDesc && (
                        <div>
                            <p>Description: {departmentDesc[0]?.department_desc || 'No description available'}</p>
                        </div>
                    )}
                </div>
                <div>
                    <select
                        name="doctor_id"
                        onChange={(e) => {
                            
                            handleDoctorSelect(e.target.value);
                            handleChange(e);
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>Select a Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.first_name} {doctor.last_name} ({doctor.department})
                            </option>
                        ))}
                    </select>

                    {doctorDetails && doctorDetails[0] && (
                        <div>
                            <p>Name: {doctorDetails[0].first_name} {doctorDetails[0].last_name}</p>
                            <p>Department: {doctorDetails[0].department}</p>
                            <p>Email: {doctorDetails[0].email}</p>
                            <p>Phone: {doctorDetails[0].phone}</p>
                        </div>
                    )}
                </div>
                <div>
                    <input type="date" name="date" onChange={handleChange} required />
                </div>
                <div>
                    <input type="time" name="time" onChange={handleChange} required />
                </div>
                <div>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                </div>
                <div>
                    <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddAppointment;
