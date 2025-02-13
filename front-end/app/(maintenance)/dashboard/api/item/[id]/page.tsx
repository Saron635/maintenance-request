'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { TechnicianInfo, requestInformation } from '../../../(subsidebar)/data';
import { request } from 'http';
import { useRouter } from 'next/navigation';

export default function AssignId() {
  const pathname = usePathname();
  const idString = pathname.split('/').pop();
  const [reqInfo, setReqInfo] = useState<any>([]); // State to store the fetched data
  // const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(''); // State to handle error state
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (!idString) return;
    const id = parseInt(idString, 10);

    // Fetch the data for the specific item based on the ID

    axios
      .get(`http://localhost:3002/api/requests/getDetialOfPendingRequest/${id}`)
      .then((response) => {
        setReqInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert('Error');
        setError(error.message);
        // setLoading(false); // Change loading state to false when error is caught
        console.log(error);
      });
  }, [idString]);

  useEffect(() => {
    // Fetch the list of technicians and their workload
    axios
      .get(
        'http://localhost:3002/api/assignTechnician/getTechnicianWithWorkload'
      )
      .then((response) => {
        setTechnicians(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch technicians');
        console.error(error);
      });
  }, []);

  // if (loading) return <p>Loading...</p>; // Display loading state
  if (error) return <p>{error}</p>; // Display error message
  if (!reqInfo) return <p>Request Not Found.</p>; // Handle case where no data is found

  const handleAssignment = (id: Number) => {
    // e.preventDefault();
    const data = {
      requestId: reqInfo.request_id,
    };

    axios
      .post(
        `http://localhost:3002/api/assigningTechnician/technicianAssignedToTasks/${id}`,
        data
      )
      .then((response) => {
        alert('Task assigned successfully');
        router.push('/dashboard/assign/');
      })
      .catch((error) => {
        alert('Error assigning technician');
        console.error(error);
      });
  };

  // alert('Technician Assigned');

  return (
    <div className="flex  w-full p-4 bg-gray-100">
      <div className="bg-slate-300 rounded-lg shadow-lg p-6 sm:p-8 lg:p-10 w-full">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          Assign Technician
        </h2>
        <p className="mb-6 text-center text-gray-600">
          This form is for assigning a technician for maintenance
        </p>
        <p className="mb-6 text-center text-gray-700">
          You are assigning a technician for{' '}
          <span className="font-bold text-gray-800">
            {reqInfo.requester_name}
          </span>
          's Request
        </p>
        {/* The rest of your component stays the same */}
        <div className="bg-slate-200 rounded-lg p-6">
          <div className="bottom-data">
            <div className="orders">
              <div className="header flex items-center justify-center mb-6">
                <i className="bx bx-receipt text-3xl text-green-600"></i>
                <h3 className="ml-3 text-2xl font-semibold text-gray-800">
                  View Request
                </h3>
                err
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="RequesterName"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Requestor Name
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                      id="RequesterName"
                      defaultValue={reqInfo.requester_name}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Email"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                      id="Email"
                      name="Email"
                      defaultValue={reqInfo.email}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="PhoneNo"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Phone No
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                      id="PhoneNo"
                      defaultValue={reqInfo.phone_number}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="DeviceType"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Device Type
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                      id="DeviceType"
                      defaultValue={reqInfo.device_type}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="RequestType"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Request Type
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                      id="RequestType"
                      defaultValue={reqInfo.request_type}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Department"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                      id="Department"
                      name="Department"
                      defaultValue={
                        reqInfo.department?.department_name ?? 'N/A'
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="Description"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      className="border-gray-300 rounded-md px-4 py-3 w-full h-32 focus:outline-none focus:ring-2 focus:ring-green-600"
                      id="Description"
                      defaultValue={reqInfo.description}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="ModelNo"
                      className="block mb-2 font-semibold text-gray-700"
                    >
                      Model No
                    </label>
                    <input
                      type="text"
                      className="border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                      id="ModelNo"
                      name="ModelNo"
                      defaultValue={reqInfo.model_no}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="Urgency"
                    className="block mb-2 font-semibold text-gray-700"
                  >
                    Urgency
                  </label>
                  <input
                    type="text"
                    className="border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                    id="Urgency"
                    name="Urgency"
                    defaultValue={reqInfo.priority}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <p className="text-gray-500">
                    ==================================
                  </p>
                </div>
                <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
                  Technician's Info
                </h2>
                <div>
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-2 px-4">Technician Name</th>
                        <th className="py-2 px-4">Work Load</th>
                        <th className="py-2 px-4">Assignment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {technicians.map((technician: any, index) => (
                        <tr key={index}>
                          <td className="py-2 px-7 text-center">
                            {technician.username}
                          </td>
                          <td className="py-2 px-4 text-center">
                            <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-colors">
                              {technician.totalWorkload}
                            </button>
                            {/* <button className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-colors">
                              {technician.workLoad.pending.length}
                            </button> */}
                          </td>
                          <td className="py-2 px-4 text-center">
                            <button
                              type="button"
                              onClick={(e) =>
                                handleAssignment(technician.user_id)
                              }
                              className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
                            >
                              Assign
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-6 space-x-4"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
