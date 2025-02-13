'use client';

import { Button } from '@/components/ui/button';

import React, { useState } from 'react';
// import { requestInformation } from '../(subsidebar)/data';
import { useRouter } from 'next/navigation';

// const [isModalOpen, setIsModalOpen] = useState(false);
// const router = useRouter();

// const handleClick = (id: number) => {
//   router.push(`/dashboard/api/item/completed/${id}`);
// };

// const [currentPage, setCurrentPage] = useState(1);
// const itemsPerPage = 10;
// const totalPages = Math.ceil(requests.length / itemsPerPage);

// const startIndex = (currentPage - 1) * itemsPerPage;
// const endIndex = startIndex + itemsPerPage;
// const requestToBeRendered = requests.slice(startIndex, endIndex);

const CompletedTable = ({ requests }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // const handleClick = (id: number) => {
  //   router.push(`/dashboard/api/item/completed/${id}`);
  // };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const requestToBeRendered = requests.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-5 text-left text-sm font-semibold">
              Technician Name
            </th>
            <th className="py-3 px-5 text-left text-sm font-semibold">
              Finished At
            </th>
            <th className="py-3 px-5 text-left text-sm font-semibold">
              Given At
            </th>
            <th className="py-3 px-5 text-left text-sm font-semibold">
              Problem Details
            </th>
            <th className="py-3 px-5 text-left text-sm font-semibold">
              Employee Name
            </th>
            <th className="py-3 px-5 text-left text-sm font-semibold">
              Employee Rating
            </th>
            <th className="py-3 px-5 text-left text-sm font-semibold">
              Employee Comment
            </th>
          </tr>
        </thead>
        <tbody>
          {requestToBeRendered.length > 0 ? (
            requests.map((request, index) => (
              <tr
                key={request.confirmation_id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                } hover:bg-gray-300 transition duration-150`}
              >
                <td className="py-3 px-5 text-sm font-medium">
                  {request.Technician.username}
                </td>
                <td className="py-3 px-5 text-sm">
                  {new Date(request.finished_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-5 text-sm">
                  {new Date(request.given_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-5 text-sm">
                  {request.detail_of_problem}
                </td>
                <td className="py-3 px-5 text-sm">
                  {request.feedbackRecived
                    ? request.feedbackRecived.user.username
                    : 'N/A'}
                </td>
                <td className="py-3 px-5 text-sm">
                  {request.feedbackRecived
                    ? request.feedbackRecived.rating
                    : 'N/A'}
                </td>
                <td className="py-3 px-5 text-sm">
                  {request.feedbackRecived
                    ? request.feedbackRecived.comments
                    : 'N/A'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                col-Span="5"
                className="py-4 text-center text-sm text-gray-500"
              >
                No completed tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

export default CompletedTable;
