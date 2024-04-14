import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TrainersLandingPage() {
    const navigate = useNavigate();

    const [trainers, setTrainers] = useState([]);
    const [selectTrainers, setSelectTrainers] = useState(null);
    const [pin, setPin] = useState('');

    useEffect(() => {
        const fetchTrainers = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/trainers');
            setTrainers(response.data);
          } catch (error) {
            console.error('Error fetching trainers:', error);
          }
        };
    
        fetchTrainers();
     }, []);

     const handleTrainerSelection = (event) => {
        setSelectTrainers(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/trainers/authenticate', { TrainerID: selectTrainers, Pin: pin });
            if (response.data.success) {
                navigate('/trainer-home'); // navigate without passing state
            } else {
                alert('Invalid ID or PIN');
            }
        } catch (error) {
            console.error('Error authenticating:', error);
        }
    };


    return (
        <div className='container h-screen flex justify-center items-center space-x-34 w-full'>
            <div className='w-1/3'>
                {/* Place your Lottie animation component here */}
                <p>PLEASE LOG IN</p>
            </div>
            <div className="flex flex-col justify-center space-x-5 mt-20 ml-20">
                <div className='font-cara flex flex-col justify-center space-y-5 mt-20'>
                    <form onSubmit={handleFormSubmit}>
                        <select onChange={handleTrainerSelection} className='bg-white text-black border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
                            <option value="">Select a trainer</option>
                            {trainers.map((trainer) => (
                                <option key={trainer.trainerid} value={trainer.trainerid}>
                                    {trainer.fullname}
                                </option>
                            ))}
                        </select>
                        <input className='px-4 mx-2' type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter PIN" />
                        <button type="submit" className='bg-blue-200 w-32 hover:bg-gray-200 text-black py-2 px-4 rounded'>SIGNIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
}