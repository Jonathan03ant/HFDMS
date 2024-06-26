import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MemberNavBar from '../NavBar/MemberNavBar';


export default function Schedule() {
    const {memberId} = useParams();
    const [schedules, setSchedules] = useState([]);


    const fetchSchedules = async () => {
        const response = await axios.get('http://localhost:3000/api/availability');
        //console.log(response.data); 
        setSchedules(response.data);
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    const handleSchedule = async (availabilityId, trainerId) => {
        try {
            console.log(`availabilityId: ${availabilityId}, memberId: ${memberId}, trainerId: ${trainerId}`);
            const response = await axios.post('http://localhost:3000/api/schedule', { availabilityId, memberId: parseInt(memberId), trainerId: parseInt(trainerId)});
            if (response.status === 200) {
                // Refresh the schedules
                fetchSchedules();
            }
        } catch (error) {
            console.error('Error scheduling:', error);
        }
    };

    return (
        <div className='container mx-auto px-2 sm:px-8'>
            <MemberNavBar memberId={memberId} handleLogout={() => {}} />
            <h1 className='text-2xl my-8  font-semibold'> Please Submit a Schedule</h1>
            <div className='py-1'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Date</th>
                                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Start Time</th>
                                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>End Time</th>
                                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Availability</th>
                                    <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Schedule</th>
                                </tr>
                            </thead>
                            <tbody>
                            {schedules.map(schedule => {
                                console.log(schedule);
                                return (
                                
                                <tr key={schedule.scheduleid}>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{schedule.date}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{schedule.starttime}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{schedule.endtime}</td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm' style={{ color: schedule.available ? 'blue' : 'red' }}>
                                        {schedule.available ? 'Available' : 'Not Available'}
                                    </td>
                                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                    <button 
                                        className='bg-blue-200 w-54 hover:bg-gray-200 text-black py-2 px-4 rounded '
                                        onClick={() => handleSchedule(schedule.availabilityid, schedule.trainerid)}
                                        disabled={!schedule.available}
                                    >
                                        Schedule
                                    </button>
                                    </td>
                                </tr>
                                );
                                })}  
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}