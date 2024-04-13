import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function MemberNavBar({ memberId, handleLogout}) {
    const navigate = useNavigate();
    const onLogout = () => {
        handleLogout();
        navigate('/');
    }
    return (
        <div className='flex justify-end mt-10 w-full'>
            <div className="navbar flex justify-between w-1/2 mr-40 text-md text-black font-bold font-cara space-y-1">
                <Link to={`/member/${memberId}`} className=' bg-blue-200 py-1.5 px-3.5 rounded-sm  hover:bg-gray-200'> Home </Link>
                <Link to="/member-trackfitness" className=' bg-blue-200 py-1.5 px-3.5 rounded-sm  hover:bg-gray-200'> Track Fitness </Link>
                <Link to="/member-schedule" className='flex items-center bg-blue-200 py-1.5 px-3.5 rounded-sm  hover:bg-gray-200'> Schedule </Link>
                <button 
                    className='bg-blue-200 py-1.5 px-3.5 rounded-lg  hover:bg-gray-200'
                    onClick={onLogout}> 
                    Logout 
                </button>
            </div>
        </div>
    );
}


