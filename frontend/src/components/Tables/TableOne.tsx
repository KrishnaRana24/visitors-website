"use client";
import { useEffect, useState } from "react";
import { JsonRpcProvider, ethers } from "ethers";
import ReactPaginate from "react-paginate";

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

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items to display per page
  const [searchName, setSearchName] = useState("");
  const [searchTypes, setSearchTypes] = useState("");
  const [searchToMeet, setSearchToMeet] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new JsonRpcProvider("http://127.0.0.1:7545");
        const contractJson = require("/public/contracts/VisitorAuth.json"); // Ensure the path is correct

        const contract = new ethers.Contract(
          "0x008e94D6D6282575b55e5d464B55d595C8140449", // Contract address
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
          date: Number(visitors.date) * 1000, // Convert Unix timestamp to JavaScript date
        }));

        setVisitorData(formattedVisitorData);
        console.log("Fetched visitor data:", formattedVisitorData);
      } catch (error) {
        console.error("Error fetching visitor data:", error);
      }
    };

    fetchData();
  }, []);

  // Change page
  const handlePageChange = ({ selected }: { selected: number }) =>
    setCurrentPage(selected);

  const filteredData = visitorData.filter((visitor) => {
    return (
      visitor.name.toLowerCase().includes(searchName.toLowerCase()) &&
      visitor.types.toLowerCase().includes(searchTypes.toLowerCase()) &&
      visitor.toMeet.toLowerCase().includes(searchToMeet.toLowerCase())
    );
  });

  console.log("filterData", filteredData);

  // Logic to calculate the index of the first and last item of the current page
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="object-cover rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Visitor Details
      </h4>
      {/* Search Inputs */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by visitor Name"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          className="mr-2 px-2 py-1 border rounded border-gray-300 "
        />
        <input
          type="text"
          placeholder="Search by visitor Types"
          value={searchTypes}
          onChange={(e) => {
            setSearchTypes(e.target.value);
          }}
          className="mr-2 px-2 py-1 border rounded border-gray-300"
        />
        <input
          type="text"
          placeholder="Search by To Meet"
          value={searchToMeet}
          onChange={(e) => {
            setSearchToMeet(e.target.value);
          }}
          className="mr-2 px-2 py-1 border rounded border-gray-300"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Headers */}
          <thead>
            <tr className="bg-blue-200 dark:bg-gray-800 text-black">
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
    </div>
  );
};

export default TableOne;
