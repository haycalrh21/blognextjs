import React from 'react';

const Button = ({ type, onClick, children, variant = 'primary' }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${variant}`}
        >
            {children}
        </button>
    );
}

export default Button;
