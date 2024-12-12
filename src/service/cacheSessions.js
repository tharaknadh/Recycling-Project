import axios from "axios";
import apiRequest, { getApiRequest } from "../utilities/ApiRequest";

// Function to set user session using API and store in cookies
export const setUserSession = async (key, value) => {
  try {
    const response =await apiRequest(`/api/Users/SetUserSession?key=${key}&value=${value}`,"POST")
    console.log("Session set successfully:");
      // Set session in cookies (or local storage/session storage)
      document.cookie = `${key}=${value}; path=/; secure; SameSite=Strict`;
      console.log("Session set successfully:", response.data);
    
  } catch (error) {
    console.error("Error setting session:", error.message);
  }
};

export const getUserSession = async (key) => {
  try {
    // API call to get session
    // const response = await axios.get(
    //   `https://localhost:7047/api/Users/GetUserSession`,
    //   {
    //     params: { key },
    //   }
    // );
    const response= await getApiRequest(`/api/Users/GetUserSession?key=${key}`)
      console.log("Session retrieved successfully:", response.data);
      return response.data; // Return session value
    
  } catch (error) {
    console.error("Error retrieving session:", error.message);
    return null;
  }
};

// Example Usage
// getUserSession("user").then((sessionValue) => {
//   console.log("Session Value:", sessionValue);
// });



// Function to clear user session
export const clearUserSession = (key) => {
  try {
    // Clear from cookies
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; SameSite=Strict`;
    console.log("Session cleared for key:", key);
  } catch (error) {
    console.error("Error clearing session:", error.message);
  }
};

// Example Usage
// clearUserSession("user");

