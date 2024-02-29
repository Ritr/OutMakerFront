import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        Go to Home
      </button>
      </Link>
    </div>
  );
};

export default NotFound;
