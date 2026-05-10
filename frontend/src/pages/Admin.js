import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin() {
  const [vehicles, setVehicles] = useState([]);
  const [parts, setParts] = useState([]);
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get('https://ace-backend-4v7m.onrender.com/vehicles')
      .then(res => {
        setVehicles(res.data);
        // Fetch parts for all vehicles
        res.data.forEach(v => {
          axios.get(`https://ace-backend-4v7m.onrender.com/vehicles/${v.id}/parts`)
            .then(r => setParts(prev => [...prev, ...r.data]));
        });
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="admin">
      {/* Admin Top Bar */}
      <div className="topbar">
        <span>👤 Admin Dashboard</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{vehicles.length}</h3>
          <p>Total Vehicles</p>
        </div>
        <div className="stat-card">
          <h3>{parts.length}</h3>
          <p>Total Parts</p>
        </div>
        <div className="stat-card">
          <h3>{[...new Set(parts.map(p => p.category))].length}</h3>
          <p>Categories</p>
        </div>
        <div className="stat-card">
          <h3>2</h3>
          <p>Active Users</p>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="admin-section">
        <h3>Vehicles List</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Parts</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(v => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.category}</td>
                <td>{v.description}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/vehicles/${v.id}/parts`)}
                  >
                    View Parts
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Parts Table */}
      <div className="admin-section">
        <h3>All Parts</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Part Name</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parts.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/parts/${p.id}`)}
                  >
                    View Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;