"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TechnicianInfo, requestInformation } from "../../../(subsidebar)/data";

export default function AssignId() {
  const pathname = usePathname();
  const idString = pathname.split("/").pop();
  if (!idString) return <p>Request Not Found.</p>;
  const id = parseInt(idString, 10);

  // Fetch the data for the specific item based on the ID
  //  const item = TechnicianInfo.find((info) => info.id === parseInt(id as string))
  const reqInfo = requestInformation.find((req) => req.id === id);

  if (!reqInfo) {
    return <p>Request Not Found.</p>;
  }

  const handleAssignment = () => {
    // we insert backend logic for Assignment of the request here
    alert("Technician Assigned");
  };
  const handleDoLatter = () => {
    // we insert backend logic for do latter table of the request here
    alert("Dude Later");
  };

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
          You are assigning a technician for{" "}
          <span className="font-bold text-gray-800">
            {reqInfo.requesterName}
          </span>
          's Request?
        </p>
        <div className="bg-slate-200 rounded-lg p-6">
          <div className="bottom-data">
            <div className="orders">
              <div className="header flex items-center justify-center mb-6">
                <i className="bx bx-receipt text-3xl text-green-600"></i>
                <h3 className="ml-3 text-2xl font-semibold text-gray-800">
                  View Request
                </h3>
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
                      defaultValue={reqInfo.requesterName}
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
                      defaultValue={reqInfo.phoneNo}
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
                      defaultValue={reqInfo.deviceType}
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
                      defaultValue={reqInfo.requestType}
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
                      defaultValue={reqInfo.department}
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
                      defaultValue={reqInfo.modelNo}
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
                    defaultValue={reqInfo.Urgency}
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
                      {TechnicianInfo.map((technician, index) => (
                        <tr key={index}>
                          <td className="py-2 px-7 text-center">
                            {technician.technicianName}
                          </td>
                          <td className="py-2 px-4 text-center">
                            <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-colors">
                              {technician.workLoad.finished.length}
                            </button>
                            <button className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-colors">
                              {technician.workLoad.pending.length}
                            </button>
                          </td>
                          <td className="py-2 px-4 text-center">
                            <button
                              type="submit"
                              onClick={handleAssignment}
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
                <div className="flex justify-center mt-6 space-x-4">
                  <a
                    href="/do_latter"
                    onClick={handleDoLatter}
                    className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Do Later
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
