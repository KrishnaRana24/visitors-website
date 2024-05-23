"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

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
            columnWidth: "60%",
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
      dataLabels: {
        position: "top",
      },
      distributed: true,
      barHeight: "80%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        fontSize: "14px",
      },
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
    labels: {
      style: {
        fontSize: "14px",
      },
    },
    min: 0,
    max: 20,
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
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [noData, setNoData] = useState<boolean>(false);

  const fetchData = async (year: number, month: number) => {
    try {
      setLoading(true);
      setError(null);
      setNoData(false);

      console.log(`Fetching data for year: ${year}, month: ${month}`);

      const response = await axios.get(
        `http://localhost:8000/visitorRouter/getVisitorDataByYearMonth?year=${year}&month=${month}`
      );

      console.log("API Response:", response);

      if (response.status === 200) {
        const visitingData = response.data;

        if (visitingData.data.length === 0) {
          setNoData(true);
        } else {
          const dailyData = Array.from({ length: 7 }, () => 0);

          visitingData.data.forEach((data: any) => {
            const date = new Date(data.date);
            const dayOfWeek = date.getDay();
            dailyData[dayOfWeek]++;
          });

          console.log("Processed daily data:", dailyData);

          setSeriesData(dailyData);
        }
      } else {
        console.error("API returned non-200 status code:", response.status);
        setError(`Error fetching data: ${response.statusText}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        setError(`Error fetching data: ${error.message}`);
      } else {
        console.error("Unexpected error:", error);
        setError("Error fetching data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-8">
      <div className="mb-3">
        <div className="p-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Visitor of this week
          </h4>
          <div className="flex gap-4">
            <select
              className="mt-4 p-2 border border-stroke rounded-md"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {[...Array(10)].map((_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <select
              className="mt-4 p-2 border border-stroke rounded-md"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {new Date(0, month - 1).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-500">Error: {error}</div>}
          {loading ? (
            <p>Loading chart...</p>
          ) : noData ? (
            <p>No data found for the selected year and month.</p>
          ) : (
            <ReactApexChart
              options={options}
              series={[{ name: "Visitors", data: seriesData }]}
              type="bar"
              height={350}
              width="100%"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
