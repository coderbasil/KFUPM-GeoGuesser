import React from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login'
import Leaderboard from './pages/Leaderboard'
import Photographer from './pages/Photographer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/photographer" element={<Photographer />} />
        {/* 
        <Route path="/image" element={<Image />} />
        <Route path="/admin" element={<Admin />} />
        />
         */}
      </Routes>
    </Router>
  );
};

export default App;
