"use client";

import React, { useState } from "react";
import QRCode from "qrcode.react";

const CheckoutQR: React.FC = () => {
  const websiteUrl = "http://localhost:3000/userReview";
  const [qrData, setQrData] = useState(websiteUrl);

  function handleGenerateQR() {
    setQrData(websiteUrl);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <h1 className="text-3xl font-bold mb-4">Checkout with </h1> */}
      <h3 className="text-4xl md:text-2xl font-bold mb-4 text-blue-950">
        Thank you for visiting
        <span className="text-purple-600">VisitorVault</span>
      </h3>
      <p className="text-lg mb-4 text-purple-600">
        Scan the QR code to proceed with checkout:
      </p>
      <div className="p-6 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center transform hover:rotate-3 transition duration-300">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <QRCode value={qrData} size={250} />
        </div>
      </div>
      <button
        onClick={handleGenerateQR}
        className="mt-8 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        scan above QR Code
      </button>
    </div>
  );
};

export default CheckoutQR;
