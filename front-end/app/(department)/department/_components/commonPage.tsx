import React from "react";
import Table from "./Table";
import Card from "./Card";
import { useState } from "react";

const requests = [
  {
    requesterName: "Aman Moa",
    deviceType: "Laptop",
    phoneNumber: "09-456-7890",
    email: "aman@example.com",
    status: "inprogress",
  },
  {
    requesterName: "Kenna Pro",
    deviceType: "Printer",
    phoneNumber: "09-654-3210",
    email: "kenna@example.com",
    status: "accepted",
  },
  {
    requesterName: "Naol Max",
    deviceType: "Network",
    phoneNumber: "09-654-3210",
    email: "naol@example.com",
    status: "accepted",
  },
  {
    requesterName: "Miheret Pro",
    deviceType: "Hardware",
    phoneNumber: "09-654-3210",
    email: "miheret@example.com",
    status: "accepted",
  },
  {
    requesterName: "Sarita Pro Max",
    deviceType: "software",
    phoneNumber: "09-654-3210",
    email: "sarita@example.com",
    status: "rejected",
  },
];

const AllRequest = () => {
  const [viewType, setViewType] = useState("table");

  const handleToggleView = (view) => {
    setViewType(view);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleToggleView("table")}
          className={`px-4 py-2 mr-2 ${
            viewType === "table"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          } rounded-md`}
        >
          Table View
        </button>
        <button
          onClick={() => handleToggleView("card")}
          className={`px-4 py-2 ${
            viewType === "card"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          } rounded-md`}
        >
          Card View
        </button>
      </div>
      {viewType === "table" ? (
        <Table requests={requests} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request, index) => (
            <Card key={index} requests={request} />
          ))}
        </div>
      )}
    </div>
  );
};
export default AllRequest;
