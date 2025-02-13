"use client";

import { Button } from "@/components/ui/button";

import React, { useState } from 'react';
import { requestInformation } from '../(subsidebar)/data'
import { useRouter } from "next/navigation";


const CompletedTable = ({ requests }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleClick = (id: number) => {
      router.push(`/technician/api/item/completed/${id}`);
    };
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(requests.length / itemsPerPage);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const requestToBeRendered = requests.slice(startIndex, endIndex);

  const showAssignForm = () => {
    setIsModalOpen(true);
  };

  const hideAssignForm = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="p-6 space-y-6">
    <div className="bg-slate-200 shadow-md rounded-lg p-6 overflow-x-auto scrollbar-thin scrollbar-thumb scrollbar-track scrollbar-rounded">
        <table className="w-full min-w-max">
          <thead className="bg-slate-300 rounded-lg ">
            <tr className=" rounded">
              <th className="p-3 text-left">Requester Name</th>
              <th className="p-3 text-left">technician Name</th>
              <th className="p-3 text-left">Given Date</th>
              <th className="p-3 text-left">Finished Date</th>
              <th className="p-3 text-left">Employee Rating</th>
              <th className="p-3 text-left">Comments</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
          {requestToBeRendered.map((request, index) => (
            <tr key={index} className="bg-white">
              <td className="p-3">{request.technicianName}</td>
              <td className="p-3">{request.requesterName}</td>
              <td className="p-3">{request.GivenDate}</td>
              <td className="p-3 capitalize">{request.FinishedDate}</td>
              <td className="p-3">{request.EmployeeRating}</td>
              <td className="p-3">{request.Comments}</td>
              <td className="p-3">
                
              <button
                type="button"
                className={`font-bold py-2 px-4 rounded-xl mt-4 bg-blue-500 hover:bg-blue-700`}
                onClick={() => handleClick(request.id)}
              >
                    Details
              </button>

            
              </td>
            </tr>
          ))}
        </tbody>

         
        </table>
    
       
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

export default CompletedTable;
