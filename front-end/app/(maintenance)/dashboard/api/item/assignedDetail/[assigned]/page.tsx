'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';

const RequestDetails = () => {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const pathname = usePathname();
  const idString = pathname.split('/').pop();

  useEffect(() => {
    if (!idString) return;
    const id = parseInt(idString, 10);

    if (id) {
      axios
        .get(
          `http://localhost:3002/api/assigningTechnician/singleRequestDetailWithTechnician/${id}`
        )
        .then((res) => {
          setRequest(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to load request details.');
          setLoading(false);
        });
    }
  }, [idString]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!request) {
    return (
      <div className="p-6 text-center text-gray-500">No request found.</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Request Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <strong className="block font-semibold text-gray-700">
            Requester:
          </strong>{' '}
          {request.requester_name}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <strong className="block font-semibold text-gray-700">Email:</strong>{' '}
          {request.email}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <strong className="block font-semibold text-gray-700">
            Device Type:
          </strong>{' '}
          {request.device_type}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <strong className="block font-semibold text-gray-700">
            Model No:
          </strong>{' '}
          {request.model_no}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <strong className="block font-semibold text-gray-700">Status:</strong>{' '}
          {request.status}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <strong className="block font-semibold text-gray-700">
            Description:
          </strong>{' '}
          {request.description}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <strong className="block font-semibold text-gray-700">
            Priority:
          </strong>{' '}
          {request.priority}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <strong className="block font-semibold text-gray-700">
            Phone Number:
          </strong>{' '}
          {request.phone_number}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <strong className="block font-semibold text-gray-700">
            Created At:
          </strong>{' '}
          {new Date(request.created_at).toLocaleString()}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <strong className="block font-semibold text-gray-700">
            Updated At:
          </strong>{' '}
          {new Date(request.updated_at).toLocaleString()}
        </div>
      </div>

      {/* Assignment Details */}
      {/* {request.assignments && (
        <>
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-green-600">
            Assignment Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <strong className="block font-semibold text-gray-700">
                Assigned Technician:
              </strong>{' '}
              {request.assignments.technician_name}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <strong className="block font-semibold text-gray-700">
                Assignment Status:
              </strong>{' '}
              {request.assignments.status}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <strong className="block font-semibold text-gray-700">
                Assigned Date:
              </strong>{' '}
              {new Date(request.assignments.assigned_at).toLocaleString()}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <strong className="block font-semibold text-gray-700">
                Workload:
              </strong>{' '}
              {request.assignments.work_load}
            </div>
          </div>
        </>
      )} */}
      {request.Assignments && request.Assignments.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-green-600">
            Assignment Details
          </h2>
          <div className="">
            {request.Assignments.map((assignment) => (
              <div
                key={assignment.assignment_id}
                className="bg-gray-100 p-4 rounded-lg shadow-sm  grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <div className="flex flex-row gap-2">
                  <strong className="flex font-semibold text-gray-700">
                    Assigned To Technician:
                  </strong>
                  {assignment.technician_name || 'N/A'}
                </div>
                <div className="flex flex-row gap-2">
                  <strong className="flex font-semibold text-gray-700">
                    Assignment Status:
                  </strong>
                  {assignment.completed ? 'Completed' : 'Assigned'}
                </div>
                <div className="flex flex-row gap-2">
                  <strong className="flex font-semibold text-gray-700">
                    Assigned Date:
                  </strong>
                  {new Date(assignment.assigned_at).toLocaleString()}
                </div>
                <div className="flex flex-row gap-2">
                  <strong className="flex font-semibold text-gray-700">
                    Workload:
                  </strong>
                  {assignment.work_load}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RequestDetails;
