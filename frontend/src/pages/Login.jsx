import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.login(formData)
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <div className="page-container auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <h1>Sign In</h1>
          <p>Welcome back! Please enter your details.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>Sign In</button>
        </form>
        <p style={{ marginTop: '24px', textAlign: 'center' }}>
          No account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;