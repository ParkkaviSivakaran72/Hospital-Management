import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import { useParams } from 'react-router-dom';

const EditAppointment = ({ appointmentId }) => {
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
    const [alldoctors, setAllDoctors] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [departmentDesc, setDepartmentDesc] = useState(null);

    // Fetch initial data for appointment
    useEffect(() => {
        if (appointmentId) {
            // console.log(`Fetching appointment data for ID: ${appointmentId}`);
            
            fetch(`http://localhost:3400/appointment/edit_appointment/${appointmentId}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setForm({
                        patient_name: data[0].patient_name || '',
                        department: data[0].department || '',
                        doctor_id: data[0].doctor_id || '',
                        date: data[0].date || '',
                        time: data[0].time || '',
                        email: data[0].email || '',
                        phone: data[0].phone || ''
                    });
                    // console.log('Appointment data:', data);
    
                    fetch('http://localhost:3400/appointment/departments')
                        .then((depResponse) => depResponse.json())
                        .then((departments) => {
                            // console.log('Departments:', departments);
                            // Match department name to its ID, handling possible undefined or null values
                            const matchingDepartment = departments.find(
                                (dep) => {
                                    // console.log('Checking department:', dep.id);
                                    // console.log('Comparing to data.department:', data[0].department);
                                    // console.log(dep.id == data[0].department)
                                    return dep.id && dep.id == data[0].department}
                                
                            );
                            const dep_id = matchingDepartment ? matchingDepartment.id : null;
                            // console.log(matchingDepartment)
                            // console.log(dep_id)
                            if (dep_id) {
                                setForm({ ...data, department: dep_id });
                                handleDepSelect(dep_id); 
                                handleDocSelectByDep(dep_id); 
                            } else {
                                console.error('Department not found!');
                                
                            }
                        })
                        .catch((error) => console.error('Error fetching departments:', error));
                    // doctors
                    fetch('http://localhost:3400/doctors/doctors')
                        .then((docResponse) => docResponse.json())
                        .then((doctors) => {
                            // console.log(doctors)
                            const matchingDoctors = doctors.find(
                                (doc) => {
                                    // console.log('Checking doctor:', doc.id);
                                    // console.log('Comparing to data.doctor:', data[0].doctor_id);
                                    // console.log(doc.id == data[0].doctor_id)
                                    return doc.id && doc.id == data[0].doctor_id}
                                
                            );
                            const doc_id = matchingDoctors ? matchingDoctors.id : null;
                            // console.log(matchingDepartment)
                            // console.log(dep_id)
                            if (doc_id) {
                                setForm({ ...data, doctor_id: doc_id });
                                // handleDepSelect(dep_id); 
                                // handleDocSelectByDep(dep_id); 
                            } else {
                                console.error('Doctor not found!');
                                
                            }
                        })
                        .catch((error) => console.error('Error fetching doctors:', error));
                })
                .catch((error) => console.error('Error fetching appointment:', error));
        }
    }, [appointmentId]);

    // Fetch doctors and departments
    useEffect(() => {
        fetch('http://localhost:3400/doctors/doctors')
            .then((response) => response.json())
            .then((data) => {
                setAllDoctors(data);
                setDoctors(data);
            })
            .catch((error) => console.error('Error fetching doctors:', error));

        fetch('http://localhost:3400/appointment/departments')
            .then((response) => response.json())
            .then((data) => setDepartments(data))
            .catch((error) => console.error('Error fetching departments:', error));
    }, []);

    // Fetch department description
    const handleDepSelect = (dep_id) => {
        fetch(`http://localhost:3400/appointment/departments/${dep_id}`)
            .then((response) => response.json())
            .then((data) => {
                setDepartmentDesc(data);
            })
            .catch((error) => console.error('Error fetching department description:', error));
    };

    // Fetch doctors by department
    const handleDocSelectByDep = (dep_id) => {
        fetch(`http://localhost:3400/doctors/doctors/${dep_id}`)
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data);
            })
            .catch((error) => console.error('Error fetching doctors by department:', error));
    };

    // Fetch selected doctor details
    const handleDoctorSelect = (doctorId) => {
        fetch(`http://localhost:3400/doctors/doctor/${doctorId}`)
            .then((response) => response.json())
            .then((data) => setDoctorDetails(data))
            .catch((error) => console.error('Error fetching doctor details:', error));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3400/appointment/edit_appointment/${appointmentId}`, {
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
    console.log(form)
    return (
        <div>
            <Alert message={alert.message} type={alert.type} />
            <form onSubmit={handleSubmit}>
                <h1>Edit Appointment</h1>
                <div>
                    <input 
                        name="patient_name" 
                        value={form.patient_name} 
                        placeholder="Patient Name" 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <select
                        name="department"
                        value={form.department}
                        onChange={(e) => {
                            handleDepSelect(e.target.value);
                            handleDocSelectByDep(e.target.value);
                            handleChange(e);
                        }}
                        required
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
                        value={form.doctor_id}
                        onChange={(e) => {
                            handleChange(e);
                            handleDoctorSelect(e.target.value);
                        }}
                        required
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
                    <input 
                        type="date" 
                        name="date" 
                        value={form.date} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <input 
                        type="time" 
                        name="time" 
                        value={form.time} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <input 
                        type="email" 
                        name="email" 
                        value={form.email} 
                        placeholder="Email" 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <input 
                        type="tel" 
                        name="phone" 
                        value={form.phone} 
                        placeholder="Phone" 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
            {/* {alert.type === 'success' && (
            <div>
                <h2>Edited Appointment Details:</h2>
                <p>Patient Name: {form[0].patient_name}</p>
                <p>Department: {form[0].department}</p>
                <p>Doctor: {form[0].doctor_id}</p>
                <p>Date: {form[0].date}</p>
                <p>Time: {form[0].time}</p>
                <p>Email: {form[0].email}</p>
                <p>Phone: {form[0].phone}</p>
            </div>
        )} */}
        </div>
        
    );
};

export default EditAppointment;
