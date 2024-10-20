import React, { useEffect } from 'react';
import './donation.css';

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eadbca] bg">
      <div className="flex flex-col items-center p-12 bg-white rounded-xl shadow-2xl">
        <h2 className="mb-4 text-2xl font-bold text-[#bb7d31]">Payment Successful!</h2>
        <p className="text-gray-800">Thank you for your donation to help stray animals!</p>
        <a href="/donate" className="mt-4 px-4 py-2 font-bold bg-[#bb7d31] text-white rounded-lg hover:bg-[#9a6729] transition duration-300">
          Go Back to Donation Form
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
