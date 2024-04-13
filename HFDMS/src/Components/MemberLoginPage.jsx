import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MemberLoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/members/authenticate', { username, pin });
            if (response.data.success) {
                navigate(`/member/${response.data.memberId}`);
            } else {
                alert('Invalid username or PIN');
            }
        } catch (error) {
            console.error('Error authenticating:', error);
        }
    };

    return (
        <div className='container h-screen flex justify-center items-center space-x-34 w-full'>
            <div className='w-1/3'>
                <form onSubmit={handleFormSubmit}>
                    <input className='w-72 p-2 h-10' type="text" name="username" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} required />
                    <input className='w-72 p-2 h-10' type="password" name="pin" placeholder="Enter PIN" onChange={e => setPin(e.target.value)} required />
                    <button 
                        className='bg-blue-200 w-54 hover:bg-gray-200 text-black py-2 px-4 rounded '
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}