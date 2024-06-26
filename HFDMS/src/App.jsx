import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './Components/FrontPage'; 
import AdminLandingPage from './Components/AdminLandingPage'; 
import AdminPage from './Components/AdminPage';
import ManagePayment from './Components/Pages/ManagePayment';
import ManageSchedule from './Components/Pages/ManageSchedule';
import Equipment from './Components/Pages/Equipment';

import MemberLandingPage from './Components/MemberLandingPage'; 
import MemberLoginPage from './Components/MemberLoginPage';
import MemberSignUpPage from './Components/MemberSignUpPage';
import MemberPage from './Components/MemberPage';
import Schedule from './Components/Pages/Schedule';
import TrackFitness from './Components/Pages/TrackFitness';

import TrainerLandingPage from './Components/TrainerLandingPage';
import TrainerPage from './Components/TrainerPage'; 
import AvailabilityForm from './Components/Pages/AvailabilityForm';




function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/admin" element={<AdminLandingPage />} />
        <Route path="/admin-home" element={<AdminPage />} />
        <Route path="/admin-manage-payment" element={<ManagePayment />} />
        <Route path="/admin-equipment" element={<Equipment />} />
        <Route path="/admin-manage-schedule" element={<ManageSchedule />} />



        <Route path="/trainer" element={<TrainerLandingPage />} />
        <Route path="/trainer-home" element={<TrainerPage />} />
        
        <Route path="/trainer-add-avail" element={<AvailabilityForm />} />


        <Route path="/member" element={<MemberLandingPage />} />
        <Route path="/member-login" element={<MemberLoginPage />} />
        <Route path="/member-signup" element={<MemberSignUpPage />} />
        
        <Route path="/member/:memberId" element={<MemberPage />} />
        <Route path="/member/:memberId/schedule" element={<Schedule />} />
        <Route path="/member/:memberId/trackfitness" element={<TrackFitness />} />

        



      </Routes>
    </Router>
 );
};

export default App;