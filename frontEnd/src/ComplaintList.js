import React, { useEffect, useState } from 'react';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]); // State to store complaints
    const [error, setError] = useState(null); // State to store any errors

    // Fetch complaints when the component mounts
    useEffect(() => {
        fetch('http://localhost:3400/complain') // Replace with your backend API URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch complaints');
                }
                return response.json();
            })
            .then((data) => {
                setComplaints(data); // Set the complaints in state
                console.log(complaints)
            })
            .catch((err) => {
                setError(err.message); // Handle errors
            });
    }, []);

    return (
        <div>
            <h1>Complaint List</h1>
            {error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : complaints.length > 0 ? (
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Message</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint, index) => (
                            <tr key={index}>
                                <td>{complaint.id}</td>
                                <td>{complaint.message}</td>
                                <td>{complaint.name}</td>
                                <td>{complaint.email}</td>
                                <td>{complaint.subject}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No complaints found.</p>
            )}
        </div>
    );
};

export default ComplaintList;
