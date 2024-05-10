//Ganache, which is a personal blockchain for Ethereum development, stores data in a format similar to the Ethereum mainnet.
// Ethereum does not natively support storing dates in the format YYYY-MM-DD or any other human-readable date format.
// Instead, dates are typically stored as Unix timestamps, which represent the number of seconds (or milliseconds) that have
// elapsed since January 1, 1970 (the Unix epoch).

"use client";
import Web3, { AbiFragment } from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input/input";
import parsePhoneNumberFromString, {
  E164Number,
  CountryCode,
} from "libphonenumber-js";

const VisitorAuth: React.FC = () => {
  const router = useRouter();
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract<AbiFragment[]> | null>(
    null
  );
  const [visitingData, setVisitingData] = useState({
    name: "",
    email: "",
    add: "",
    phone: "",
    purpose: "",
    types: "",
    toMeet: "",
    meetPersonemail: "",
    date: "",
    visitorAddress: "",
  });

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
          "0x429c4ECca8cAbe50A7741A85F95c0DEF40674FAA" // Contract address
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

  // Function to format the date string to DD/MM/YYYY
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

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    try {
      e.preventDefault();

      if (!(window as any).ethereum) {
        console.error("MetaMask is not installed.");
        return;
      }

      // Access Ethereum provider
      const ethereum = (window as any).ethereum;

      // Request account access from the user
      const data = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("eth data---", data);

      // Create a Web3 instance using MetaMask provider
      const web3 = new Web3(ethereum);

      if (!contract || !visitingData || !web3) {
        console.error("Contract or data is not available.");
        return;
      }
      console.log("visitingData----", visitingData);

      console.log(web3);

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      console.log("Connected account:", account);

      // Format the date string to YYYY-MM-DD
      const unixTimestamp = moment(visitingData.date, "YYYY-MM-DD").valueOf();
      console.log(unixTimestamp);

      const response = await axios.post(
        "http://localhost:8001/visitorRouter/visitorSignup",
        {
          ...visitingData,
          date: unixTimestamp,
        }
      );

      console.log("Server response:", response.data);

      const visitorId = response.data.visitorId;
      console.log(visitorId);

      const gas = await contract.methods
        .registerVisitor(
          visitingData.name,
          visitingData.email,
          visitingData.add,
          visitingData.phone,
          visitingData.purpose,
          visitingData.types,
          visitingData.toMeet,
          visitingData.meetPersonemail,
          unixTimestamp,
          visitingData.visitorAddress
        )
        .estimateGas({
          from: account,
          value: web3.utils.toWei("0.1", "ether"),
        });

      console.log("Gas estimate:", gas);

      const tx = await contract.methods
        .registerVisitor(
          visitingData.name,
          visitingData.email,
          visitingData.add,
          visitingData.phone,
          visitingData.purpose,
          visitingData.types,
          visitingData.toMeet,
          visitingData.meetPersonemail,
          unixTimestamp,
          visitingData.visitorAddress
        )
        .send({
          from: account,
          value: web3.utils.toWei("0.1", "ether"),
          gas: web3.utils.toHex(gas),
        });

      console.log("Transaction hash:", tx.transactionHash);
      // Display a message to indicate that the transaction was successful
      console.log("Data stored successfully on the blockchain.");

      // Redirect to OTP page or perform any other action after successful transaction
      router.push("/otpPage");
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
                name="add"
                value={visitingData.add}
                onChange={handleVisitingChange}
                rows={3}
                className="mt-1 p-3 border border-gray-300 rounded w-full resize-none focus:outline-none focus:ring focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-black"
              >
                Phone Number
              </label>
              <PhoneInput
                id="phone"
                name="phone"
                country={"IN" as CountryCode} // Set default country to India
                value={visitingData.phone as E164Number}
                onChange={(value) => {
                  if (value) {
                    const phoneNumber = parsePhoneNumberFromString(value);
                    if (phoneNumber) {
                      setVisitingData((prevData) => ({
                        ...prevData,
                        phone: phoneNumber.format("E.164"),
                      }));
                    } else {
                      setVisitingData((prevData) => ({
                        ...prevData,
                        phone: "",
                      }));
                    }
                  } else {
                    setVisitingData((prevData) => ({ ...prevData, phone: "" }));
                  }
                }}
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
                name="types"
                value={visitingData.types}
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
                id="toMeet"
                name="toMeet"
                value={visitingData.toMeet}
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
                name="meetPersonemail"
                value={visitingData.meetPersonemail}
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
                type="Date"
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
