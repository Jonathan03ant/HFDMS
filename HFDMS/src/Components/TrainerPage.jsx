import React from 'react';
import { useLocation } from 'react-router-dom';
import TrainersNavBar from './NavBar/TrainersNavBar';

export default function TrainerPage() {
    const location = useLocation();

    const handleLogout = () => {
        // implement your logout logic here
    };

    return (
        <div>
            <TrainersNavBar handleLogout={handleLogout} />
            {/* rest of your page content */}
        </div>
    );
}