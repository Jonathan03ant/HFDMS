import React, { useEffect, useState } from 'react';
import AdminNavBar from '../NavBar/AdminNavBar';
import axios from 'axios';

export default function ManagePayment() {
    const [bills, setBills] = useState([]);

    const fetchBills = async () => {
        const response = await axios.get('http://localhost:3000/api/bills');
        //console.log(response.data);
        setBills(response.data);
    };

    useEffect(() => {
        fetchBills();
    }, []);

    return (
        <div>
            <AdminNavBar />
            <div className='container mx-auto px-4 sm:px-8'>
                <div className='py-8'>
                    <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table className='min-w-full leading-normal'>
                                <thead>
                                    <tr>
                                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                            Member ID
                                        </th>
                                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                            Amount
                                        </th>
                                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                            Due Date
                                        </th>
                                        <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bills.map(bill => (
                                        <tr key={bill.memberid}>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                {bill.memberid}
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                ${bill.amount}
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                {bill.duedate}
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm' style={{ color: bill.paid ? 'green' : 'red' }}>
                                                {bill.PAID ? 'PAID' : 'PAID'}
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