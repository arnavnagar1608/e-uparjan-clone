import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
      <div className="w-full max-w-md bg-white gov-border p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-govGreen-900 mb-4">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your registered mobile number to receive an OTP to reset your password.</p>
        
        <input 
          type="text" 
          placeholder="Mobile Number" 
          className="w-full border border-gray-300 px-3 py-2 text-sm rounded-sm mb-4 focus:outline-none focus:border-govGreen-600 focus:ring-1 focus:ring-govGreen-600"
        />
        
        <button className="w-full bg-govGreen-700 text-white font-bold py-2 px-4 rounded-sm hover:bg-govGreen-800 transition-colors mb-4">
          Send OTP
        </button>
        
        <Link to="/login" className="text-sm font-bold text-govGreen-700 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
