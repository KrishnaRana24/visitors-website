"use client";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { JsonRpcProvider, ethers } from "ethers";
import { ApexOptions } from "apexcharts";

const ChartOne: React.FC = () => {
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new JsonRpcProvider("http://127.0.0.1:7545");
        const contractJson = require("/public/contracts/VisitorAuth.json");
        const contract = new ethers.Contract(
          "0x8fbdBD15920B21fe2ee5649AEC902fB883De4DfA",
          contractJson.abi,
          provider
        );

        const monthlyDataPromises = [];
        for (let month = 1; month <= 12; month++) {
          const monthlyDataPromise = contract.getTotalVisitorsByMonth(month);
          monthlyDataPromises.push(monthlyDataPromise);
        }

        const monthlyDataResults = await Promise.all(monthlyDataPromises);
        const monthlyData = monthlyDataResults.map((result: any) =>
          typeof result === "bigint" ? Number(result) : result
        );

        setSeriesData(monthlyData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 100,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Total Visitors
          </h5>
        </div>
        <div>{/* Dropdown for selecting time period */}</div>
      </div>
      {loading ? (
        <p>Loading chart...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ReactApexChart
          options={options}
          series={[{ name: "Visitors", data: seriesData }]}
          type="area"
          height={350}
          width="100%"
        />
      )}
    </div>
  );
};

export default ChartOne;
