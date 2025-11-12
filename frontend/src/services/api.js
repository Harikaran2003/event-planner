// API service for handling HTTP requests
const API_BASE_URL = 'http://localhost:8082/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  console.log('Current user:', user); // Debug log
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
    const headers = getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: headers,
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
    const headers = getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: headers,
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
    const headers = getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: headers,
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
    const headers = getAuthHeaders();
    console.log('Booking headers:', headers); // Debug log
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      headers: headers
    });
    return response.json();
  }

  static async getBookingsByUserId(userId) {
    const headers = getAuthHeaders();
    console.log('Booking by user headers:', headers); // Debug log
    const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`, {
      headers: headers
    });
    return response.json();
  }

  static async createBooking(bookingData) {
    const headers = getAuthHeaders();
    console.log('Create booking headers:', headers); // Debug log
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: headers,
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
    const headers = getAuthHeaders();
    console.log('Update booking headers:', headers); // Debug log
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: headers,
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
    const headers = getAuthHeaders();
    console.log('Enquiries headers:', headers); // Debug log
    const response = await fetch(`${API_BASE_URL}/enquiries`, {
      headers: headers
    });
    return response.json();
  }

  static async createEnquiry(enquiryData) {
    const headers = getAuthHeaders();
    console.log('Create enquiry headers:', headers); // Debug log
    const response = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: headers,
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

  static async updateEnquiry(id, enquiryData) {
    const headers = getAuthHeaders();
    console.log('Update enquiry headers:', headers); // Debug log
    const response = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
      method: 'PUT',
      headers: headers,
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

  // Add this method for replying to enquiries
  static async replyToEnquiry(id, message) {
    const headers = getAuthHeaders();
    console.log('Reply to enquiry headers:', headers); // Debug log
    const response = await fetch(`${API_BASE_URL}/enquiries/${id}/reply`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ message: message }),
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
    const headers = getAuthHeaders();
    console.log('Notifications headers:', headers); // Debug log
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      headers: headers
    });
    return response.json();
  }

  static async getNotificationsByUserId(userId) {
    const headers = getAuthHeaders();
    console.log('Notifications by user headers:', headers); // Debug log
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/user/${userId}`, {
        headers: headers
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
    const headers = getAuthHeaders();
    console.log('Unread notifications headers:', headers); // Debug log
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/unread/${userId}`, {
        headers: headers
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

  static async createNotification(notificationData) {
    const headers = getAuthHeaders();
    console.log('Create notification headers:', headers); // Debug log
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        userId: notificationData.user.id,
        title: notificationData.title,
        message: notificationData.message,
        relatedBookingId: notificationData.relatedBookingId
      }),
    });
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Only try to parse JSON if there's content
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  static async markNotificationAsRead(id) {
    const headers = getAuthHeaders();
    console.log('Mark notification as read headers:', headers); // Debug log
    const response = await fetch(`${API_BASE_URL}/notifications/${id}/mark-as-read`, {
      method: 'PUT',
      headers: headers
    });
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Only try to parse JSON if there's content
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  // Feedback
  static async getFeedback() {
    const headers = getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      headers: headers
    });
    return response.json();
  }

  static async getFeedbackByUserId(userId) {
    const headers = getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/feedback/user/${userId}`, {
      headers: headers
    });
    return response.json();
  }

  static async createFeedback(feedbackData) {
    const headers = getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(feedbackData),
    });
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Only try to parse JSON if there's content
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  static async deleteFeedback(id) {
    const headers = getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
      method: 'DELETE',
      headers: headers,
    });
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  }

  // User Authentication
  static async loginUser(loginData) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getPublicHeaders(),
      body: JSON.stringify(loginData),
    });
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Only try to parse JSON if there's content
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  static async registerUser(registrationData) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: getPublicHeaders(),
      body: JSON.stringify(registrationData),
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