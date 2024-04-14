import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from '../NavBar/AdminNavBar';

const Equipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [newEquipment, setNewEquipment] = useState({ name: '', status: '', notes: '' });

    useEffect(() => {
        const fetchEquipment = async () => {
            const response = await axios.get('http://localhost:3000/api/equipment');
            setEquipment(response.data);
        };

        fetchEquipment();
    }, []);

    const addEquipment = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:3000/api/equipment', newEquipment);
        setEquipment([...equipment, response.data]);
        setNewEquipment({ name: '', status: '', notes: '' }); // Reset form
    };

    return (
        <div className='mr-12'>
            <AdminNavBar />
            <div className='mx-auto px-4 sm:px-8 min-w-full'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-semibold my-18'></h1>
                    <form onSubmit={addEquipment}>
                        <input type='text' value={newEquipment.name} onChange={e => setNewEquipment({ ...newEquipment, name: e.target.value })} placeholder='Name' required />
                        <input type='text' value={newEquipment.status} onChange={e => setNewEquipment({ ...newEquipment, status: e.target.value })} placeholder='Status' required />
                        <input type='text' value={newEquipment.notes} onChange={e => setNewEquipment({ ...newEquipment, notes: e.target.value })} placeholder='Notes' required />
                        <button type='submit' className='bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded my-18'>
                            Add Equipment
                        </button>
                    </form>
                </div>
                <table className='min-w-max w-full table-auto my-16'>
                    <thead>
                        <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                            <th className='py-3 px-6 text-left'>Name</th>
                            <th className='py-3 px-6 text-left'>Status</th>
                            <th className='py-3 px-6 text-left'>Notes</th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-600 text-sm font-light'>
                        {equipment.map(item => (
                            <tr className='border-b border-gray-200 hover:bg-gray-100' key={item.equipmentid}>
                                <td className='py-3 px-6 text-left whitespace-nowrap'>
                                    <div className='flex items-center'>
                                        <span className='font-medium'>{item.name}</span>
                                    </div>
                                </td>
                                <td className='py-3 px-6 text-left'>
                                    <span className='bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs'>{item.status}</span>
                                </td>
                                <td className='py-3 px-6 text-left'>
                                    {item.notes}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Equipment;