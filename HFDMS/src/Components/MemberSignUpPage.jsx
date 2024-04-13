import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function MemberSignUpPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        pin: '',
    });
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/signup', formData);
            if (response.status === 201) {
                setSignupSuccess(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error === 'Username already exists') {
                alert('Username already exists, Login instead!');
            } else {
                console.error('Error signing up:', error);
            }
        }
    }
    return (
        <>
            <div className='container h-screen flex justify-center items-center space-x-40'>
                <form 
                className='flex flex-col space-y-2'
                onSubmit={handleSubmit}
                >
                    <input className='w-72 p-2 h-10' type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
                    <input className='w-72 p-2 h-10' type="text" name="username" placeholder="Username" onChange={handleChange} required />
                    <input className='w-72 p-2 h-10' type="password" name="pin" placeholder="Pin" onChange={handleChange} required />
                    <button 
                    className='bg-blue-200 w-54 hover:bg-gray-200 text-black py-2 px-4 rounded '
                    type="submit"
                    >
                        Sign Up
                    </button>
            </form>
            {signupSuccess && <h1 className='w-72 p-2 h-10' >Success! Your account has been created.</h1>}
            </div>
        </>
    )
}