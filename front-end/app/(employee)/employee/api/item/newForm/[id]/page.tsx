"use client";
import { Navbar } from "@/app/(employee)/employee/_componenets/EmpComp/navbar";
import { Sidebar } from "@/app/(employee)/employee/_componenets/EmpComp/sidebar";
import React, { useState, useEffect } from "react";
import { requests } from "../../../../empData";
import { usePathname } from "next/navigation";
import jwtDecode from "jwt-decode"; // Correct import

// Define the interface for the JWT payload
interface DecodedToken {
  userId: string;
  username: string;
  role: string;
}


export default function AssignedCompleted() {
  const [departments, setDepartments] = useState<String[]>([]);
  const [requestTypes, setRequestTypes] = useState<String[]>([]);

  const [requestType, setRequestType] = useState("");
  const [Other, setOther] = useState(false);
  const [urgency, setUrgency] = useState(" ");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [requesterName, setRequesterName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [formVisible, setFormVisible] = useState(true);



  // Utility function to get the user ID from the JWT token
  const getUserIdFromToken = (): string | null => {
    const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.userId || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };


  useEffect(() => {
    handleDepartmentList();
    handleRequestTypes();
    handleRequestInfo()
  }, []);

  const handleRequestTypes = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/requests/getRequestList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        const requestTypeNames: String[] = data.map((requestType: any) => requestType.request_type_name);
        setRequestTypes(requestTypeNames);
      } else {
        console.error(`Fetching request types error: ${response.statusText}`);
      }
    } catch (err) {
      console.error(`Fetching request types error: ${err}`);
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement); // object 

    const employeeId = getUserIdFromToken();

    if (!employeeId) {
      alert('User is not authenticated');
      return;
    }

    const data: any = {
      requester_name: formData.get("requester_name") as string,
      email: formData.get("email") as string,
      device_type: formData.get("device_type") as string,
      description: formData.get("description") as string,
      // priority: formData.get("priority") as string,
      phone_number: formData.get("phone_number") as string,
      request_type: formData.get("request_type") as string,
      other_request_type: formData.get("other_request_type") as string,
      model_no: formData.get("model_no") as string,
      employee_id: employeeId ? parseInt(employeeId) : null,
      department_name: formData.get("department_name") as string, // Include department_name instead of department_id

    };

    try {
      console.log(data);
      const response = await fetch("http://localhost:3002/api/requests/newForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });
      if (response.ok) {
        setPopupMessage("Request sent succesfully");
        setPopupVisible(true);
        window.location.href = '/employee/emp_dashboard'; // Replace with the desired URL
      } else {
        const errorMessage = await response.text();
        setPopupMessage("Request not sent : " + errorMessage);
        setPopupVisible(true);
      }
    } catch (err) {
      setPopupMessage("Server error: " + (err as Error).message);
      setPopupVisible(true);
    }
  };
  
  const closePopup = () => {
    setPopupVisible(false);
    //setFormVisible(false); // Hide the form
    // router.push('/emp_dashboard');
  };



  const handleOtherClick = (e) => {
    setRequestType(e.target.value);
    setOther(e.target.value === "Other");
  };

  const handleUrgency = (e) => {
    setUrgency(e.target.value)
  }

  const handleRequestInfo = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/api/requests/userInfo/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // Assuming the API returns an object with username, email, and department_name
        setRequestType(data.request_type || ""); // Assuming you have this in user info
        setDepartmentName(data.department_name); // Set departmentName to update the input field

        // Populate form fields
        (document.getElementById('RequesterName') as HTMLInputElement).value = data.username;
        (document.getElementById('Email') as HTMLInputElement).value = data.email;
      } else {
        console.error(`Fetching user info error: ${response.statusText}`);
      }
    } catch (err) {
      console.error(`Fetching user info error: ${err}`);
    }
  };



  const handleDepartmentList = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/api/registers/getDepartments",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok && Array.isArray(data)) {
        // Map the data to extract only department_name
        const departmentNames: String[] = data.map(
          (department: any) => department.department_name
        );
        setDepartments(departmentNames);
      } else {
        console.error(`Fetching department error: ${response.statusText}`);
      }
    } catch (err) {
      console.error(`Fetching  error: ${err}`);
    }
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
    
     <main className="pt-[100px] md:pl-60">
    <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Request Form</h2>
      <p className="mb-6 text-lg text-center text-gray-600">Submit a new maintenance request below</p>

      <div className="bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg p-6 shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Requester Name */}
            <div>
              <label htmlFor="RequesterName" className="block text-gray-700 font-semibold mb-2">
                Requester Name
              </label>
              <input
                type="text"
                id="RequesterName"
                name="requester_name"
                value={requesterName}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                readOnly
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="Email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="email"
                value={email}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone No */}
            <div>
              <label htmlFor="PhoneNo" className="block text-gray-700 font-semibold mb-2">
                Phone No
              </label>
              <input
                type="text"
                name="phone_number"
                placeholder="Enter your phone number"
                required
                defaultValue="+251"
                pattern="\+251[0-9]{9}"
                maxLength="13"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={(e) => {
                  if (!e.target.value.startsWith("+251")) {
                    e.target.value = "+251";
                  }
                }}
              />
            </div>
            {/* Device Type */}
            <div>
              <label htmlFor="DeviceType" className="block text-gray-700 font-semibold mb-2">
                Device Type
              </label>
              <input
                type="text"
                id="DeviceType"
                name="device_type"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your device type"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Request Type */}
            <div>
              <label htmlFor="RequestType" className="block text-gray-700 font-semibold mb-2">
                Request Type
              </label>
              <select
                id="RequestType"
                name="request_type"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={requestType}
                onChange={handleOtherClick}
              >
                <option value="">Select</option>
                {requestTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Other Request Type */}
            {Other && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Other Request Type</label>
                <textarea
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="other_request_type"
                  placeholder="Please describe your request type"
                ></textarea>
              </div>
            )}

            {/* Department */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Department</label>
              {departmentName ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="department_name"
                  name="department_name"
                  value={departmentName}
                  placeholder="Department Name"
                  readOnly
                />
              ) : (
                <select
                  name="department_name"
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select your department
                  </option>
                  {departments.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Description and Model No */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="Description" className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                id="Description"
                name="description"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your request"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="ModelNo" className="block text-gray-700 font-semibold mb-2">
                Model No
              </label>
              <input
                type="text"
                id="ModelNo"
                name="model_no"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your model number"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              type="submit"
            >
              Submit Request
            </button>
          </div>

        </form>
      </div>
    </div>
  </main>
   

  
    </div>
  );
}
