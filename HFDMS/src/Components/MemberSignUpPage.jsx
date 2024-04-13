import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function MemberSignUpPage() {

    const navigate = useNavigate();
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

    const [paymentForm, setPaymentForm] = useState({
        amount: '',
        dueDate: '',
    })

    
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [memberId, setMemberId] = useState(null);
    const [healthMetricsSubmitted, setHealthMetricsSubmitted] = useState(false);
    const [paymentSubmitted, setPaymentSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleHealthMetricsChange = (e) => {
        setHealthMetricsForm({ ...healthMetricsForm, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
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

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        try {
            const { amount, dueDate } = paymentForm;
            const date = new Date(dueDate);
            const response = await axios.post('http://localhost:3000/api/submitPayment', { amount, dueDate: date, memberId });
            setPaymentSubmitted(true);  
            navigate(`/member/${memberId}`); 
        } catch (error) {
            console.error('Error submitting payment:', error);
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
                        !paymentSubmitted ? (
                            <form 
                                className='flex flex-col space-y-2'
                                onSubmit={handlePaymentSubmit}
                            >
                                <input className='w-72 p-2 h-10' type="text" name="amount" placeholder="Amount" onChange={handlePaymentChange} required />
                                <input className='w-72 p-2 h-10' type="text" name="dueDate" placeholder="Due Date" onChange={handlePaymentChange} required />
                                <button 
                                    className='bg-blue-200 w-54 hover:bg-gray-200 text-black py-2 px-4 rounded '
                                    type="submit"
                                >
                                    Submit Payment
                                </button>
                            </form>
                        ) : (
                            <h1 className='font-mono w-72 p-2 h-10'>PAYMENT SUBMITTED</h1>
                        )
                    )
                )}
            </div>
        </>
    )
}