import React from "react";

const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eadbca]">
      <div className="flex flex-col items-center p-12 bg-white rounded-xl shadow-2xl">
        <h2 className="mb-4 text-2xl font-bold text-[#bb7d31]">Payment Canceled</h2>
        <p className="text-gray-800"> Your payment was not completed.</p>
        <a href="/donate" className="mt-4 px-4 py-2 font-bold bg-[#bb7d31] text-white rounded-lg hover:bg-[#9a6729] transition duration-300">
          Try Again
        </a>
      </div>
    </div>
  );
};

export default Cancel;
