import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
    return (
        <div className="bg-[#0d1117] text-[#c9d1d9] flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="text-center">

                <div className="flex justify-center mb-4">
                    <FaExclamationTriangle className="text-yellow-500" size={50} />
                </div>

                <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold text-blue-500 tracking-wider">
                    404
                </h1>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mt-4">
                    Page Not Found
                </h2>

                <p className="mt-4 text-base sm:text-lg max-w-md mx-auto">
                    Oops! The page you are looking for does not exist. It might have been moved or deleted.
                </p>

                <div className="mt-10">
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;