'use client';

// import { Button } from '@/components/ui/button';

import React, { useState } from 'react';
// import { requestInformation } from '../(subsidebar)/data';
import { useRouter } from 'next/navigation';

const Table = ({ requests }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/dashboard/api/item/${id}`);
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
    <div className="p-6 overflow-x-auto ">
      <div className="bg-slate-200 shadow-md rounded-lg p-6 overflow-x-auto scrollbar-thin scrollbar-thumb scrollbar-track scrollbar-rounded min-w-full">
        <table className="w-full min-w-max">
          <thead>
            <tr className=" rounded">
              <th className="p-3 text-center">Requester Name</th>
              <th className="p-3 text-center">Problem</th>
              <th className="p-3 text-center">Department</th>
              <th className="p-3 text-center">Device Type</th>
              <th className="p-3 text-center m-4">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requestToBeRendered.map((request, index) => (
              <tr key={index}>
                <td className="p-3 text-center">{request.requester_name}</td>
                <td className="p-3 capitalize text-center">{request.request_type}</td>
                <td className="p-3 capitalize text-center">
                  {request.department
                    ? request.department.department_name
                    : 'N/A'}
                </td>
                <td className="p-3 text-center">{request.device_type}</td>
                <td
                  className="font-bold text-center text-yellow-700  rounded-xl 
                  
                    "
                >
                  {request.status}
                </td>
                <td className='text-center'>
                  <button
                    type="button"
                    className="font-bold py-2 px-4 rounded-xl mt-4 text-center
                    bg-green-700 
                    "
                    onClick={() => handleClick(request.request_id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
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
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
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
