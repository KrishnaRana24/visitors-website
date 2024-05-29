"use client";
import React, { useEffect, useState } from "react";
import TableOne from "../Tables/TableOne";
import DefaultLayout from "../Layout/DefaultLayout";
import ChartOne from "../Charts/ChartOne/page";
import ChartTwo from "../Charts/ChartTwo/page";
import ChartThree from "../Charts/ChartThree/page";
import axios from "axios";
import Web3 from "web3";
import { FaUser, FaEthereum, FaStar } from "react-icons/fa";

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
      const visitorsData = response.data.data;

      if (!visitorsData || !Array.isArray(visitorsData)) {
        console.error("Response data does not contain an array of visitors");
        return;
      }

      const totalVisitors = visitorsData.length;
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
      const reviewData = response.data.data;

      if (!reviewData || !Array.isArray(reviewData)) {
        console.error("Response data does not contain an array of reviews");
        return;
      }

      const totalReviews = reviewData.length;
      setTotalReviews(totalReviews);
    } catch (error) {
      console.error("Error fetching total reviews:", error);
    }
  };

  useEffect(() => {
    fetchTotalVisitors();
    fetchTotalEtherPrice();
    fetchTotalReviews();
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="card bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <FaUser size={30} />
            <div>
              <h3 className="text-lg font-semibold">Total Visitors</h3>
              <p className="text-2xl font-bold">{totalVisitors}</p>
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <FaEthereum size={30} />
            <div>
              <h3 className="text-lg font-semibold">Total Ether Balance</h3>
              <p className="text-2xl font-bold">{etherBalance} ETH</p>
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
          <div className="flex items-center justify-between">
            <FaStar size={30} />
            <div>
              <h3 className="text-lg font-semibold">Total Reviews</h3>
              <p className="text-2xl font-bold">{totalReviews}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>

      <div className="mt-8">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default Adashboard;
