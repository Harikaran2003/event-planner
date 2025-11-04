import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import UserDashboardReal from './pages/UserDashboardReal';
import PlannerDashboard from './pages/PlannerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminDashboardReal from './pages/AdminDashboardReal';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user-dashboard" element={<UserDashboardReal />} />
          <Route path="/planner-dashboard" element={<PlannerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboardReal />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;