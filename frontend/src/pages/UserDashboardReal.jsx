import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Search, Bell, User, LogOut, Menu, X, Info, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ApiService from '../services/api';

const UserDashboardReal = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [enquiryData, setEnquiryData] = useState({ subject: '', message: '' });
  const [bookingData, setBookingData] = useState({ eventId: '', specialRequests: '' });
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [showEventEnquiryForm, setShowEventEnquiryForm] = useState(false);
  const [selectedEventForEnquiry, setSelectedEventForEnquiry] = useState(null);
  const [eventEnquiryData, setEventEnquiryData] = useState({ subject: '', message: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
    } else {
      setCurrentUser(user);
      fetchEvents();
      fetchPackages();
      fetchServices();
      fetchUserNotifications(user.userId);
      fetchUserBookings(user.userId);
    }
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const data = await ApiService.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Mock data as fallback
      const mockEvents = [
        {
          id: 1,
          name: 'Corporate Conference',
          description: 'Annual corporate conference with keynote speakers and networking opportunities',
          eventDate: '2023-12-15T10:00:00',
          eventPackage: { id: 1, name: 'Premium', price: 5000 },
          services: [
            { id: 1, name: 'Catering', description: 'Full catering service' },
            { id: 2, name: 'Audio Visual', description: 'Professional sound and lighting' }
          ]
        },
        {
          id: 2,
          name: 'Wedding Reception',
          description: 'Elegant wedding reception with full service',
          eventDate: '2023-11-20T16:00:00',
          eventPackage: { id: 2, name: 'Deluxe', price: 8000 },
          services: [
            { id: 1, name: 'Catering', description: 'Gourmet catering service' },
            { id: 3, name: 'Decorations', description: 'Floral arrangements and decorations' }
          ]
        },
        {
          id: 3,
          name: 'Birthday Party',
          description: 'Fun birthday celebration for all ages',
          eventDate: '2023-10-25T14:00:00',
          eventPackage: { id: 3, name: 'Basic', price: 1500 },
          services: [
            { id: 4, name: 'Entertainment', description: 'DJ and dance floor' }
          ]
        }
      ];
      setEvents(mockEvents);
    }
  };

  const fetchPackages = async () => {
    try {
      const data = await ApiService.getPackages();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
      // Mock data as fallback
      const mockPackages = [
        { id: 1, name: 'Basic', price: 1500, description: 'Essential event planning services' },
        { id: 2, name: 'Premium', price: 5000, description: 'Comprehensive event planning with premium services' },
        { id: 3, name: 'Deluxe', price: 8000, description: 'All-inclusive luxury event planning' }
      ];
      setPackages(mockPackages);
    }
  };

  const fetchServices = async () => {
    try {
      const data = await ApiService.getServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Mock data as fallback
      const mockServices = [
        { id: 1, name: 'Catering', description: 'Professional catering services' },
        { id: 2, name: 'Audio Visual', description: 'Sound and lighting equipment' },
        { id: 3, name: 'Decorations', description: 'Floral arrangements and decorations' },
        { id: 4, name: 'Entertainment', description: 'DJ, band, or other entertainment' }
      ];
      setServices(mockServices);
    }
  };

  const fetchUserNotifications = async (userId) => {
    try {
      const data = await ApiService.getNotificationsByUserId(userId);
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await ApiService.markNotificationAsRead(notificationId);
      
      // Update local state
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      ));
      setUnreadCount(prev => prev - 1);
      
      // Refresh notifications
      fetchUserNotifications(currentUser.userId);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const fetchUserBookings = async (userId) => {
    try {
      const data = await ApiService.getBookingsByUserId(userId);
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
    // Refresh notifications when switching to the notifications tab
    if (tab === 'notifications' && currentUser) {
      fetchUserNotifications(currentUser.userId);
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      // Fix the data structure to match the backend DTO
      const enquiryDataWithUser = {
        userId: currentUser.userId, // Use userId instead of user object
        subject: enquiryData.subject,
        message: enquiryData.message
      };
      
      await ApiService.createEnquiry(enquiryDataWithUser);
      
      alert('Enquiry submitted successfully!');
      setEnquiryData({ subject: '', message: '' });
      setShowEnquiryForm(false);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting enquiry. Please try again.');
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fix the data structure to match the backend DTO
      const bookingDataWithUser = {
        userId: currentUser.userId, // Use userId instead of user object
        eventId: selectedEvent.id,
        specialRequests: bookingData.specialRequests
      };
      
      await ApiService.createBooking(bookingDataWithUser);
      
      alert('Booking request submitted successfully!');
      setBookingData({ eventId: '', specialRequests: '' });
      setShowBookingForm(false);
      setSelectedEvent(null);
      
      // Refresh bookings
      fetchUserBookings(currentUser.userId);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
    }
  };

  const handleEventEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      // Include event information in the subject
      const subjectWithEvent = `[${selectedEventForEnquiry?.name}] ${eventEnquiryData.subject}`;
      
      const enquiryDataWithUser = {
        userId: currentUser.userId,
        subject: subjectWithEvent,
        message: eventEnquiryData.message
      };
      
      await ApiService.createEnquiry(enquiryDataWithUser);
      
      alert('Enquiry submitted successfully!');
      setEventEnquiryData({ subject: '', message: '' });
      setShowEventEnquiryForm(false);
      setSelectedEventForEnquiry(null);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting enquiry. Please try again.');
    }
  };

  const openEventEnquiryForm = (event) => {
    setSelectedEventForEnquiry(event);
    setEventEnquiryData({ subject: '', message: '' });
    setShowEventEnquiryForm(true);
  };

  const formatDate = (dateString) => {
    // Handle null or undefined dates
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openBookingForm = (event) => {
    setSelectedEvent(event);
    setBookingData({ eventId: event.id, specialRequests: '' });
    setShowBookingForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowBookingForm(false)}></div>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Book Event: {selectedEvent?.name}</h3>
                    <div className="mt-2">
                      <form onSubmit={handleBookingSubmit}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">Event</label>
                          <div className="mt-1 text-gray-900">{selectedEvent?.name}</div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">Package</label>
                          <div className="mt-1 text-gray-900">{selectedEvent?.eventPackage?.name} - ${selectedEvent?.eventPackage?.price}</div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">Services</label>
                          <div className="mt-1">
                            {selectedEvent?.services?.map(service => (
                              <div key={service.id} className="text-gray-900">{service.name}</div>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">Special Requests</label>
                          <textarea
                            id="specialRequests"
                            rows={3}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={bookingData.specialRequests}
                            onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
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
                  onClick={handleBookingSubmit}
                >
                  Submit Booking
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowBookingForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowEnquiryForm(false)}></div>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Submit Enquiry</h3>
                    <div className="mt-2">
                      <form onSubmit={handleEnquirySubmit}>
                        <div className="mb-4">
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                          <input
                            type="text"
                            id="subject"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={enquiryData.subject}
                            onChange={(e) => setEnquiryData({...enquiryData, subject: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                          <textarea
                            id="message"
                            rows={4}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={enquiryData.message}
                            onChange={(e) => setEnquiryData({...enquiryData, message: e.target.value})}
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
                  onClick={handleEnquirySubmit}
                >
                  Submit Enquiry
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowEnquiryForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event-Specific Enquiry Form Modal */}
      {showEventEnquiryForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowEventEnquiryForm(false)}></div>
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Enquire about: {selectedEventForEnquiry?.name}</h3>
                    <div className="mt-2">
                      <form onSubmit={handleEventEnquirySubmit}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">Event</label>
                          <div className="mt-1 text-gray-900 font-medium">{selectedEventForEnquiry?.name}</div>
                          <div className="mt-1 text-sm text-gray-500">{formatDate(selectedEventForEnquiry?.eventDate)}</div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="eventEnquirySubject" className="block text-sm font-medium text-gray-700">Subject</label>
                          <input
                            type="text"
                            id="eventEnquirySubject"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={eventEnquiryData.subject}
                            onChange={(e) => setEventEnquiryData({...eventEnquiryData, subject: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="eventEnquiryMessage" className="block text-sm font-medium text-gray-700">Message</label>
                          <textarea
                            id="eventEnquiryMessage"
                            rows={4}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={eventEnquiryData.message}
                            onChange={(e) => setEventEnquiryData({...eventEnquiryData, message: e.target.value})}
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
                  onClick={handleEventEnquirySubmit}
                >
                  Submit Enquiry
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowEventEnquiryForm(false)}
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
                  onClick={() => handleSetActiveTab('events')}
                  className={`${
                    activeTab === 'events' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left`}
                >
                  <Calendar className="mr-4 h-6 w-6 text-gray-500" />
                  My Events
                </button>
                <button 
                  onClick={() => handleSetActiveTab('bookings')}
                  className={`${
                    activeTab === 'bookings' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left`}
                >
                  <Clock className="mr-4 h-6 w-6 text-gray-500" />
                  My Bookings
                </button>
                <button 
                  onClick={() => handleSetActiveTab('notifications')}
                  className={`${
                    activeTab === 'notifications' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left`}
                >
                  <Bell className="mr-4 h-6 w-6 text-gray-500" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setShowBookingForm(true)}
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left"
                >
                  <Plus className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  Book Event
                </button>
                <button 
                  onClick={() => setShowEnquiryForm(true)}
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left"
                >
                  <Info className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  Submit Enquiry
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
                <h1 className="text-xl font-bold text-gray-800">Event Planner</h1>
              </div>
              <div className="mt-5 flex-1 flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  <button 
                    onClick={() => handleSetActiveTab('events')}
                    className={`${
                      activeTab === 'events' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
                  >
                    <Calendar className="mr-3 h-6 w-6 text-gray-500" />
                    My Events
                  </button>
                  <button 
                    onClick={() => handleSetActiveTab('bookings')}
                    className={`${
                      activeTab === 'bookings' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
                  >
                    <Clock className="mr-3 h-6 w-6 text-gray-500" />
                    My Bookings
                  </button>
                  <button 
                    onClick={() => handleSetActiveTab('notifications')}
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
                    onClick={() => setShowBookingForm(true)}
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left"
                  >
                    <Plus className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    Book Event
                  </button>
                  <button 
                    onClick={() => setShowEnquiryForm(true)}
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left"
                  >
                    <Info className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    Submit Enquiry
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
                      placeholder="Search events"
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
                <h1 className="text-2xl font-semibold text-gray-900">User Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="rounded-lg">
                    {activeTab === 'events' && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Events</h2>
                        {events.length === 0 ? (
                          <div className="text-center py-12">
                            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by booking your first event.</p>
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
                                  <div className="mt-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                      <CheckCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
                                      Package: {event.eventPackage?.name} (${event.eventPackage?.price})
                                    </div>
                                  </div>
                                  <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-700">Services:</h4>
                                    <ul className="mt-1 space-y-1">
                                      {event.services?.map(service => (
                                        <li key={service.id} className="flex items-center text-sm text-gray-500">
                                          <CheckCircle className="flex-shrink-0 mr-1.5 h-4 w-4 text-green-400" />
                                          {service.name}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="mt-6">
                                    <button 
                                      onClick={() => openBookingForm(event)}
                                      className="w-full btn btn-secondary text-sm bg-blue-600 hover:bg-blue-700 text-white mb-2"
                                    >
                                      Book Event
                                    </button>
                                    <button 
                                      onClick={() => openEventEnquiryForm(event)}
                                      className="w-full btn btn-secondary text-sm bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      Ask Question
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
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
                                    </div>
                                    {!notification.isRead && (
                                      <div className="flex-shrink-0">
                                        <button
                                          onClick={() => markNotificationAsRead(notification.id)}
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
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Bookings</h2>
                        {bookings.length === 0 ? (
                          <div className="text-center py-12">
                            <Clock className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
                            <p className="mt-1 text-sm text-gray-500">You haven't made any bookings yet.</p>
                          </div>
                        ) : (
                          <div className="flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                  <thead>
                                    <tr>
                                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Booking ID</th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Event</th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Special Requests</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                      <tr key={booking.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">#{booking.id}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.event.name}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(booking.bookingDate)}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                          </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          {booking.specialRequests || 'None'}
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
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <button 
                            onClick={() => setShowBookingForm(true)}
                            className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <Plus className="h-8 w-8 text-blue-600 mb-2" />
                            <span className="text-sm font-medium text-gray-700">Book Event</span>
                          </button>
                          <button 
                            onClick={() => setShowEnquiryForm(true)}
                            className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                          >
                            <Info className="h-8 w-8 text-green-600 mb-2" />
                            <span className="text-sm font-medium text-gray-700">Submit Enquiry</span>
                          </button>
                          <button className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                            <Search className="h-8 w-8 text-purple-600 mb-2" />
                            <span className="text-sm font-medium text-gray-700">Browse Events</span>
                          </button>
                        </div>
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

export default UserDashboardReal;