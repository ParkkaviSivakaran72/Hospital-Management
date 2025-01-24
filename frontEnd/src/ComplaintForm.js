import React, { useState } from 'react';

const ComplaintForm = () => {
    const [formData, setFormData] = useState({
        message: '',
        name: '',
        email: '',
        subject: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3400/complain/postcomplain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    setSuccessMessage('Complaint submitted successfully!');
                    setErrorMessage('');
                    // Clear the form
                    // setFormData({
                    //     message: '',
                    //     name: '',
                    //     email: '',
                    //     subject: '',
                    // });
                } else {
                    throw new Error('Failed to submit complaint.');
                }
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setSuccessMessage('');
            });
    };

    return (
        <div>
            <h1>Submit a Complaint</h1>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ComplaintForm;
