"use Client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TechnicianInfoComplitedjob } from "../(subsidebar)/data";

export default function FeedbackCards({ requests }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const requestToBeRendered = requests.slice(startIndex, endIndex);
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/dashboard/api/item/completed/${id}`);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requestToBeRendered.map((job, index) => (
            <div key={index} className="bg-slate-200 shadow-md rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-4 text-green-600 text-center">
                Rating: {job.EmployeeRating}/10
              </h2>
              <div className="grid grid-cols-2 gap-4 h-64 text-center">
                <div className="flex flex-col">
                  <span className="font-medium">Technician Name</span>
                  <span>{job.technicianName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Requestor Name</span>
                  <span>{job.requesterName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Given Date</span>
                  <span>{job.GivenDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Finished Date</span>
                  <span>{job.FinishedDate}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Comments:</p>
                <span className="ml-4">{job.Comments}</span>
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Employee Rating:</p>
                <span className="ml-4">{job.EmployeeRating}</span>
              </div>
              <div className="flex justify-end mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
                  onClick={() => handleClick(job.id)}
                >
                  More Details
                </button>
              </div>
            </div>
          ))}
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
    </>
  );
}
