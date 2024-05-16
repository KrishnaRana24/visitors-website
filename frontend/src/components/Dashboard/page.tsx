"use client";
import React, { useEffect, useState } from "react";
import TableOne from "../Tables/TableOne";
import DefaultLayout from "../Layout/DefaultLayout";
import ChartOne from "../Charts/ChartOne/page";
import ChartTwo from "../Charts/ChartTwo/page";
import ChartThree from "../Charts/ChartThree/page";
import axios from "axios";
import Web3 from "web3";
import { FaUser } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import ChartFour from "../Charts/ChartFour/page";

const web3 = new Web3("http://localhost:7545");
const Adashboard: React.FC = () => {
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [etherBalance, setEtherBalance] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  const fetchTotalVisitors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/visitorRouter/getVisitorData"
      );
      console.log("Response----", response.data);
      console.log("Data type:", typeof response.data);
      console.log("Data:", response.data);

      const visitorsData = response.data.data;

      if (!visitorsData || !Array.isArray(visitorsData)) {
        console.error("Response data does not contain an array of visitors");
        return;
      }

      const totalVisitors = visitorsData.length;
      console.log("Total Visitors:", totalVisitors);

      setTotalVisitors(totalVisitors);
    } catch (error) {
      console.error("Error fetching total visitors:", error);
    }
  };

  const fetchTotalEtherPrice = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0]; // Assuming you want to display balance for the first account
      const balance = await web3.eth.getBalance(address);
      // Convert balance from wei to Ether (1 Ether = 10^18 wei)
      const etherBalance = web3.utils.fromWei(balance, "ether");
      setEtherBalance(parseFloat(etherBalance));
    } catch (error) {
      console.error("Error fetching Ether balance:", error);
    }
  };

  const fetchTotalReviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/review/getReview"
      );
      console.log("Response----", response.data);
      console.log("Data type:", typeof response.data);
      console.log("Data:", response.data);

      const reviewData = response.data.data;

      if (!reviewData || !Array.isArray(reviewData)) {
        console.error("Response data does not contain an array of visitors");
        return;
      }

      const totalReviews = reviewData.length;
      console.log("Total Reviews:", totalReviews);

      setTotalReviews(totalReviews);
    } catch (error) {
      console.error("Error fetching total visitors:", error);
    }
  };

  useEffect(() => {
    fetchTotalVisitors();
    fetchTotalEtherPrice();
    fetchTotalReviews();
  }, []);

  return (
    <>
      <DefaultLayout>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <div className="card bg-blue-200 rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaUser className="text-blue-950 mr-2" size={22} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  Total Visitors
                </h3>
                <p className="text-sm font-semibold text-blue-950">
                  {totalVisitors}
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-blue-200 rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <FaEthereum
                  className="text-blue-950 mr-2 "
                  size={30}
                  color="#3C3C3D"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  Total Ether balance
                </h3>
                <p className="text-sm font-semibold text-blue-950">
                  {etherBalance} ETH
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-blue-200 rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <FaStar
                  className=" text-blue-950 mr-2"
                  size={22}
                  color="#3C3C3D"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  Total Reviews
                </h3>
                <p className="text-sm font-semibold text-blue-950">
                  {totalReviews}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartOne />
          <ChartTwo />
          <ChartThree />
          {/* Adjusted ChartFour component */}
          <div className="col-span-12 md:col-span-6 w-150 h-70 xl:col-span-2 2xl:col-span-3">
            <ChartFour />
          </div>

          <div className="col-span-12 xl:col-span-12">
            <TableOne />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Adashboard;
