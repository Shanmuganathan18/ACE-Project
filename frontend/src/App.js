import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Parts from './pages/Parts';
import PartDetail from './pages/PartDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>ACE — Automotive Component Explorer</h1>
          <p>Learn the science behind every vehicle part</p>
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/vehicles/:id/parts" element={<Parts />} />
          <Route path="/parts/:id" element={<PartDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;