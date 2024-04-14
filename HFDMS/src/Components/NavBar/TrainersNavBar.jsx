import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function TrainersNavBar({ handleLogout }) {
    const navigate = useNavigate();
    const onLogout = () => {
        handleLogout();
        navigate('/');
    }
    return (
        <div className='flex flex-col justify-end mt-10 w-full mx-'>
            <div className="navbar flex justify-between w-full mr-40 text-md text-black font-bold font-cara space-y-1 mb-4">
                <Link to="/admin-home" className=' bg-blue-200 py-1.5 px-3.5 rounded-sm  hover:bg-gray-200 ml-8'> Home </Link>
                <button 
                    className='bg-blue-200 py-1.5 px-3.5 rounded-lg  hover:bg-gray-200 mr-12'
                    onClick={onLogout}> 
                    Logout 
                </button>
            </div>
            <div className="navbar flex justify-end w-1/2 mr-40 text-md text-black font-bold font-cara space-x-4">
                <Link to="/trainer-add-avail" className=' bg-blue-200 py-1.5 px-3.5 rounded-sm  hover:bg-gray-200'> Add Availablity </Link>
            </div>
        </div>
    );
}