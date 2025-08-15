import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.register(formData)
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <div className="page-container auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Get started by creating your new account.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" minLength="6" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>Create Account</button>
        </form>
        <p style={{ marginTop: '24px', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;