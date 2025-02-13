import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Card = ({ requests }) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const requestToBeRendered = requests.slice(startIndex, endIndex);

  const handleClick = (request_id: Number) => {
    router.push(`/department/api/statusId/${request_id}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4 overflow-auto max-h-[80vh] ">
        {requestToBeRendered.map((request, index) => (
          <div
            key={index}
            onClick={() => handleClick(request.request_id)}
            className="cursor-pointer bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 hover:bg-gray-100 transform hover:shadow-lg transition-transform hover:-translate-y-1 max-w-full overflow-hidden"
          >
            <h2 className="text-xl font-bold mb-2 truncate">{request.requester_name}</h2>
            <p className="text-base overflow-wrap break-word">
              <strong>Email:</strong> {request.email}
            </p>
            <p className="text-base overflow-wrap break-word">
              <strong>Phone Number:</strong> {request.phone_number}
            </p>
            <p className="text-base overflow-wrap break-word">
              <strong>Request Type:</strong> {request.request_type}
            </p>
            <p className="text-base overflow-wrap break-word">
              <strong>Description:</strong> {request.description}
            </p>
            <p className="text-base overflow-wrap break-word">
              <strong>Department:</strong> {request.department}
            </p>
            <p className="text-base overflow-wrap break-word">
              <strong>Device Type:</strong> {request.device_type}
            </p>
            <p className="text-base overflow-wrap break-word">
              <strong>Model Number:</strong> {request.model_no}
            </p>
            <p className="text-base overflow-wrap break-word">
              <strong>Urgency:</strong> {request.priority}
            </p>
            <div
              className={`inline-block px-2 py-1 mt-2 text-sm font-semibold rounded-full ${request.status === 'Pending'
                  ? 'bg-green-200 text-green-800'
                  : request.status === 'Rejected'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-yellow-200 text-yellow-800'
                }`}
            >
              {request.status}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
                }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((next) => Math.min(next + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Card;
