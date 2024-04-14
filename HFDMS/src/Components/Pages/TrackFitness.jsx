import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemberNavBar from '../NavBar/MemberNavBar';
import axios from 'axios';

export default function TrackFitness({ handleLogout }) {
    const { memberId } = useParams();
    const [schedules, setSchedules] = useState([]);
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [height, setHeight] = useState('');
    const [previousWeight, setPreviousWeight] = useState('');


    const fetchSchedules = async () => {
        const response = await axios.get(`http://localhost:3000/api/schedules/${memberId}`);
        setSchedules(response.data);
        //console.log(response.data);
    };

    const fetchMetrics = async () => {
        const response = await axios.get(`http://localhost:3000/api/metrics/${memberId}`);
        //console.log(response.data);
        setCurrentWeight(response.data.currentweight || '');
        setPreviousWeight(response.data.previousweight || '');
        setGoalWeight(response.data.goalweight || '');
        setHeight(response.data.height || '');
    };

    useEffect(() => {
        //console.log('Fetching schedules for member', memberId); 
        fetchSchedules();
        fetchMetrics();
    }, [memberId]);

    const upcomingSchedules = schedules.filter(schedule => schedule.schedulestatus === 'Scheduled');
    const confirmedSchedules = schedules.filter(schedule => schedule.schedulestatus === 'Confirmed');

    //console.log(upcomingSchedules);
    //console.log(confirmedSchedules);

    const handleCurrentWeightChange = (event) => {
        setPreviousWeight(currentWeight);
        setCurrentWeight(event.target.value);
    }
    const handleGoalWeightChange = (event) => {
        setGoalWeight(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPreviousWeight(currentWeight);
        try {
            // Make a PUT request to update the current and goal weight
            const response = await axios.put(`http://localhost:3000/api/metrics/${memberId}`, {
                currentweight: currentWeight,
                goalweight: goalWeight,
                height
            });
            console.log('Update response:', response);
            // Handle success (e.g., show success message, refetch metrics)
        } catch (error) {
            console.error('Error updating metrics:', error);
            // Handle error (e.g., show error message to user)
        }
    }

    return (
        <div className='flex'>
        <div className='w-1/4 p-4 my-32 mx-16'>
            <h1 className='text-cyan-950 text-xl my-8'>UPDATE METRICS</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <h2 className="mb-2 font-mono font-bold">Previous Weight: {previousWeight}</h2>
                <label className="mb-2 font-mono font-bold">
                    Current Weight:
                    <input type="text" value={currentWeight} onChange={handleCurrentWeightChange} className="mt-1" />
                </label>
                <label className="mb-2 font-mono font-bold">
                    Goal Weight:
                    <input type="text" value={goalWeight} onChange={handleGoalWeightChange} className="mt-1" />
                </label>
                <label className="mb-2 font-mono font-bold">
                    Height:
                    <input type="text" value={height} disabled className="mt-1" />
                </label>
                <button type="submit" className="your-button-class">Update</button>
            </form>
        </div>
            <div className='w-3/4 p-4 mx-8'>
                <MemberNavBar memberId={memberId} handleLogout={handleLogout} />
                <h1 className='text-2xl my-8 font-semibold'>Track Fitness</h1>
                <div className='py-1'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <h2 className='text-xl my-4 font-semibold'>Upcoming Schedules</h2>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Trainer ID</th>
                                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingSchedules.map(schedule => (
                                        <tr key={schedule.scheduleid}>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                {schedule.trainerid !== null ? schedule.trainerid : 'No Trainer Assigned'}
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                {schedule.schedulestatus}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                            </table>
                            <h2 className='text-xl my-4 font-semibold'>Confirmed Schedules</h2>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Trainer ID</th>
                                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {confirmedSchedules.map(schedule => (
                                        <tr key={schedule.scheduleid}>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                {schedule.trainerid !== null ? schedule.trainerid : 'No Trainer Assigned'}
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                {schedule.schedulestatus}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}