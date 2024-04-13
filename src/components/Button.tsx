import React from 'react';
import { useFormStatus } from 'react-dom';
// Ensure this import points to the correct location of useFormStatus

const Button = () => {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="rounded-lg bg-red-500">
            {pending ? <span className="loading loading-ring loading-lg"></span> : 'Submit'}
        </button>
    );
};

export default Button;
