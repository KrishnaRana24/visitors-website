"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { JsonRpcProvider, ethers } from "ethers";
import ReactPaginate from "react-paginate";
import moment from "moment";
import axios from "axios";

interface Visitor {
  name: string;
  email: string;
  address: string;
  phone: string;
  purpose: string;
  types: string;
  toMeet: string;
  meetPersonEmail: string;
  date: string;
}

const TableOne = () => {
  const [visitorData, setVisitorData] = useState<Visitor[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [searchName, setSearchName] = useState("");
  const [searchTypes, setSearchTypes] = useState("");
  const [searchToMeet, setSearchToMeet] = useState("");
  const [filteredData, setFilteredData] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch visitor data
        const provider = new JsonRpcProvider("http://127.0.0.1:7545");
        const contractJson = require("/public/contracts/VisitorAuth.json");

        const contract = new ethers.Contract(
          "0x23F6c77273528b88A2595BfBb3DE5A1b35cB435c",
          contractJson.abi,
          provider
        );

        const allVisitors = await contract.getAllVisitors();
        console.log(
          "date",
          typeof allVisitors[0].date,
          Number(allVisitors[0].date)
        );

        const formattedVisitorData = allVisitors.map((visitors: any) => ({
          name: visitors.name,
          email: visitors.email,
          address: visitors.add,
          phone: visitors.phone,
          purpose: visitors.purpose,
          types: visitors.types,
          toMeet: visitors.toMeet,
          meetPersonEmail: visitors.meetPersonemail,
          date: moment(Number(visitors.date)),
        }));

        setVisitorData(formattedVisitorData);
        setFilteredData(formattedVisitorData); // Initially set filteredData to all visitor data
      } catch (error) {
        console.error("Error fetching visitor data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchName, searchTypes, searchToMeet]);

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await axios.get(
        `http://localhost:8001/visitorRouter/pagination?page=${currentPage + 1}&pageSize=${itemsPerPage}&name=${searchName}&types=${searchTypes}&toMeet=${searchToMeet}`
      );

      const { visitors } = response.data;
      setVisitorData(visitors);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching visitor data:", error);
      setLoading(false); // Set loading to false if an error occurs
    }
  };

  // Function to handle search by name
  const handleSearchNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchName(value);
    filterData(value, searchTypes, searchToMeet);
  };

  // Function to handle search by types
  const handleSearchTypesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTypes(value);
    filterData(searchName, value, searchToMeet);
  };

  // Function to handle search by toMeet
  const handleSearchToMeetChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchToMeet(value);
    filterData(searchName, searchTypes, value);
  };

  const filterData = async (name: string, types: string, toMeet: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8001/visitorRouter/filterdata",
        {
          name,
          types,
          toMeet,
        }
      );
      console.log("ResponseFilterData--", typeof response);
      if (Array.isArray(response.data)) {
        setFilteredData(response.data);
      } else if (
        response.data.filteredData &&
        Array.isArray(response.data.filteredData)
      ) {
        setFilteredData(response.data.filteredData);
      } else {
        // Convert the response data to an array
        const dataArray: Visitor[] = Object.values(response.data) as Visitor[];
        if (Array.isArray(dataArray)) {
          setFilteredData(dataArray);
        } else {
          console.log(
            "Unable to convert API response to array:",
            response.data
          );
          setFilteredData([]);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error filtering visitor data:", error);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem: number = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem: number = currentPage * itemsPerPage;
  const currentItems: Visitor[] = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="object-cover rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Visitor Details
      </h4>

      {/* Search Inputs */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={handleSearchNameChange}
          className="mr-2 px-2 py-1 border rounded border-gray-300 focus:outline-none focus:border-blue-500 "
        />
        <input
          type="text"
          placeholder="Search by visitor Types"
          value={searchTypes}
          onChange={handleSearchTypesChange}
          className="mr-2 px-2 py-1 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Search by To Meet"
          value={searchToMeet}
          onChange={handleSearchToMeetChange}
          className="mr-2 px-2 py-1 border rounded border-gray-300 focus:outline-none focus:border-gray-500"
        />{" "}
      </div>
      <div className="overflow-x-auto ">
        <table className="w-full bg-gray-200">
          {/* Table Headers */}
          <thead className="">
            <tr className="bg-blue-200 dark:bg-gray-900 text-black border-b border-black">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone No.</th>
              <th className="px-4 py-2">Purpose</th>
              <th className="px-4 py-2">Types</th>
              <th className="px-4 py-2">To Meet</th>
              <th className="px-4 py-2">Meet Person Email</th>
              <th className="px-4 py-2">Date Of Visiting</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {currentItems.map((visitor, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-bodydark2 px-4 py-2 text-black">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {visitor.name}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {visitor.address}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {visitor.email}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {visitor.phone}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {visitor.purpose}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {visitor.types}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {visitor.toMeet}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {visitor.meetPersonEmail}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {visitor.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName={"flex justify-left mt-8"}
        pageClassName={"px-3 py-1 border rounded border-gray-300 mr-2"}
        previousLinkClassName={"px-3 py-1  mr-2"}
        nextLinkClassName={"px-3 py-1  mr-2"}
        disabledClassName={"text-gray-500"}
        activeClassName={"text-white bg-black"}
        breakLabel={"..."}
        breakClassName={"px-3 py-1 mr-2"}
      />

      {/* Print table option  */}
      <div className="flex justify-end mb-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Print Table data
        </button>
      </div>
    </div>
  );
};

export default TableOne;
