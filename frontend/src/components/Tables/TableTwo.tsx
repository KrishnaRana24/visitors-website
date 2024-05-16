"use client";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

interface Reviews {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

const TableTwo = () => {
  const [reviewData, setReviewData] = useState<Reviews[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [searchName, setSearchName] = useState("");
  const [filteredData, setFilteredData] = useState<Reviews[]>([]);
  //   const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/review/getReview"
        );

        if (Array.isArray(response.data.data)) {
          setReviewData(response.data.data);
          setFilteredData(response.data.data); // Make sure to set filteredData as well
          console.log("Review data:", response.data.data);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching Review data:", error);
      }
    };

    fetchReviewData();
  }, []);

  useEffect(() => {
    const filteredResults = reviewData.filter((review) =>
      review.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [searchName, reviewData]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem: number = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem: number = currentPage * itemsPerPage;

  if (!Array.isArray(filteredData)) {
    console.error("filteredData is not an array:", filteredData);
    return null; // or handle this error condition appropriately
  }

  const currentItems: Reviews[] = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const preparePrintableContent = () => {
    const printableContent = `
      <html>
        <head>
          <title>Review Details</title>
          <style>
            
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Review Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Comment</th>
             
              </tr>
            </thead>
            <tbody>
              ${reviewData.map(
                (review, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${review.name}</td>
                    <td>${review.email}</td>
                    <td>${review.rating}</td>
                    <td>${review.comment}</td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </body>
      </html>
    `;
    return printableContent;
  };

  // Function to handle printing
  const handlePrint = () => {
    const content = preparePrintableContent();
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error("Unable to open print window.");
    }
  };

  return (
    <div className="object-cover rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Review Details
      </h4>

      {/* Search Inputs */}
      <div className="flex mb-4">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search by name"
          className="mr-2 px-2 py-1 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="overflow-x-auto ">
        <table className="w-full bg-gray-200 border border-gray-200">
          {/* Table Headers */}
          <thead className="">
            <tr className="bg-blue-200 border border-bodydark2 px-4 py-2 text-black">
              <th className="border border-bodydark2 px-4 py-2">ID</th>
              <th className="border border-bodydark2 px-4 py-2">Name</th>
              <th className="border border-bodydark2 px-4 py-2">Email</th>
              <th className="border border-bodydark2 px-4 py-2">Rating</th>
              <th className="border border-bodydark2 px-4 py-2">Comment</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {currentItems.map((review, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-bodydark2 px-4 py-2 text-black">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {review.name}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {review.email}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {review.rating}
                </td>
                <td className="border  border-bodydark2 px-4 py-2 text-black">
                  {review.comment}
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
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Print Table data
        </button>
      </div>
    </div>
  );
};

export default TableTwo;
