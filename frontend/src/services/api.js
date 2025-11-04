// API service for handling HTTP requests
const API_BASE_URL = 'http://localhost:8082/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user && user.token ? {
    'Authorization': `Bearer ${user.token}`,
    'Content-Type': 'application/json',
  } : {
    'Content-Type': 'application/json',
  };
};

// Helper function to get public headers (no auth)
const getPublicHeaders = () => {
  return {
    'Content-Type': 'application/json',
  };
};

class ApiService {
  // Events
  static async getEvents() {
    const response = await fetch(`${API_BASE_URL}/events`);
    return response.json();
  }

  static async getEventById(id) {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    return response.json();
  }

  static async createEvent(eventData) {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: getPublicHeaders(),
      body: JSON.stringify(eventData),
    });
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Only try to parse JSON if there's content
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  static async updateEvent(id, eventData) {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: getPublicHeaders(),
      body: JSON.stringify(eventData),
    });
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Only try to parse JSON if there's content
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  static async deleteEvent(id) {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: getPublicHeaders(),
    });
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  }

  // Packages
  static async getPackages() {
    const response = await fetch(`${API_BASE_URL}/packages`);
    return response.json();
  }

  // Services
  static async getServices() {
    const response = await fetch(`${API_BASE_URL}/services`);
    return response.json();
  }

  // Bookings
  static async getBookings() {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      headers: getAuthHeaders()
    });
    return response.json();
  }

  static async getBookingsByUserId(userId) {
    const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`, {
      headers: getAuthHeaders()
    });
    return response.json();
  }

  static async createBooking(bookingData) {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Only try to parse JSON if there's content
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  static async updateBooking(id, bookingData) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Only try to parse JSON if there's content
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  // Enquiries
  static async getEnquiries() {
    const response = await fetch(`${API_BASE_URL}/enquiries`, {
      headers: getAuthHeaders()
    });
    return response.json();
  }

  static async createEnquiry(enquiryData) {
    const response = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(enquiryData),
    });
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Only try to parse JSON if there's content
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  // Notifications
  static async getNotifications() {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      headers: getAuthHeaders()
    });
    return response.json();
  }

  static async getNotificationsByUserId(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/user/${userId}`, {
        headers: getAuthHeaders()
      });
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return []; // Return empty array on error
      }
      
      // Only try to parse JSON if there's content
      const text = await response.text();
      return text ? JSON.parse(text) : [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return []; // Return empty array on error
    }
  }

  static async getUnreadNotificationsByUserId(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/unread/${userId}`, {
        headers: getAuthHeaders()
      });
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return []; // Return empty array on error
      }
      
      // Only try to parse JSON if there's content
      const text = await response.text();
      return text ? JSON.parse(text) : [];
    } catch (error) {
      console.error('Error fetching unread notifications:', error);
      return []; // Return empty array on error
    }
  }

  static async markNotificationAsRead(id) {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}/mark-as-read`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Only try to parse JSON if there's content
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }
}

export default ApiService;