import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password || !confirm) {
      setError('Please fill all fields!');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match!');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }

    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(u => u.username === username);
    if (exists) {
      setError('Username already exists! Try another.');
      return;
    }

    users.push({ username, password, role: 'learner' });
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Account created successfully! Redirecting to login...');
    setError('');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create Account</h2>
        <p>Join ACE — Automotive Component Explorer</p>

        <input
          type="text"
          placeholder="Choose a Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Choose a Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button className="login-btn" onClick={handleRegister}>
          Create Account
        </button>

        <p style={{ marginTop: '16px', fontSize: '14px', color: '#888' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: '#e74c3c', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;