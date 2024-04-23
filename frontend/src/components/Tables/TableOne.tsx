"use client";
import { useEffect, useState } from "react";
import { JsonRpcProvider, ethers } from "ethers";
import React from "react";

const TableOne = () => {
  const [visitorData, setVisitorData] = useState<
    {
      name: string;
      email: string;
      address: string;
      phone: string;
      purpose: string;
      types: string;
      toMeet: string;
      meetPersonEmail: string;
      date: string;
      visitorAddress: string;
    }[]
  >([]);

  const fetchVisitorData = async () => {
    try {
      const provider = new JsonRpcProvider("http://127.0.0.1:7545");
      const contractJson = require("/public/contracts/VisitorAuth.json"); // Ensure the path is correct

      const contract = new ethers.Contract(
        "0x6bDc6CC761bcd7440Daac84B7C646D2e352711aC", // Contract address
        contractJson.abi,
        provider
      );

      const allVisitors = await contract.getAllVisitors();
      console.log(allVisitors);

      const formattedVisitorData = allVisitors.map(
        (visitor: {
          name: any;
          email: any;
          add: any;
          phone: any;
          purpose: any;
          types: any;
          toMeet: any;
          meetPersonemail: any;
          date: any;
          visitorAddress: any;
        }) => ({
          name: visitor.name,
          email: visitor.email,
          address: visitor.add,
          phone: visitor.phone,
          purpose: visitor.purpose,
          types: visitor.types,
          toMeet: visitor.toMeet,
          meetPersonEmail: visitor.meetPersonemail,
          date: new Date(Number(visitor.date) * 1000).toString(), // Convert Unix timestamp to JavaScript date
          visitorAddress: visitor.visitorAddress,
        })
      );

      setVisitorData(formattedVisitorData);
    } catch (error) {
      console.error("Error fetching visitor data:", error);
    }
  };

  useEffect(() => {
    fetchVisitorData();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Visitor Details
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Address
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone No.
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Purpose
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Types
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              To Meet
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date Of Visiting
            </h5>
          </div>
          {visitorData.map((visitor, index) => (
            <React.Fragment key={`visitor_${visitor.email}`}>
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  {visitor.name}
                </h5>
              </div>
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  {visitor.address}
                </h5>
              </div>
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  {visitor.email}
                </h5>
              </div>
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  {visitor.phone}
                </h5>
              </div>
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  {visitor.purpose}
                </h5>
              </div>
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  {visitor.types}
                </h5>
              </div>
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  {visitor.toMeet}
                </h5>
              </div>
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  {visitor.date}
                </h5>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOne;
