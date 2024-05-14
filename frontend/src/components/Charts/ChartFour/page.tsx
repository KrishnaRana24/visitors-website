"use client";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { ApexOptions } from "apexcharts";

interface DataPoint {
  x: number;
  y: number;
  z: number;
}

const ChartFour: React.FC = () => {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/visitorRouter/getVisitorData"
        );
        const visitorData = response.data.data; // Extracting the data array from response.data
        console.log("Visitor Data:", visitorData);

        if (Array.isArray(visitorData) && visitorData.length > 0) {
          const formattedData: DataPoint[] = visitorData.map(
            (visitor: any) => ({
              x: visitor.x,
              y: visitor.y,
              z: visitor.z,
            })
          );

          setChartData(formattedData);
        } else {
          setError("No visitor data found!");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "scatter",
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
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div>
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Visitor Data Scatter Chart
        </h5>
      </div>
      <div className="w-full h-96">
        <ReactApexChart
          options={options}
          series={[{ data: chartData }]}
          type="scatter"
          height={400}
        />
      </div>
    </div>
  );
};

export default ChartFour;
