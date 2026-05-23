import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form,    setForm]    = useState({ name: '', email: '', password: '', confirm: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      return setError('Passwords do not match.');
    }

    setLoading(true);
    try {
      const res = await registerUser({ name: form.name, email: form.email, password: form.password });
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo"></div>
          <h2>Create Account</h2>
          <p>Join us today — it's free!</p>
        </div>

        {error && <div className="alert alert-error"> {error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text" name="name"
              placeholder="Enter your full name"
              value={form.name} onChange={handleChange} required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email" name="email"
              placeholder="Enter your email"
              value={form.email} onChange={handleChange} required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password" name="password"
              placeholder="Min 6 characters"
              value={form.password} onChange={handleChange} required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password" name="confirm"
              placeholder="Re-enter your password"
              value={form.confirm} onChange={handleChange} required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <span className="btn-spinner"></span> : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
