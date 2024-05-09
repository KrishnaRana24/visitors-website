"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from MongoDB URL
        const response = await axios.get(
          `http://localhost:8001/visitorRouter/getVisitorData`
        );

        const visitingData = response.data;

        // Initialize array to store daily data
        const dailyData = Array.from({ length: 7 }, () => 0);

        // Iterate through the data and count visits for each day of the week
        visitingData.data.forEach((data: any) => {
          const date = new Date(data.date);
          const dayOfWeek = date.getDay();
          dailyData[dayOfWeek]++;
        });

        setSeriesData(dailyData);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //   const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     const year = parseInt(event.target.value);
  //     setSelectedYear(year);
  //   };

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
            series={[{ name: "Visitors", data: seriesData }]}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
