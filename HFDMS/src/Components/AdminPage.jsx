import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminPage() {
    const navigate = useNavigate();

    const [admins, setAdmins] = useState([]);
    const [selectAdmins, setSelectAdmins] = useState(null);
    const [pin, setPin] = useState('');

    useEffect(() => {
        const fetchAdmins = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/admins');
            setAdmins(response.data);
          } catch (error) {
            console.error('Error fetching admins:', error);
          }
        };
    
        fetchAdmins();
     }, []);

     const handleAdminSelection = (event) => {
        setSelectAdmins(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/admins/authenticate', { AdminID: selectAdmins, Pin: pin });
            if (response.data.success) {
                navigate('/member-login');
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
                <p>Lottie animation here</p>
            </div>
            <div className="flex flex-col justify-center space-x-5 mt-20 ml-20">
                <div className='font-cara flex flex-col justify-center space-y-5 mt-20'>
                    <form onSubmit={handleFormSubmit}>
                        <select onChange={handleAdminSelection} className='bg-white text-black border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
                            <option value="">Select an admin</option>
                            {admins.map((admin) => (
                                <option key={admin.adminid} value={admin.adminid}>
                                    {admin.fullname}
                                </option>
                            ))}
                        </select>
                        <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter PIN" />
                        <button type="submit" className='bg-blue-200 w-32 hover:bg-gray-200 text-black py-2 px-4 rounded'>SIGNIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
}