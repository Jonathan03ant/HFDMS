// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './Components/FrontPage'; // Adjust the import path as necessary
import AdminPage from './Components/AdminPage'; // Adjust the import path as necessary
import TrainerPage from './Components/TrainerPage'; // Adjust the import path as necessary
import MemberPage from './Components/MemberPage'; // Adjust the import path as necessary

function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/trainer" element={<TrainerPage />} />
        <Route path="/member" element={<MemberPage />} />
      </Routes>
    </Router>
 );
}

export default App;