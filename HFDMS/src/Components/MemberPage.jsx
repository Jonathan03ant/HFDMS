import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MemberNavBar from './NavBar/MemberNavBar';


export default function MemberPage() {
    const { memberId } = useParams();
    const handleLogout = () => {
        console.log('Logging out');
    };
    return (
        <div>
            <MemberNavBar memberId={memberId} handleLogout={handleLogout} />
        </div>
    )
}