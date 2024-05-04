"use client ";
import React, { useState, useEffect } from "react";
import { JsonRpcProvider, ethers } from "ethers";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const options: ApexOptions = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 10, // Control the number of ticks
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontWeight: 500,
    fontSize: "14px",
    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

const ChartTwo: React.FC = () => {
  const [state, setState] = useState<ChartOneState>({
    series: [],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new JsonRpcProvider("http://127.0.0.1:7545");
        const contractJson = require("/public/contracts/VisitorAuth.json");

        const contract = new ethers.Contract(
          "0x008e94D6D6282575b55e5d464B55d595C8140449",
          contractJson.abi,
          provider
        );

        // Determine the current week number
        const currentDate = new Date();
        const currentWeek = getWeekNumber(currentDate);

        // Fetch total visitors for the current week
        const totalVisitors =
          await contract.getTotalVisitorsByWeek(currentWeek);

        setState({
          series: [
            {
              name: "Visitor",
              data: [Number(totalVisitors)],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching visitor data:", error);
        setError("Error fetching visitor data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Visitor of this week
          </h4>
          {error && <div>Error: {error}</div>}
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;

function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
