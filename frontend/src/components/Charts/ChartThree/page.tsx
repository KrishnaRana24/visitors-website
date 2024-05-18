"use client";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { JsonRpcProvider, ethers } from "ethers";

const ChartThree: React.FC = () => {
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new JsonRpcProvider("http://127.0.0.1:7545");
        const contractJson = require("/public/contracts/VisitorAuth.json");
        const contract = new ethers.Contract(
          "0xa9EE2E59C8e035B7e44f3B7a8e6Efd49C206DEa3",
          contractJson.abi,
          provider
        );

        const allVisitors = await contract.getAllVisitors();

        // Initialize typesCount object
        const typesCount: { [key: string]: number } = {
          unknown: 0,
          client_partner: 0,
          wfh: 0,
          vender: 0,
          job_applicant: 0,
          regulatory: 0,
        };

        // Count occurrences of each visitor type
        allVisitors.forEach((visitor: any) => {
          if (visitor.types in typesCount) {
            typesCount[visitor.types]++;
          }
        });

        // Extract series data from typesCount object
        const seriesData = Object.values(typesCount);

        // Update state
        setSeriesData(seriesData);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching visitor data:", error);
        setError("Error fetching visitor data");
      }
    };

    fetchData();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    colors: ["#2c43da", "#6577F3", "#8FD0EF", "#1f67a1", "#a0cee4", "#0FADCF"],
    labels: [
      "unknown",
      "client_partner",
      "wfh",
      "vender",
      "job_applicant",
      "regulatory",
    ],
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Visitors Analytics
          </h5>
        </div>
        <div>{/* Dropdown for selecting time period */}</div>
      </div>

      {error && <div>Error: {error}</div>}

      {dataFetched && (
        <>
          <div className="mb-2">
            <div id="chartThree" className="mx-auto flex justify-center">
              <ReactApexChart
                options={options}
                series={seriesData}
                type="donut"
                height={350}
              />
            </div>
          </div>

          {/* Display percentages for each visitor type */}
          <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
            {options.labels!.map((label, index) => (
              <div key={index} className="w-full px-8 sm:w-1/2">
                <div className="flex w-full items-center">
                  <span
                    className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-${options.colors![index]}`}
                  ></span>
                  <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                    <span>{label}</span>
                    <span>{`${seriesData[index]}%`}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChartThree;
