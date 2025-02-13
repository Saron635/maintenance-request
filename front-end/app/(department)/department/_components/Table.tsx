"use Client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Table = ({ requests }) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const requestToBeRendered = requests.slice(startIndex, endIndex);

  const handleButtonClick = (request_id: Number) => {
    router.push(`/department/api/statusId/${request_id}`);
  };

  return (
    <div>
      <div className="shadow-md rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-center">Requester Name</th>
                {/* <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone Number</th> */}
                <th className="py-2 px-4 text-center">Request Type</th>
                {/* <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Device Type</th> */}
                {/* <th className="py-2 px-4">Model Number</th> */}
                <th className="py-2 px-4 text-center">Urgency</th>
                {/* <th className="py-2 px-4"> Other Request Type</th> */}
                <th className="py-2 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {requestToBeRendered.map((request, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-center">{request.requester_name}</td>
                  {/* <td className="py-2 px-4">{request.email}</td>
                  <td className="py-2 px-4 ">{request.phone_number}</td> */}
                  <td className="py-2 px-4 text-center">{request.request_type}</td>
                  {/* <td className="py-2 px-4">{request.description}</td>
                  <td className="py-2 px-4">{request.device_type}</td> */}
                  {/* <td className="py-2 px-4">{request.model_no}</td> */}
                  <td className="py-2 px-4 text-center">{request.priority}</td>
                  {/* <td className="py-2 px-4">{request.other_request_type}</td> */}
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleButtonClick(request.request_id)}
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full 
                       hover:shadow-lg ${
                         request.status === "Pending"
                           ? "bg-green-200 text-green-800"
                           : request.status === "Rejected"
                           ? "bg-red-200 text-red-800"
                           : "bg-yellow-200 text-yellow-800"
                       }`}
                    >
                      {request.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800"
          onClick={() =>
            setCurrentPage((next) => Math.min(next + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
