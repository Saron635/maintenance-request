'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function CompletedCards({ requests }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const requestToBeRendered = requests.slice(startIndex, endIndex);
  const router = useRouter();

  const handleClick = (id: number) => {
    // router.push(`/dashboard/api/item/completed/${id}`);
    router.push(`/dashboard/api/item/${id}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requestToBeRendered.map((job, index) => (
          <div
            key={index}
            className=" cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div className="p-4">
              <h2 className="text-sm font-bold mb-2 text-green-600 text-center">
                Completed
              </h2>
              <div className="grid grid-cols-2 gap-2 text-center text-sm">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-600 text-xs">
                    Technician Name
                  </span>
                  <span className="text-gray-800">
                    {job.Technician.username}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-600 text-xs">
                    Requestor Name
                  </span>
                  <span className="text-gray-800">
                    {job.feedbackRecived.user.username}
                  </span>
                </div>
                {/* <div className="flex flex-col">
                  <span className="font-medium text-gray-600 text-xs">
                    Given Date
                  </span>
                  <span className="text-gray-800">{job.GivenDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-600 text-xs">
                    Finished Date
                  </span>
                  <span className="text-gray-800">{job.FinishedDate}</span>
                </div> */}
              </div>
              {/* <div className="flex flex-col text-center mt-2 text-sm">
                <span className="font-medium text-gray-600 text-xs">
                  Employee Rating
                </span>
                <span className="text-gray-800">{job.EmployeeRating}</span>
              </div> */}
              <div className="flex justify-end mt-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-lg text-xs"
                  onClick={() => handleClick(job.request_id)}
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4 space-x-1">
        <button
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-xs"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded text-xs ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-800 text-xs"
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
