import { Helmet } from 'react-helmet-async';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError(); // Get the error details from the router

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <Helmet>
        <title>CleanCommunity | 404 Not Found</title>
      </Helmet>
      
      {/* You can replace this Lottie animation URL or use a static image */}
      <lottie-player 
        src="https://assets3.lottiefiles.com/packages/lf20_G0Goc0.json" 
        background="transparent" 
        speed="1" 
        style={{ width: '300px', height: '300px' }} 
        loop 
        autoplay>
      </lottie-player>

      <h1 className="text-5xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      {/* Display error message if it exists */}
      {error && (
        <p className="text-gray-500 italic mb-6">
          Error: {error.statusText || error.message}
        </p>
      )}

      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>

      {/* Add this script to your index.html to use Lottie */}
      {/* <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script> */}
    </div>
  );
};

export default ErrorPage;