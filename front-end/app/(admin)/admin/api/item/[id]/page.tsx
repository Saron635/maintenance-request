"use client";
import { Navbar } from "../../../_componenets/AdminComp/navbar";
import { Sidebar } from "../../../_componenets/AdminComp/sidbar";
import React, { useState } from "react";
import { requests } from "../../../data";
import { usePathname } from "next/navigation";

export default function AssignedCompleted() {
  const pathname = usePathname();
  const idString = pathname.split("/").pop();
  if (!idString) return <p>Request Not Found.</p>;
  const id = parseInt(idString, 10);

  // Fetch the data for the specific item based on the ID
  //  const item = TechnicianInfo.find((info) => info.id === parseInt(id as string))
  const reqInfo = requests.find((req) => req.id === id);

  if (!reqInfo) {
    return <p>Request Not Found.</p>;
  }

  const [isTechnicianView, setIsTechnicianView] = useState(false);

  const showTechnicianView = () => {
    setIsTechnicianView(true);
  };

  const showRequestorView = () => {
    setIsTechnicianView(false);
  };
  return (
    <div className="">
      {/* Nav */}
      <div className="h-[80px] md:pl-60 fixed inset-y-0 w-full  top-0 z-50">
        <Navbar />
      </div>
      {/* Side */}
      <div className="hidden md:flex h-full w-56 flex-col fixed top-0 inset-y-0 z-40 ml-4">
        <Sidebar />
      </div>
      <main className="pt-[100px] md:pl-60 ">
        <div className="bg-slate-400  rounded-lg shadow-lg p-4 sm:p-6 lg:p-8  w-full ">
          {!isTechnicianView ? (
            <>
              <h2 className="text-3xl font-bold mb-4 text-center">
                completed & Feedback Form
              </h2>
              <p className="mb-4">
                This form is for for giving feedback to the technician on the
                maintenance job.
              </p>
              <p className="mb-4">
                You are assigning a technician for{" "}
                <span className="font-bold">{reqInfo.requesterName}</span>'s
                request?
              </p>

              <div className="bg-slate-300 rounded-lg p-4">
                <div className="bottom-data">
                  <div className="orders">
                    <div className="header flex items-center mb-4">
                      <i className="bx bx-receipt text-2xl"></i>
                      <h3 className="ml-3 text-xl font-bold">
                        Checking Assignment
                      </h3>
                    </div>

                    <form className="mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="RequesterName"
                            className="block mb-1 font-medium"
                          >
                            Requester Name
                          </label>
                          <input
                            type="text"
                            className="border rounded-md px-3 py-2 w-full"
                            id="RequesterName"
                            defaultValue={reqInfo.requesterName}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="Email"
                            className="block mb-1 font-medium"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="border rounded-md px-3 py-2 w-full"
                            id="Email"
                            defaultValue={reqInfo.email}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label
                            htmlFor="PhoneNo"
                            className="block mb-1 font-medium"
                          >
                            Phone No
                          </label>
                          <input
                            type="text"
                            className="border rounded-md px-3 py-2 w-full"
                            defaultValue={reqInfo.phoneNo}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="DeviceType"
                            className="block mb-1 font-medium"
                          >
                            Device Type
                          </label>
                          <input
                            type="text"
                            className="border rounded-md px-3 py-2 w-full"
                            id="DeviceType"
                            defaultValue={reqInfo.deviceType}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label
                            htmlFor="RequestType"
                            className="block mb-1 font-medium"
                          >
                            Request Type
                          </label>
                          <input
                            type="text"
                            className="border rounded-md px-3 py-2 w-full"
                            id="RequestType"
                            defaultValue={reqInfo.requestType}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="Department"
                            className="block mb-1 font-medium"
                          >
                            Department
                          </label>
                          <input
                            type="text"
                            className="border rounded-md px-3 py-2 w-full"
                            id="Department"
                            defaultValue={reqInfo.department}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label
                            htmlFor="Description"
                            className="block mb-1 font-medium"
                          >
                            Description
                          </label>
                          <textarea
                            className="border rounded-md px-3 py-2 w-full"
                            id="Description"
                            defaultValue={reqInfo.description}
                            required
                          ></textarea>
                        </div>
                        <div>
                          <label
                            htmlFor="ModelNo"
                            className="block mb-1 font-medium"
                          >
                            Model No
                          </label>
                          <input
                            type="text"
                            className="border rounded-md px-3 py-2 w-full"
                            id="ModelNo"
                            defaultValue={reqInfo.modelNo}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mr-2"
                          onClick={showTechnicianView}
                        >
                          Feed Back
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4 text-center">
                Give a feed back
              </h2>
              <p className="mb-4">Enter technician details below:</p>

              <div className="bg-slate-300 rounded-lg p-4">
                <form className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="TechnicianName"
                        className="block mb-1 font-medium"
                      >
                        Technician Name
                      </label>
                      <input
                        type="text"
                        className="border rounded-md px-3 py-2 w-full"
                        id="TechnicianName"
                        placeholder="Enter Technician Name"
                        required
                        readOnly
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="TechnicianRating"
                        className="block mb-1 font-medium"
                      >
                        Rating
                      </label>
                      <select
                        id="TechnicianRating"
                        className="border rounded-md px-3 py-2 w-full"
                        required
                      >
                        <option value="" disabled selected>
                          Select Rating
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid  gap-4 mt-4">
                    <div>
                      <label
                        htmlFor="RequestDate"
                        className="block mb-1 font-medium"
                      >
                        Comment
                      </label>
                      <textarea
                        className="border rounded-md px-3 py-2 w-full"
                        id="RequestDate"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mt-3">
                    <h1 className="text-center font-bold text-green-500">
                      Completed
                    </h1>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                      onClick={showRequestorView}
                    >
                      Requestor Detail
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
