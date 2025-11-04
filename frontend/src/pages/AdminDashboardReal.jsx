import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Search, Bell, User, LogOut, Menu, X, CheckCircle, Clock, AlertCircle, Edit, Trash2, Check, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ApiService from '../services/api';

const AdminDashboardReal = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('notifications');
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventData, setEventData] = useState({ name: '', description: '', eventDate: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
    } else {
      setCurrentUser(user);
      fetchNotifications();
      fetchBookings();
      fetchEvents();
    }
  }, [navigate]);

  const fetchNotifications = async () => {
    try {
      const data = await ApiService.getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Even if there's an error, we should still show an empty array or handle it properly
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await ApiService.getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Even if there's an error, we should still show an empty array or handle it properly
      setBookings([]);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await ApiService.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Even if there's an error, we should still show an empty array or handle it properly
      setEvents([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const markAsRead = async (notificationId) => {
    try {
      await ApiService.markNotificationAsRead(notificationId);
      
      // Update local state
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      ));
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleBookingAction = async (notification, action) => {
    try {
      // Find the related booking
      const relatedBooking = bookings.find(booking => booking.id === notification.relatedBookingId);
      
      if (relatedBooking) {
        // Update the booking status
        const newStatus = action === 'accept' ? 'CONFIRMED' : 'CANCELLED';
        await ApiService.updateBooking(relatedBooking.id, { status: newStatus });
        
        // Update local bookings state
        setBookings(bookings.map(booking => 
          booking.id === relatedBooking.id ? { ...booking, status: newStatus } : booking
        ));
        
        // Mark notification as read
        await markAsRead(notification.id);
        
        alert(`Booking ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`);
      }
    } catch (error) {
      console.error(`Error ${action}ing booking:`, error);
      alert(`Error ${action}ing booking. Please try again.`);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBookingStatusChange = async (bookingId, newStatus) => {
    try {
      const bookingData = {
        status: newStatus
      };
      
      await ApiService.updateBooking(bookingId, bookingData);
      
      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      
      alert(`Booking ${newStatus.toLowerCase()} successfully!`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Error updating booking status. Please try again.');
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        // Update existing event
        await ApiService.updateEvent(editingEvent.id, eventData);
        alert('Event updated successfully!');
      } else {
        // Create new event
        await ApiService.createEvent(eventData);
        alert('Event created successfully!');
      }
      
      // Reset form
      setEditingEvent(null);
      setEventData({ name: '', description: '', eventDate: '' });
      setShowEventForm(false);
      
      // Refresh events
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please try again.');
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventData({
      name: event.name,
      description: event.description,
      eventDate: event.eventDate
    });
    setShowEventForm(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await ApiService.deleteEvent(eventId);
        alert('Event deleted successfully!');
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowEventForm(false)}></div>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {editingEvent ? 'Edit Event' : 'Create New Event'}
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleEventSubmit}>
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
                          <input
                            type="text"
                            id="name"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={eventData.name}
                            onChange={(e) => setEventData({...eventData, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            id="description"
                            rows={3}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={eventData.description}
                            onChange={(e) => setEventData({...eventData, description: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
                          <input
                            type="datetime-local"
                            id="eventDate"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={eventData.eventDate}
                            onChange={(e) => setEventData({...eventData, eventDate: e.target.value})}
                            required
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleEventSubmit}
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowEventForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className={`${
                    activeTab === 'notifications' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left`}
                >
                  <Bell className="mr-4 h-6 w-6 text-gray-500" />
                  Notifications
                </button>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`${
                    activeTab === 'bookings' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left`}
                >
                  <Calendar className="mr-4 h-6 w-6 text-gray-500" />
                  Bookings
                </button>
                <button 
                  onClick={() => setActiveTab('events')}
                  className={`${
                    activeTab === 'events' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left`}
                >
                  <Calendar className="mr-4 h-6 w-6 text-gray-500" />
                  Events
                </button>
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
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
              </div>
              <div className="mt-5 flex-1 flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  <button 
                    onClick={() => setActiveTab('notifications')}
                    className={`${
                      activeTab === 'notifications' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
                  >
                    <Bell className="mr-3 h-6 w-6 text-gray-500" />
                    Notifications
                    {unreadCount > 0 && (
                      <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveTab('bookings')}
                    className={`${
                      activeTab === 'bookings' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
                  >
                    <Calendar className="mr-3 h-6 w-6 text-gray-500" />
                    Bookings
                  </button>
                  <button 
                    onClick={() => setActiveTab('events')}
                    className={`${
                      activeTab === 'events' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
                  >
                    <Calendar className="mr-3 h-6 w-6 text-gray-500" />
                    Events
                  </button>
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
                      placeholder="Search bookings..."
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
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
                <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="rounded-lg">
                    {activeTab === 'notifications' && (
                      <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
                        {notifications.length === 0 ? (
                          <div className="text-center py-12">
                            <Bell className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                            <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
                          </div>
                        ) : (
                          <div className="flow-root">
                            <ul className="divide-y divide-gray-200">
                              {notifications.map((notification) => (
                                <li key={notification.id} className="py-4">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                      {notification.isRead ? (
                                        <CheckCircle className="h-6 w-6 text-green-500" />
                                      ) : (
                                        <AlertCircle className="h-6 w-6 text-yellow-500" />
                                      )}
                                    </div>
                                    <div className="min-w-0 flex-1 px-4">
                                      <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                                        <p className="text-sm text-gray-500">{formatDate(notification.createdAt)}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                                      {notification.title === 'New Booking Request' && !notification.isRead && (
                                        <div className="mt-2 flex space-x-2">
                                          <button
                                            onClick={() => handleBookingAction(notification, 'accept')}
                                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                                          >
                                            <Check className="mr-1 h-4 w-4" />
                                            Accept
                                          </button>
                                          <button
                                            onClick={() => handleBookingAction(notification, 'reject')}
                                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                                          >
                                            <XCircle className="mr-1 h-4 w-4" />
                                            Reject
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                    {!notification.isRead && notification.title !== 'New Booking Request' && (
                                      <div className="flex-shrink-0">
                                        <button
                                          onClick={() => markAsRead(notification.id)}
                                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                        >
                                          Mark as read
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {activeTab === 'bookings' && (
                      <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-semibold text-gray-800">Bookings</h2>
                        </div>
                        {bookings.length === 0 ? (
                          <div className="text-center py-12">
                            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
                            <p className="mt-1 text-sm text-gray-500">There are no event bookings yet.</p>
                          </div>
                        ) : (
                          <div className="flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                  <thead>
                                    <tr>
                                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Booking ID</th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">User</th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Event</th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Actions</span>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                      <tr key={booking.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">#{booking.id}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div>{booking.user.fullName}</div>
                                          <div className="text-gray-400">{booking.user.email}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.event.name}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(booking.bookingDate)}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                          </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          {booking.status === 'PENDING' && (
                                            <div className="flex space-x-2">
                                              <button
                                                onClick={() => handleBookingStatusChange(booking.id, 'CONFIRMED')}
                                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                                              >
                                                Confirm
                                              </button>
                                              <button
                                                onClick={() => handleBookingStatusChange(booking.id, 'CANCELLED')}
                                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          )}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                          <button className="text-blue-600 hover:text-blue-900">
                                            View
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {activeTab === 'events' && (
                      <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-semibold text-gray-800">Events</h2>
                          <button
                            onClick={() => {
                              setEditingEvent(null);
                              setEventData({ name: '', description: '', eventDate: '' });
                              setShowEventForm(true);
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Event
                          </button>
                        </div>
                        {events.length === 0 ? (
                          <div className="text-center py-12">
                            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event) => (
                              <motion.div
                                key={event.id}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                              >
                                <div className="p-6">
                                  <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-gray-900">{event.name}</h3>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                      {formatDate(event.eventDate)}
                                    </span>
                                  </div>
                                  <div className="mt-4">
                                    <p className="text-sm text-gray-500">{event.description}</p>
                                  </div>
                                  <div className="mt-6 flex space-x-3">
                                    <button
                                      onClick={() => handleEditEvent(event)}
                                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteEvent(event.id)}
                                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
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

export default AdminDashboardReal;