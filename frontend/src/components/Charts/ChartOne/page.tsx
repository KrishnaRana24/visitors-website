"use client";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { ApexOptions } from "apexcharts";

const ChartOne: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from MongoDB URL
        const response = await axios.get(
          `http://localhost:8000/visitorRouter/getVisitorData?year=${selectedYear}`
        );

        const visitingData = response.data;
        // const data = visitingData.data.forEach((vdata: any, index: any) => {
        //   console.log(vdata, index);
        // });
        console.log("visitingData--", visitingData);
        // Check if visitingData is an array
        const monthlyData = Array.from({ length: 12 }, () => 0);
        visitingData.data.forEach((data: any) => {
          const date = new Date(data.date);
          const month = date.getMonth();
          monthlyData[month]++;
        });
        setSeriesData(monthlyData);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    if (selectedYear !== null) {
      fetchData();
    }
  }, [selectedYear]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };

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
      max: 30,
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
        <div>
          <select
            value={selectedYear.toString()}
            onChange={handleYearChange}
            className="rounded border border-gray-300"
          >
            {/* <option value="">Select Year</option> */}
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
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
