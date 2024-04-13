import React from 'react';
import AdminNavBar from './NavBar/AdminNavBar';


export default function AdminHomePage({}) {
    const handleLogout = () => {
        console.log('Logging out');
    };
    return (
        <div>
            <AdminNavBar handleLogout={handleLogout} />
        </div>
    )
}


