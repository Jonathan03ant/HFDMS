import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AvailabilityForm() {
    const [trainerId, setTrainerId] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const availabilityData = {
            TrainerID: trainerId,
            Date: date,
            StartTime: startTime,
            EndTime: endTime,
            Available: true,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/availability', availabilityData);
            if (response.data.status === 'success') {
                alert('Availability added');
                navigate('/trainer-home');
            } else {
                console.error('Error adding availability:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding availability:', error);
        }
    };

    return (
        <div className='container h-screen flex justify-center items-center space-x-34 w-full'>
            <div className='w-1/3'>
                <p>ADD AVAILABILITY</p>
            </div>
            <div className="flex flex-col justify-center space-x-5 mt-20 ml-20">
                <div className='font-cara flex flex-col justify-center space-y-5 mt-20'>
                    <form onSubmit={handleSubmit}>
                        <input type="number" value={trainerId} onChange={(e) => setTrainerId(e.target.value)} placeholder="Enter Trainer ID" className='px-4 mx-2' required />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className='px-4 mx-2' required />
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} placeholder="Enter Start Time" className='px-4 mx-2' required />
                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} placeholder="Enter End Time" className='px-4 mx-2' required />
                        <button type="submit" className='bg-blue-200 w-32 hover:bg-gray-200 text-black py-2 px-4 rounded'>ADD</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AvailabilityForm;