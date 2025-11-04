import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, BarChart3, FileText, Bell, User, LogOut, Menu, X, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const PlannerDashboard = () => {
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
  
  const stats = [
    { name: 'Total Events', value: '24', icon: Calendar, color: 'bg-blue-500' },
    { name: 'Active Clients', value: '18', icon: Users, color: 'bg-green-500' },
    { name: 'Completed Events', value: '15', icon: FileText, color: 'bg-purple-500' },
    { name: 'Revenue', value: '$12,450', icon: BarChart3, color: 'bg-yellow-500' },
  ];
  
  const events = [
    { id: 1, title: 'Corporate Conference', date: '2023-06-18', client: 'TechCorp Inc.', status: 'In Progress' },
    { id: 2, title: 'Wedding Anniversary', date: '2023-06-22', client: 'John & Jane Smith', status: 'Planning' },
    { id: 3, title: 'Product Launch Party', date: '2023-06-28', client: 'Innovate Ltd.', status: 'Confirmed' },
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
                  Dashboard
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Users className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  Clients
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <FileText className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  Events
                </a>
                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <BarChart3 className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  Reports
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
                    Dashboard
                  </a>
                  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <Users className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    Clients
                  </a>
                  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <FileText className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    Events
                  </a>
                  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <BarChart3 className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    Reports
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
                      placeholder="Search clients, events..."
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
                      <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
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
                <h1 className="text-2xl font-semibold text-gray-900">Planner Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  {/* Stats */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                    {stats.map((stat) => (
                      <motion.div
                        key={stat.name}
                        whileHover={{ y: -5 }}
                        className="bg-white overflow-hidden shadow rounded-lg"
                      >
                        <div className="p-5">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 rounded-md p-3 ${stat.color} text-white`}>
                              <stat.icon className="h-6 w-6" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                                <dd className="flex items-baseline">
                                  <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Events */}
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
                      <button className="btn btn-primary flex items-center">
                        <Plus size={18} className="mr-1" />
                        New Event
                      </button>
                    </div>
                    
                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Event
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Client
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {events.map((event) => (
                            <tr key={event.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{event.title}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{event.date}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{event.client}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {event.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <button className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <Users className="h-8 w-8 text-blue-600 mb-2" />
                        <span className="text-sm font-medium text-gray-700">Manage Clients</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        <Calendar className="h-8 w-8 text-green-600 mb-2" />
                        <span className="text-sm font-medium text-gray-700">Schedule Event</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                        <FileText className="h-8 w-8 text-purple-600 mb-2" />
                        <span className="text-sm font-medium text-gray-700">Create Proposal</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-6 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                        <BarChart3 className="h-8 w-8 text-yellow-600 mb-2" />
                        <span className="text-sm font-medium text-gray-700">View Reports</span>
                      </button>
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

export default PlannerDashboard;