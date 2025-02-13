"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Card = ({ requests }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const requestToBeRendered = requests.slice(startIndex, endIndex);
  const router = useRouter();

  const handleClick = (status: string, id: number) => {
    if (status === "Completed") {
      router.push(`/technician/api/item/completed/${id}`);
    } else if (status === "Assigned") {
      router.push(`/technician/api/item/Assigned/${id}`);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
        {requestToBeRendered.map((request, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
            onClick={() => handleClick(request.status, request.request_id)}
          >
            <h2 className="text-xl font-bold mb-2">{request.requester_name}</h2>
            <p>
              <strong>Request type:</strong> {request.request_type}
            </p>
            <p>
              <strong>Description:</strong> {request.description}
            </p>

            <span
              className={`inline-block px-2 py-1 mt-2 text-xs font-semibold rounded-full ${
                request.priority === "Low"
                  ? "bg-green-200 text-green-800"
                  : request.priority === "High"
                  ? "bg-red-200 text-red-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {request.priority}
            </span>
          </div>
        ))}
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
    </>
  );
};

export default Card;
