'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Table = ({ requests }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleClick = (status: string, id: number) => {
    if (status === 'Completed') {
      router.push(`/technician/api/item/completed/${id}`);
    } else if (status === 'Assigned') {
      router.push(`/technician/api/item/Assigned/${id}`);
    }
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
    <div className="p-6 overflow-x-auto">
  <div className="bg-slate-200 shadow-md rounded-lg p-6 overflow-x-auto scrollbar-thin scrollbar-thumb scrollbar-track scrollbar-rounded min-w-full">
    <table className="w-full min-w-max table-auto border-collapse">
      <thead className="bg-gray-300">
        <tr className="rounded">
          <th className="p-3 text-left border border-gray-400">Requester Name</th>
          <th className="p-3 text-left border border-gray-400">Email</th>
          <th className="p-3 text-left border border-gray-400">Phone No</th>
          <th className="p-3 text-left border border-gray-400">Problem</th>
          <th className="p-3 text-left border border-gray-400">Description</th>
          <th className="p-3 text-left border border-gray-400">Department</th>
          <th className="p-3 text-left border border-gray-400">Device Type</th>
          <th className="p-3 text-left border border-gray-400">Model No</th>
          <th className="p-3 text-left border border-gray-400">Urgency</th>
          <th className="p-3 text-left border border-gray-400">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {requestToBeRendered.map((request, index) => (
          <tr key={index}>
            <td className="p-3 border border-gray-400">{request.requester_name}</td>
            <td className="p-3 border border-gray-400">{request.email}</td>
            <td className="p-3 border border-gray-400">{request.phone_number}</td>
            <td className="p-3 capitalize border border-gray-400">{request.request_type}</td>
            <td className="p-3 border border-gray-400">{request.description}</td>
            <td className="p-3 capitalize border border-gray-400">
              {request.department.department_name}
            </td>
            <td className="p-3 border border-gray-400">{request.device_type}</td>
            <td className="p-3 border border-gray-400">{request.model_no}</td>
            <td className="p-3 capitalize border border-gray-400">{request.priority}</td>
            <td className="p-3 border border-gray-400">
              <button
                type="button"
                className={`font-bold py-2 px-4 rounded-xl mt-4 ${
                  request.status === 'Completed'
                    ? 'bg-green-500 hover:bg-green-700'
                    : request.status === 'Assigned'
                    ? 'bg-yellow-500 hover:bg-yellow-700'
                    : ''
                }`}
                onClick={() =>
                  handleClick(request.status, request.request_id)
                }
              >
                {request.status === 'Assigned'
                  ? 'Pending'
                  : request.status === 'Completed'
                  ? 'Completed'
                  : ''}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination controls */}
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
