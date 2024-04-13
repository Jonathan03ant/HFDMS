import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function MemberSignUpPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        pin: '',
    });

    const [healthMetricsForm, setHealthMetricsForm] = useState({
        currentWeight: '',
        goalWeight: '',
        height: '',
     });

    const [signupSuccess, setSignupSuccess] = useState(false);
    const [memberId, setMemberId] = useState(null);
    const [healthMetricsSubmitted, setHealthMetricsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleHealthMetricsChange = (e) => {
        setHealthMetricsForm({ ...healthMetricsForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/signup', formData);
            if (response.status === 201) {
                console.log(response.data.memberId);
                setSignupSuccess(true);
                setMemberId(response.data.memberId);
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error === 'Username already exists') {
                alert('Username already exists, Login instead!');
            } else {
                console.error('Error signing up:', error);
            }
        }
    }

    const handleHealthMetricsSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/healthmetrics-pop', { ...healthMetricsForm, memberId });
            setHealthMetricsSubmitted(true);    
        } catch (error) {
          console.error('Error submitting health metrics:', error);
        }
     };

    return (
        <>
            <div className='container h-screen flex justify-center items-center space-x-40'>
                {!signupSuccess ? (
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
                ) : (
                    !healthMetricsSubmitted ? (
                        <div>
                            <h1 className='font-mono w-72 p-2 h-10' > Account Created</h1>
                            <h2 className=' font-mono'> Enter Your Info Down </h2>
                            <form 
                            className='flex flex-col space-y-2'
                            onSubmit={handleHealthMetricsSubmit}
                            >
                                <input className='w-72 p-2 h-10' type="text" name="currentWeight" placeholder="Enter Weight" onChange={handleHealthMetricsChange} required />
                                <input className='w-72 p-2 h-10' type="text" name="goalWeight" placeholder="Goal Weight" onChange={handleHealthMetricsChange} required />
                                <input className='w-72 p-2 h-10' type="text" name="height" placeholder="Height" onChange={handleHealthMetricsChange} required />
                                <button 
                                className='bg-blue-200 w-54 hover:bg-gray-200 text-black py-2 px-4 rounded '
                                type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    ) : (
                        <h1 className='font-mono w-72 p-2 h-10' > Health Metrics Submitted</h1>
                    )    
                )}
            </div>
        </>
    )
}