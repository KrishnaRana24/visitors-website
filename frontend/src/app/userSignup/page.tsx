"use client";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import React, { useEffect, useState } from "react";
// import VisitorAuth from "../../../public/contracts/VisitorAuth.json";

interface VisitorData {
  name: string;
  email: string;
  add: string;
  phone: string;
  purpose: string;
  types: string;
  toMeet: string;
  meetPersonemail: string;
  date: number;
}

const VisitorAuth: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract<AbiItem[]> | null>(null);

  const [visitingData, setVisitingData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    purpose: "",
    type: "",
    tomeet: "",
    meetPersonEmail: "",
    date: "",
    visitorAddress: "",
  });

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

  useEffect(() => {
    console.log("Initializing contract...");

    const initializeContract = async () => {
      try {
        // Initialize web3 and load contract ABI
        const web3Instance = new Web3("http://127.0.0.1:7545");
        setWeb3(web3Instance);
        const contractJson = require("/public/contracts/VisitorAuth.json");

        const contractInstance = new web3Instance.eth.Contract(
          contractJson.abi,
          "0x46fa8C6Ab96011c16D5f274074E1a6d1D778c804" // Contract address
        );

        // Set the contract instance in the state
        setContract(contractInstance);

        console.log("Contract initialized successfully.");
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initializeContract();
  }, []);

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
      // Ensure contract and data are available
      if (!contract || !visitingData) {
        console.error("Contract or data is not available.");
        return;
      }

      const accounts = await web3?.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
        console.error("No accounts found.");
        return;
      }

      // Convert the date string to a Unix timestamp (uint256)
      const dateTimestamp = Date.parse(visitingData.date) / 1000; // Convert milliseconds to seconds
      if (isNaN(dateTimestamp)) {
        console.error("Invalid date format.");
        return;
      }

      const gas = await contract.methods
        .registerVisitor(
          visitingData.name,
          visitingData.email,
          visitingData.address,
          visitingData.phone,
          visitingData.purpose,
          visitingData.type,
          visitingData.tomeet,
          visitingData.meetPersonEmail,
          dateTimestamp,
          visitingData.visitorAddress
        )
        .estimateGas({ from: accounts[0] });

      const gasLimit: string = gas.toString(); // Convert bigint to string

      const transaction = await contract.methods
        .registerVisitor(
          visitingData.name,
          visitingData.email,
          visitingData.address,
          visitingData.phone,
          visitingData.purpose,
          visitingData.type,
          visitingData.tomeet,
          visitingData.meetPersonEmail,
          dateTimestamp,
          visitingData.visitorAddress
        )
        .send({ from: accounts[0], gas: gasLimit });

      console.log(
        "Transaction hash:",
        transaction,
        transaction.transactionHash
      );
      console.log("Data stored successfully on the blockchain.");
      // Get the visitor address from the transaction receipt
      const visitorId =
        transaction.events?.VisitorRegistered?.returnValues?.visitorId;
      console.log(visitorId);

      // Update state with the visitor address
      if (visitorId) {
        setVisitingData((prevData) => ({
          ...prevData,
          visitorAddress: visitorId.toString(),
        }));
      }
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  return (
    <div className="min-h-screen  text-black m-10 flex justify-center items-center flex-col w-600">
      <h2 className="text-3xl font-bold mb-8">Visitor Information Form</h2>
      <div className="max-w-md w-full bg-purple-200 p-10 rounded shadow-md grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={visitingData.name}
                onChange={handleVisitingChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium  text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={visitingData.email}
                onChange={handleVisitingChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium  text-black"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={visitingData.address}
                onChange={handleVisitingChange}
                rows={3}
                className="mt-1 p-3 border border-gray-300 rounded w-full resize-none focus:outline-none focus:ring focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium  text-black"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={visitingData.phone}
                onChange={handleVisitingChange}
                className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
          </form>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Visiting Details</h3>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="purpose"
                className="block text-sm font-medium  text-black"
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
                className="block text-sm font-medium  text-black"
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
                className="block text-sm font-medium  text-black"
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
                className="block text-sm font-medium  text-black"
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
                className="block text-sm font-medium  text-black"
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
                onClick={handleButtonClick}
                type="button"
                className="w-full bg-purple-700 text-white py-3 px-6 rounded hover:bg-purple-950 transition duration-200"
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
