import Link from 'next/link';
import React from 'react';

import bgImage from "../components/images/GATBGIMG.png"; 
const NotFoundPage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
    }}
    >
      <div className="max-w-2xl h-full mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        <div className="text-9xl font-bold text-indigo-600 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for seems to have gone on a little adventure. Don't worry, we'll help you find your way back home.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
