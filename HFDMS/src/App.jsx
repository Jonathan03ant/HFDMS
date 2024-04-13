import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './Components/FrontPage'; 
import AdminLandingPage from './Components/AdminLandingPage'; 
import TrainerPage from './Components/TrainerPage'; 
import MemberPage from './Components/MemberPage'; 
import AdminHomePage from './Components/AdminHomePage';

function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/admin" element={<AdminLandingPage />} />
        <Route path="/admin-home" element={<AdminHomePage />} />


        <Route path="/trainer" element={<TrainerPage />} />
        <Route path="/member" element={<MemberPage />} />
      </Routes>
    </Router>
 );
};

export default App;