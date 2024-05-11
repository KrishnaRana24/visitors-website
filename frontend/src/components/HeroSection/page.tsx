"use client";
import React, { useState } from "react";
import QRCode from "qrcode.react"; // Import from qrcode.react

export default function HeroSection() {
  const websiteUrl = "http://localhost:3000/userSignup";
  const [qrData, setQrData] = useState(websiteUrl);

  // Handler function for the button click event
  function handleGenerateQR() {
    setQrData(websiteUrl); // Generate and set a new random data string
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-950">
            Welcome to <span className="text-purple-600">VisitorVault</span>
          </h2>

          <p className="text-base md:text-lg mb-6 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            rerum dicta debitis harum veritatis soluta aliquid quo quisquam
            illum minus rem maxime, perspic iatis culpa, tempore provident omnis
            deserunt vero vitae!
          </p>
          <button
            className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 active:bg-purple-800"
            onClick={handleGenerateQR}
          >
            Scan QR
            <svg
              className="w-8 h-8 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex justify-center">
          <div className="p-6 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center transform hover:rotate-3 transition duration-300">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <QRCode value={qrData} size={250} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
