import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

  return (
    <div className="dashboard-page">
      {/* ── Navbar ── */}
      <nav className="dashboard-nav">
        <div className="nav-brand"> Dashboard</div>
        <div className="nav-right">
          <span className="nav-user"> {user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name?.split(' ')[0]}! </h1>
          <p>Here's your account overview</p>
        </div>

        {/* ── Stats Cards ── */}
        <div className="stats-grid">
          <div className="stat-card green">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-label">Account Status</div>
              <div className="stat-value">Active</div>
            </div>
          </div>
          
          <div className="stat-card blue">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <div className="stat-label">Member Since</div>
              <div className="stat-value">{formatDate(user?.createdAt)}</div>
            </div>
          </div>
        </div>

        {/* ── Profile Card ── */}
        <div className="profile-card">
          <div className="profile-card-header">
            <h3>👤 Profile Information</h3>
          </div>
          <div className="profile-grid">
            <div className="profile-item">
              <label>Full Name</label>
              <span>{user?.name}</span>
            </div>
            <div className="profile-item">
              <label>Email Address</label>
              <span>{user?.email}</span>
            </div>
            
            <div className="profile-item">
              <label>Account Created</label>
              <span>{formatDate(user?.createdAt)}</span>
            </div>
          </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default Dashboard;
