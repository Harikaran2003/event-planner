import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Search, Bell, User, LogOut, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };
  
  const events = [
    { id: 1, title: 'Team Meeting', date: '2023-06-15', time: '10:00 AM', location: 'Conference Room A' },
    { id: 2, title: 'Product Launch', date: '2023-06-20', time: '2:00 PM', location: 'Main Hall' },
    { id: 3, title: 'Client Presentation', date: '2023-06-25', time: '11:00 AM', location: 'Meeting Room B' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-2 py-4 space-y-1">
                <a href="#" className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Calendar className="mr-4 h-6 w-6 text-gray-500" />
                  My Events
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Plus className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  Book Event
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
                <h1 className="text-xl font-bold text-gray-800">Event Planner</h1>
              </div>
              <div className="mt-5 flex-1 flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  <a href="#" className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <Calendar className="mr-3 h-6 w-6 text-gray-500" />
                    My Events
                  </a>
                  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <Plus className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    Book Event
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
              <div className="flex-1 flex">
                <div className="w-full flex md:ml-0">
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <Search size={20} />
                    </div>
                    <input
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search events"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  <Bell size={20} />
                </button>
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <button className="flex items-center text-sm rounded-full focus:outline-none">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <User size={20} />
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
                <h1 className="text-2xl font-semibold text-gray-900">User Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="rounded-lg">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                          <motion.div
                            key={event.id}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                          >
                            <div className="p-6">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                  {event.date}
                                </span>
                              </div>
                              <div className="mt-4 space-y-2">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                  {event.time}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Search className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                  {event.location}
                                </div>
                              </div>
                              <div className="mt-6">
                                <button className="w-full btn btn-secondary text-sm">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                          <Plus className="h-8 w-8 text-blue-600 mb-2" />
                          <span className="text-sm font-medium text-gray-700">Book Event</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                          <Calendar className="h-8 w-8 text-green-600 mb-2" />
                          <span className="text-sm font-medium text-gray-700">My Calendar</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                          <Search className="h-8 w-8 text-purple-600 mb-2" />
                          <span className="text-sm font-medium text-gray-700">Browse Events</span>
                        </button>
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

export default UserDashboard;