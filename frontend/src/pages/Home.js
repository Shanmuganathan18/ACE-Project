import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (!role) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get('http://localhost:3000/vehicles')
      .then(res => setVehicles(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/login');
  };

  const role = localStorage.getItem('role');

  return (
    <div className="home">
      {/* Top bar with role and logout */}
      <div className="topbar">
        <span>Welcome, <strong>{role}</strong>!</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2>Select a Vehicle</h2>
      <div className="vehicle-grid">
        {vehicles.map(vehicle => (
          <div
            key={vehicle.id}
            className="vehicle-card"
            onClick={() => navigate(`/vehicles/${vehicle.id}/parts`)}
          >
            <h3>{vehicle.name}</h3>
            <p>{vehicle.category}</p>
            <span>{vehicle.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;