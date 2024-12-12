import axios from 'axios';

// Create an Axios instance for reusable configurations
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASEURL, // Define the base URL in your .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

// Common API method
export default function apiRequest(endpoint, method, data = null, headers = {}) {
  return apiClient({
    url: endpoint,
    method: method,
    data: data, // For POST, PUT, PATCH
    headers: headers, // Add additional headers if needed
    // mode: 'no-cors'
  })
    .then((response) => response.data) // Return the response data
    .catch((error) => {
      console.error('API Request Error:', error.response || error.message);
      throw error.response?.data || error.message; // Re-throw error for handling
    });
}

// Create an Axios instance with default configurations
const getApiClient = axios.create({
  baseURL: process.env.REACT_APP_BASEURL, // Ensure this is defined in your .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

// Common API request function
export const getApiRequest = async (endpoint, method = {},headers = {}) => {
  try {
    const response = await getApiClient({
      url: endpoint,
      method: method,
      headers:headers
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('API Request Error:', error.response || error.message);
    throw error.response?.data || error.message; // Re-throw error for handling
  }
};
