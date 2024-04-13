import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './Components/FrontPage'; 
import AdminLandingPage from './Components/AdminLandingPage'; 
import AdminPage from './Components/AdminPage';

import MemberLandingPage from './Components/MemberLandingPage'; 
import MemberLoginPage from './Components/MemberLoginPage';
import MemberSignUpPage from './Components/MemberSignUpPage';
import MemberPage from './Components/MemberPage';
import Schedule from './Components/Pages/Schedule';


import TrainerPage from './Components/TrainerPage'; 




function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/admin" element={<AdminLandingPage />} />
        <Route path="/admin-home" element={<AdminPage />} />


        <Route path="/trainer" element={<TrainerPage />} />


        <Route path="/member" element={<MemberLandingPage />} />
        <Route path="/member-login" element={<MemberLoginPage />} />
        <Route path="/member-signup" element={<MemberSignUpPage />} />
        <Route path="/member/:memberId" element={<MemberPage />} />
        <Route path="/member/:memberId/schedule" element={<Schedule />} />


      </Routes>
    </Router>
 );
};

export default App;