import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Settings, BarChart3, LogOut, Menu, X } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Admin Menu</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-2 py-4 space-y-1">
                <a href="#" className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <BarChart3 className="mr-4 h-6 w-6 text-gray-500" />
                  Dashboard
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Users className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  Manage Users
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Calendar className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  Manage Events
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Settings className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  Settings
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="md:flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
              </div>
              <div className="mt-5 flex-1 flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  <a href="#" className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <BarChart3 className="mr-3 h-6 w-6 text-gray-500" />
                    Dashboard
                  </a>
                  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <Users className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    Manage Users
                  </a>
                  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <Calendar className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    Manage Events
                  </a>
                  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <Settings className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    Settings
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="md:pl-64 flex flex-col flex-1">
          {/* Top bar */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex"></div>
              <div className="flex items-center">
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <button className="flex items-center text-sm rounded-full focus:outline-none">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <span className="font-medium">A</span>
                      </div>
                      <span className="ml-2 text-gray-700 hidden md:block">{currentUser?.email}</span>
                    </button>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="ml-3 flex items-center text-sm rounded-full focus:outline-none text-gray-700 hover:text-gray-900"
                >
                  <LogOut size={20} className="mr-1" />
                  <span className="hidden md:block">Logout</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="rounded-lg">
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, Admin!</h2>
                      <p className="text-gray-600">
                        As an administrator, you can manage users, events, and system settings.
                      </p>
                      
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-blue-50 rounded-lg p-6">
                          <div className="flex items-center">
                            <Users className="h-8 w-8 text-blue-600" />
                            <h3 className="ml-3 text-lg font-medium text-blue-800">Manage Users</h3>
                          </div>
                          <p className="mt-2 text-blue-700">
                            View, edit, and delete user accounts
                          </p>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-6">
                          <div className="flex items-center">
                            <Calendar className="h-8 w-8 text-green-600" />
                            <h3 className="ml-3 text-lg font-medium text-green-800">Manage Events</h3>
                          </div>
                          <p className="mt-2 text-green-700">
                            Oversee all events in the system
                          </p>
                        </div>
                        
                        <div className="bg-purple-50 rounded-lg p-6">
                          <div className="flex items-center">
                            <Settings className="h-8 w-8 text-purple-600" />
                            <h3 className="ml-3 text-lg font-medium text-purple-800">System Settings</h3>
                          </div>
                          <p className="mt-2 text-purple-700">
                            Configure application settings
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;