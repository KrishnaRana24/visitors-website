"use client";
import React, { useState } from "react";

const VisitorAuth: React.FC = () => {
  const [personalData, setPersonalData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [visitingData, setVisitingData] = useState({
    purpose: "",
    type: "",
    tomeet: "",
    meetPersonEmail: "",
    date: "",
  });

  const handlePersonalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVisitingChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setVisitingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., send data to server)
    console.log({ ...personalData, ...visitingData });
  };

  return (
    <div className="min-h-screen bg-gray-100 m-10 flex justify-center items-center flex-col w-600">
      <h2 className="text-3xl font-bold mb-8">Visitor Information Form</h2>
      <div className="max-w-md w-full bg-white p-10 rounded shadow-md grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={personalData.name}
                onChange={handlePersonalChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={personalData.email}
                onChange={handlePersonalChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={personalData.address}
                onChange={handlePersonalChange}
                rows={3}
                className="mt-1 p-3 border border-gray-300 rounded w-full resize-none focus:outline-none focus:ring focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={personalData.phone}
                onChange={handlePersonalChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
          </form>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Visiting Details</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="purpose"
                className="block text-sm font-medium text-gray-700"
              >
                Purpose of Visit
              </label>
              <input
                type="text"
                id="purpose"
                name="purpose"
                value={visitingData.purpose}
                onChange={handleVisitingChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Visitor Type:
              </label>
              <select
                id="type"
                name="type"
                value={visitingData.type}
                onChange={handleVisitingChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                required
              >
                <option value="">Select Visiting Type</option>
                <option value="unknown">Unknown</option>
                <option value="client_partner">Client/Partner</option>
                <option value="wfh">WFH Employees</option>
                <option value="vender">Vender Visitor</option>
                <option value="job_applicant">Job applicant visitor</option>
                <option value="regulatory">Regulatory visitors</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label
                htmlFor="tomeet"
                className="block text-sm font-medium text-gray-700"
              >
                To Meet
              </label>
              <input
                type="text"
                id="tomeet"
                name="tomeet"
                value={visitingData.tomeet}
                onChange={handleVisitingChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="meetPersonEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Meet Person Email
              </label>
              <input
                type="email"
                id="meetPersonEmail"
                name="meetPersonEmail"
                value={visitingData.meetPersonEmail}
                onChange={handleVisitingChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Visit
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={visitingData.date}
                onChange={handleVisitingChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitorAuth;
