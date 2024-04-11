// LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function FrontPage() {
 return (
    <div className='text-2xl px-16 py-16'>
      <h2>Choose Your Role</h2>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/trainer">Trainer</Link></li>
        <li><Link to="/member">Member</Link></li>
    </div>
 );
}

export default FrontPage;