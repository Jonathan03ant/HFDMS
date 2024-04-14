import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from '../NavBar/AdminNavBar';
import { v4 as uuidv4 } from 'uuid';

const ManageSchedule = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            const response = await axios.get('http://localhost:3000/api/schedules');
            setSchedules(response.data);
        };

        fetchSchedules();
    }, []);

    const confirmSchedule = async (id) => {
        const bookingId = uuidv4();
        const response = await axios.post(`http://localhost:3000/api/schedules/${id}/confirm`, { bookingId, status: 'Confirmed' });
        if (response.status === 200) {
            setSchedules(schedules.map(schedule => schedule.scheduleid === id ? { ...schedule, schedulestatus: 'Confirmed', bookingid: bookingId } : schedule));
        }
    };

    return (
        <div className='mr-12'>
            <AdminNavBar />
            <div className='mx-auto px-4 sm:px-8 min-w-full'>
                <table className='min-w-max w-full table-auto my-16'>
                    <thead>
                        <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                            <th className='py-3 px-6 text-left'>Member ID</th>
                            <th className='py-3 px-6 text-left'>Trainer ID</th>
                            <th className='py-3 px-6 text-center'>Status</th>
                            <th className='py-3 px-6 text-center'>Booking ID</th>
                            <th className='py-3 px-6 text-center'></th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-600 text-sm font-light'>
                        {schedules.map(schedule => (
                            <tr className='border-b border-gray-200 hover:bg-gray-100' key={schedule.id}>
                                <td className='py-3 px-6 text-left'>{schedule.memberid}</td>
                                <td className='py-3 px-6 text-left'>{schedule.trainerid}</td>
                                <td className='py-3 px-6 text-center'>{schedule.schedulestatus}</td>
                                <td className='py-3 px-6 text-center'>{schedule.bookingid}</td>
                                <td className='py-3 px-6 text-center'>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => confirmSchedule(schedule.scheduleid)}>
                                        Confirm
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageSchedule;