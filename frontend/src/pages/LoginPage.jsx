import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const handleLogin = (responseData) => {
    if (responseData.success) {
      // Store current user in localStorage including the token
      localStorage.setItem('currentUser', JSON.stringify({
        email: responseData.email,
        role: responseData.role,
        userId: responseData.userId,
        token: responseData.token
      }));
      
      // Redirect based on role from backend response
      switch(responseData.role) {
        case 'USER':
          navigate('/user-dashboard');
          break;
        case 'PLANNER':
          navigate('/planner-dashboard');
          break;
        case 'ADMIN':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/user-dashboard');
      }
    } else {
      alert(responseData.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
         }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 md:mb-0 md:mr-8 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Event Planner & Scheduler
          </h1>
          <p className="text-xl text-white opacity-90">
            Organize your events seamlessly with our powerful platform
          </p>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-white font-semibold">Easy Scheduling</h3>
              <p className="text-white text-sm opacity-80">Plan events in minutes</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-white font-semibold">Team Collaboration</h3>
              <p className="text-white text-sm opacity-80">Work together efficiently</p>
            </div>
          </div>
        </motion.div>
        
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;