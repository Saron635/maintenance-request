"use client"
import { Button } from "@/components/ui/button";

import React, { useState } from 'react';
import { requestInformation} from "../data";

export default function AssignedPendingView() {

  // State to control which view to show in the modal
 const [isTechnicianView, setIsTechnicianView] = useState(false);

  const showTechnicianView = () => {
    setIsTechnicianView(true);
  };
 
  const showRequestorView = () => {
    setIsTechnicianView(false);
  };
  return (
    <div className="flex items-center  p-4">
      <div className="bg-slate-400 rounded-lg shadow-lg p-4 sm:p-6 lg:p-8  w-full">
       

        {!isTechnicianView ? (
          <>
            <h2 className="text-3xl font-bold mb-4 text-center">Assign & Pending Form</h2>
            <p className="mb-4">This form is for assigning a technician for maintenance.</p>
            <p className="mb-4">You are assigning a technician for <span className="font-bold">John Doe</span>'s request?</p>

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
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="Email" className="block mb-1 font-medium">Email</label>
                        <input
                          type="email"
                          className="border rounded-md px-3 py-2 w-full"
                          id="Email"
                          placeholder="Enter Email"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label htmlFor="DepartmentCode" className="block mb-1 font-medium">Department Code</label>
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="DepartmentCode"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="DeviceType" className="block mb-1 font-medium">Device Type</label>
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="DeviceType"
                          placeholder="Enter Device Type"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label htmlFor="Problem" className="block mb-1 font-medium">Problem</label>
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="Problem"
                          placeholder="Enter Problem"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="Department" className="block mb-1 font-medium">Department</label>
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="Department"
                          placeholder="Enter Department"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label htmlFor="Description" className="block mb-1 font-medium">Description</label>
                        <textarea
                          className="border rounded-md px-3 py-2 w-full"
                          id="Description"
                          placeholder="Enter Description"
                          required
                        ></textarea>
                      </div>
                      <div>
                        <label htmlFor="ModelNo" className="block mb-1 font-medium">Model No</label>
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="ModelNo"
                          placeholder="Enter Model No"
                          required
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
            <p className="mb-4">Enter technician details below:</p>

            <div className="bg-slate-300 rounded-lg p-4">
              <form className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="TechnicianName" className="block mb-1 font-medium">Technician Name</label>
                    <input
                      type="text"
                      className="border rounded-md px-3 py-2 w-full"
                      id="TechnicianName"
                      placeholder="Enter Technician Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="TechnicianEmail" className="block mb-1 font-medium">Email</label>
                    <input
                      type="email"
                      className="border rounded-md px-3 py-2 w-full"
                      id="TechnicianEmail"
                      placeholder="Enter Email"
                      required
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
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-3">
                  <h1 className="text-center font-bold ">Pending</h1>
                </div>

                <div className="flex justify-center mt-4">
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
