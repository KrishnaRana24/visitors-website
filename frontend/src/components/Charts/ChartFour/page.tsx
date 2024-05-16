"use client";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { ApexOptions } from "apexcharts";

interface DataPoint {
  x: number;
  y: number;
}

const ChartFour: React.FC = () => {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitorResponse, reviewResponse] = await Promise.all([
          axios.get("http://localhost:8000/visitorRouter/getVisitorData"),
          axios.get("http://localhost:8000/review/getReview"),
        ]);

        const visitorsData = visitorResponse.data.data;
        const reviewsData = reviewResponse.data.data;

        const visitorsChartData = visitorsData.map((item: any) => ({
          x: new Date(item.date).getMonth() + 1,
          y: item.totalVisitors,
        }));

        const reviewsChartData = reviewsData.map((item: any) => ({
          x: new Date(item.date).getMonth() + 1,
          y: item.totalReviews,
        }));

        const combinedData: DataPoint[] = [
          ...visitorsChartData,
          ...reviewsChartData,
        ];

        setChartData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "numeric",
      labels: {
        formatter: (value: number | string) => {
          const numericValue =
            typeof value === "string" ? parseFloat(value) : value;
          return numericValue.toFixed(2);
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number | string) => {
          const numericValue =
            typeof value === "string" ? parseFloat(value) : value;
          return numericValue.toFixed(2);
        },
      },
    },
    title: {
      text: "Visitor Area Chart",
      align: "left",
    },
    subtitle: {
      text: "No of visitor",
      align: "left",
    },
    legend: {
      show: true,
      position: "top",
    },
    grid: {
      show: true,
      borderColor: "#f0f0f0",
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        sizeOffset: 2,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        formatter: (value: number) => value.toFixed(2),
      },
      y: {
        formatter: (value: number) => {
          const formattedValue = value > 20 ? 20 : value; // Limiting maximum value to 20
          return formattedValue.toFixed(2);
        },
      },
    },

    series: [
      {
        name: "Visitor Data",
        data: chartData,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h5 className="text-xl font-semibold text-black dark:text-white">
        Visitor and Review Area Chart
      </h5>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4">Error: {error}</p>}
      {!loading && !error && chartData.length === 0 && (
        <p className="text-center mt-4">No data available</p>
      )}
      {!loading && !error && chartData.length > 0 && (
        <ReactApexChart
          options={options}
          series={[{ name: "Data", data: chartData }]}
          type="area"
          height={400}
        />
      )}
    </div>
  );
};

export default ChartFour;
