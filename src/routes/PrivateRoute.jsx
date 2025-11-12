import { Navigate, useLocation } from "react-router-dom";
// We will create useAuth hook and AuthProvider later
// import useAuth from "../hooks/useAuth"; 
import Spinner from "../components/Shared/Spinner";

// Placeholder auth object - REPLACE THIS LATER
const useAuth = () => ({
  user: null, // Change to a user object to test, e.g., { email: 'test@test.com' }
  loading: true, // Set to false to test
});
// ----------------------------------------


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Get user and loading state
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    return children;
  }

  // Redirect to login, but save the location they were trying to go to
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;