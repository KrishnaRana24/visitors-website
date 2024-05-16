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
import Loader from "@/components/loader/page";
import dotenv from "dotenv";

dotenv.config();
console.log(".env--", process.env.TEMP);

const VisitorAuth: React.FC = () => {
  const router = useRouter();
  const [metaMaskWeb3, setMetaMaskWeb3] = useState<Web3 | null>(null);
  const [ganacheWeb3, setGanacheWeb3] = useState<Web3 | null>(null);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<Contract<AbiItem[]> | null>(null);
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
    console.log("Initializing contracts...");

    const initializeContracts = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });

          // MetaMask Web3 instance
          const metaMaskWeb3Instance = new Web3(window.ethereum);
          setMetaMaskWeb3(metaMaskWeb3Instance);

          // Ganache Web3 instance
          const ganacheWeb3Instance = new Web3("http://127.0.0.1:7545");
          setGanacheWeb3(ganacheWeb3Instance);

          const contractJson = require("/public/contracts/VisitorAuth.json");
          const ganacheContractInstance = new ganacheWeb3Instance.eth.Contract(
            contractJson.abi,
            "0x23F6c77273528b88A2595BfBb3DE5A1b35cB435c" // Contract address
          );
          console.log("contractInstance--", ganacheContractInstance);

          setContract(ganacheContractInstance);
          console.log("Contract initialized successfully.");
        } catch (error) {
          console.error("Error initializing contracts:", error);
        }
      } else {
        console.error("MetaMask is not installed!");
      }
    };

    initializeContracts();
  }, []);

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

      if (!contract || !visitingData || !metaMaskWeb3) {
        console.error("Contract or data is not available.");
        return;
      }
      console.log("visitingData----", visitingData);

      const accounts = await metaMaskWeb3.eth.getAccounts();
      const account = accounts[0];
      console.log("Connected account:", account);

      const unixTimestamp = moment(visitingData.date, "YYYY-MM-DD").valueOf();
      console.log(unixTimestamp);

      const response = await axios.post(
        "http://localhost:8000/visitorRouter/visitorSignup",
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
          value: metaMaskWeb3.utils.toWei("0.1", "ether"),
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
          value: metaMaskWeb3.utils.toWei("0.1", "ether"),
          gas: metaMaskWeb3.utils.toHex(gas),
        });

      console.log("Transaction hash:", tx.transactionHash);
      console.log("Data stored successfully on the blockchain.");

      try {
        const otpResponse = await axios.post(
          "http://localhost:8000/otpRouter/generateOtp",
          {
            visitorId,
            email: visitingData.email,
            meetPersonemail: visitingData.meetPersonemail,
          }
        );

        console.log("OTP generated and sent successfully:", otpResponse.data);
        setLoading(false);
        router.push("/otpPage");
      } catch (error) {
        console.log("Error while generating OTP:", error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  return (
    <div className="min-h-screen  text-black m-10 flex justify-center items-center flex-col w-600">
      <h2 className="text-3xl font-bold mb-8">Visitor Information Form</h2>
      <div className="max-w-md w-full bg-purple-200 p-10 rounded shadow-md grid grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-2 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
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
                        setVisitingData((prevData) => ({
                          ...prevData,
                          phone: "",
                        }));
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
          </>
        )}
      </div>
    </div>
  );
};

export default VisitorAuth;
