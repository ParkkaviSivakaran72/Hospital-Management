import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3400/', {
                username,
                password,
            });

            if (response.data.errors) {
                setError(response.data.errors.map(err => err.msg).join(', '));
            } else if (response.data === "please verify your email") {
                setError("Please verify your email");
            } else {
                setSuccess("Login successful!");
                setTimeout(() => {
                    window.location.href = '/home'; // Redirect to the home page
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data || 'An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <h2>Login</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
