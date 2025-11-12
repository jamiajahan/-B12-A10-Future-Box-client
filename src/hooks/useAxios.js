import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import auth from '../firebase/firebase.config'; // Import your Firebase auth service

// Create a new Axios instance
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000', // Set your server's base URL
});

const useAxios = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Request Interceptor:
    // This function runs BEFORE any request is sent
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        // Get the current user from Firebase
        const user = auth.currentUser;
        if (user) {
          // Get the Firebase token
          const token = await user.getIdToken();
          // Set the Authorization header for the request
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 2. Response Interceptor:
    // This function runs AFTER a response is received
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        // If the response is successful, just return it
        return response;
      },
      (error) => {
        // If the error is 401 (Unauthorized) or 403 (Forbidden)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // The token is invalid or expired
          console.log('Auth error, logging out...');
          logOut(); // Log the user out
          navigate('/login'); // Redirect to login
        }
        return Promise.reject(error);
      }
    );

    // 3. Cleanup function:
    // This removes the interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure; // Return the configured Axios instance
};

export default useAxios;