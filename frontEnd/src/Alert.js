import React from 'react';

const Alert = ({ message, type }) => {
    if (!message) return null;

    return (
        <div style={{
            color: type === 'error' ? 'red' : 'green',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid',
            borderColor: type === 'error' ? 'darkred' : 'darkgreen',
            borderRadius: '5px'
        }}>
            {message}
        </div>
    );
};

export default Alert;
