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
    }[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new JsonRpcProvider("http://127.0.0.1:7545");
        const contractJson = require("/public/contracts/VisitorAuth.json"); // Ensure the path is correct

        const contract = new ethers.Contract(
          "0x46fa8C6Ab96011c16D5f274074E1a6d1D778c804", // Contract address
          contractJson.abi,
          provider
        );
        console.log(contract);

        const allVisitors = await contract.getAllVisitors();

        const formattedVisitorData = allVisitors.map((visitors: any) => ({
          name: visitors.name,
          email: visitors.email,
          address: visitors.add,
          phone: visitors.phone,
          purpose: visitors.purpose,
          types: visitors.types,
          toMeet: visitors.toMeet,
          meetPersonEmail: visitors.meetPersonemail,
          date: (Number(visitors.date) * 1000).toString(), // Convert Unix timestamp to JavaScript date
        }));

        setVisitorData(formattedVisitorData);
        console.log("Fetched visitor data:", formattedVisitorData);
      } catch (error) {
        console.error("Error fetching visitor data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Visitor Details
      </h4>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 text-black lg:grid-cols-10 gap-4 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                ID
              </h5>
            </div>
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
                Meet Person Email
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Date Of Visiting
              </h5>
            </div>
            {visitorData.map((visitor, index) => (
              <React.Fragment key={index}>
                {/* <div className="flex flex-wrap w-full"></div> */}
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium  xsm:text-base">
                    {index + 1}
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium  xsm:text-base">
                    {visitor.name}
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium  xsm:text-base">
                    {visitor.address}
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium  xsm:text-base">
                    {visitor.email}
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium  xsm:text-base">
                    {visitor.phone}
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium  xsm:text-base">
                    {visitor.purpose}
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium  xsm:text-base">
                    {visitor.types}
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium  xsm:text-base">
                    {visitor.toMeet}
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium  xsm:text-base">
                    {visitor.meetPersonEmail}
                  </h5>
                </div>
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium  xsm:text-base">
                    {visitor.date}
                  </h5>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOne;
