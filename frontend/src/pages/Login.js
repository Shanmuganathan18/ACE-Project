import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('learner');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter username and password!');
      return;
    }

    // Check admin login
    if (role === 'admin' && username === 'admin' && password === 'admin123') {
      localStorage.setItem('role', 'admin');
      localStorage.setItem('username', 'admin');
      navigate('/admin');
      return;
    }

    // Check default learner login
    if (role === 'learner' && username === 'learner' && password === 'learn123') {
      localStorage.setItem('role', 'learner');
      localStorage.setItem('username', 'learner');
      navigate('/');
      return;
    }

    // Check registered users
    if (role === 'learner') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        u => u.username === username && u.password === password
      );
      if (user) {
        localStorage.setItem('role', 'learner');
        localStorage.setItem('username', username);
        navigate('/');
        return;
      }
    }

    setError('Invalid username or password!');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to ACE</h2>
        <p>Automotive Component Explorer</p>

        <div className="role-toggle">
          <button
            className={role === 'learner' ? 'active' : ''}
            onClick={() => setRole('learner')}
          >
            Learner
          </button>
          <button
            className={role === 'admin' ? 'active' : ''}
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button className="login-btn" onClick={handleLogin}>
          Login as {role}
        </button>

        {role === 'learner' && (
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#888' }}>
            New user?{' '}
            <span
              onClick={() => navigate('/register')}
              style={{ color: '#e74c3c', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Create an account
            </span>
          </p>
        )}

        <div className="hints">
          <p>Learner → username: learner / password: learn123</p>
          <p>Admin → username: admin / password: admin123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;