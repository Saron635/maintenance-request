"use Client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TechnicianInfoComplitedjob } from "../(subsidebar)/data";

export default function CompletedCards({ requests }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const requestToBeRendered = requests.slice(startIndex, endIndex);
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/technician/api/item/completed/${id}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {requestToBeRendered.map((job, index) => (
          <div
            key={index}
            className="bg-slate-200 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-lg font-bold mb-4 text-green-600 text-center">
                Completed
              </h2>
              <div className="grid grid-cols-2 gap-4 h-64 text-center">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-600">
                    Technician Name
                  </span>
                  <span className="text-gray-800">{job.technicianName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-600">
                    Requestor Name
                  </span>
                  <span className="text-gray-800">{job.requesterName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-600">Given Date</span>
                  <span className="text-gray-800">{job.GivenDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-600">
                    Finished Date
                  </span>
                  <span className="text-gray-800">{job.FinishedDate}</span>
                </div>
              </div>
              <div className="flex flex-col text-center">
                <span className="font-medium text-gray-600">
                  Employee Rating
                </span>
                <span className="text-gray-800">{job.EmployeeRating}</span>
              </div>
              <div className="flex justify-end mt-4">
                <a
                  href="assign/item/completed"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
                  onClick={() => handleClick(job.id)}
                >
                  More Details
                </a>
              </div>
            </div>
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
}
