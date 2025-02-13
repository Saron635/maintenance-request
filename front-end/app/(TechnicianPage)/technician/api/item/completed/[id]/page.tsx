"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import jwtDecode from "jwt-decode";
import { useRouter } from 'next/navigation';
// Define the interface for the JWT payload
interface DecodedToken {
  userId: string;
  username: string;
  role: string;
}
// Define the interface for technician data
interface TechnicianData {
  technicianName: string;
  technicianEmail: string;
  assignedAt: string;
}

export default function AssignedCompleted() {
  const pathname = usePathname();
  const [isTechnicianView, setIsTechnicianView] = useState(false);
  const [requestData, setRequestData] = useState<RequestData | null>(null);
  const [technicianData, setTechnicianData] = useState<TechnicianData | null>(null);
  const [employeeName, setEmployeeName] = useState<string>("");

  const [problemDetails, setProblemDetails] = useState<string>("");

  const showTechnicianView = () => {
    setIsTechnicianView(true);
  };
  const router = useRouter();
  const showRequestorView = () => {
    setIsTechnicianView(false);
  };

  
  const getTokenFromCookies = () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    const authTokenCookie = cookies.find((cookie) =>
      cookie.startsWith("authToken=")
    );
    return authTokenCookie ? authTokenCookie.split("=")[1] : null;
  };

  const handleSubmit = async () => {
    try {
      const token = getTokenFromCookies();
      const decodedToken = token ? jwtDecode<DecodedToken>(token) : null;

      if (decodedToken && technicianData) {
        const requestId = pathname.split('/').pop(); // Extract requestId from the URL
        const response = await fetch('http://localhost:3002/api/assignment/FillCompletionForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestId,
            technicianId: decodedToken.userId,
            detailOfProblem: problemDetails,
          }),
        });

        if (response.ok) {
          console.log('Maintenance request completed successfully');
           
      // Navigate to /technician/completed using Next.js router
      router.push('/technician/completed');
          setIsModalOpen(false); // Close the modal on success
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData);
        }
      } else {
        console.error('Technician data or token is missing');
      }
    } catch (error) {
      console.error('Error submitting problem details:', error);
    }
  };

  

  useEffect(() => {
  
    const token = getTokenFromCookies();

    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setEmployeeName(decodedToken.username);

      const fetchAssignmentData = async (requestId: string) => {
        try {
          const response = await fetch('http://localhost:3002/api/assignment/Technicaindata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requestId, technicianId: decodedToken.userId }), // Send both IDs
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          // Format the assignedAt date to YYYY-MM-DD
          const formattedDate = new Date(data.assignedAt).toISOString().split('T')[0];

          setTechnicianData({
            technicianName: data.technicianName,
            technicianEmail: data.technicianEmail,
            assignedAt: formattedDate, // Use the formatted date
          }); // Set the state with fetched data for technician view
        } catch (error) {
          console.error('Error fetching technician data:', error);
        }
      };

      const fetchMaintenanceData = async (requestId: string) => {
        try {
          const response = await fetch('http://localhost:3002/api/assignment/maintenancedata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requestId }), // Ensure requestId is correctly named
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setRequestData(data); // Set the state with fetched data
        } catch (error) {
          console.error('Error fetching maintenance request data:', error);
        }
      };

      const pathSegments = pathname.split('/');
      const assignedIndex = pathSegments.indexOf('completed');
      const requestId = assignedIndex !== -1 ? pathSegments[assignedIndex + 1] : null;

      if (requestId) {
        fetchMaintenanceData(requestId);

        // Assuming technicianId is also available from the path or another source

        fetchAssignmentData(requestId);

      }
    }
  }, [pathname]);
  if (technicianData && technicianData.technicianName) {
    console.log(technicianData.technicianName);
  } else {
    console.error('Technician data is missing or incomplete.');
  }


  return (
    <div className="flex items-center  p-4">
      <div className="bg-slate-400  rounded-lg shadow-lg p-4 sm:p-6 lg:p-8  w-full">


        {!isTechnicianView ? (
          <>
            <h2 className="text-3xl font-bold mb-4 text-center">Completed Request</h2>
            <p className="mb-4">You are Checking a completed maintainance request for <span className="font-bold">{requestData?.requester_name}</span>'s form</p>

            <div className="bg-slate-300 rounded-lg p-4">
              <div className="bottom-data">
                <div className="orders">
                  <div className="header flex items-center mb-4">
                    <i className="bx bx-receipt text-2xl"></i>
                    <h3 className="ml-3 text-xl font-bold">Checking Assignment</h3>
                  </div>

                  <form className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="RequesterName" className="block mb-1 font-medium">Requester Name</label>
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="RequesterName"
                          placeholder="Enter Requester Name"
                          value={requestData?.requester_name || ''}
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label htmlFor="Email" className="block mb-1 font-medium">Email</label>
                        <input
                          type="email"
                          className="border rounded-md px-3 py-2 w-full"
                          id="Email"
                          value={requestData?.email || ''}
                          placeholder="Enter Email"
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label htmlFor="DepartmentName" className="block mb-1 font-medium">Department Name</label>
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="DepartmentName"
                          value={requestData?.department.department_name || ''}
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label htmlFor="DeviceType" className="block mb-1 font-medium">Device Type</label>
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="DeviceType"
                          value={requestData?.device_type || ''}
                          placeholder="Enter Device Type"
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label htmlFor="Request_type" className="block mb-1 font-medium">Request_type</label>
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="Request_type"
                          value={requestData?.request_type || ''}
                          placeholder="Enter Request_type"
                          required
                          disabled
                        />
                      </div>
                      <div>
                        <label htmlFor="PhoneNo" className="block mb-1 font-medium">PhoneNo</label>
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="PhoneNo"
                          value={requestData?.phone_number || ''}
                          placeholder="Enter PhoneNo"
                          required
                          disabled
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label htmlFor="Description" className="block mb-1 font-medium">Description</label>
                        <textarea
                          className="border rounded-md px-3 py-2 w-full"
                          id="Description"
                          value={requestData?.description || ''}
                          placeholder="Enter Description"
                          required
                          disabled
                        ></textarea>
                      </div>
                      <div>
                        <label htmlFor="ModelNo" className="block mb-1 font-medium">Model No</label>
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="ModelNo"
                          value={requestData?.model_no || ''}
                          placeholder="Enter Model No"
                          required
                          disabled
                        />
                      </div>
                    </div>



                    <div className="flex justify-center mt-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mr-2"
                        onClick={showTechnicianView}
                      >
                        Technician View
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>


          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4 text-center">Technician Details</h2>
            <p className="mb-4">The technician details below are the work assigned for <span className="font-extrabold text-xl">{employeeName}</span>:</p>

            <div className="bg-slate-300 rounded-lg p-4">
              <form className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="TechnicianName" className="block mb-1 font-medium">Technician Name</label>
                    <input
                      type="text"
                      className="border rounded-md px-3 py-2 w-full"
                      id="TechnicianName"
                      value={technicianData?.technicianName || ''}
                      placeholder="Enter Technician Name"
                      required
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="TechnicianEmail" className="block mb-1 font-medium">Email</label>
                    <input
                      type="email"
                      className="border rounded-md px-3 py-2 w-full"
                      id="TechnicianEmail"
                      value={technicianData?.technicianEmail || ''}
                      placeholder="Enter Email"
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="RequestDate" className="block mb-1 font-medium">Request Date</label>
                    <input
                      type="date"
                      className="border rounded-md px-3 py-2 w-full"
                      id="RequestDate"
                      value={technicianData?.assignedAt || ''}
                      required
                      disabled
                    />
                  </div>
                </div>
                {/* <div className="flex justify-center mt-3">
                  <h1 className="text-center font-bold text-green-500">Completed</h1>
                </div> */}
                <div className="flex items-center justify-center">
                  <p className="text-green-500 font-extrabold text-2xl"> Completed Request</p>
                </div>

                <div className="flex justify-center mt-4 space-x-4">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                    onClick={showRequestorView}
                  >
                    Requestor View
                  </button>
               
                </div>
              </form>
            </div>


          </>
        )}
      </div>


    </div>
  )
}
