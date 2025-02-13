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
      <main className="pt-[100px] md:pl-60 ">
        <div className="bg-slate-400  rounded-lg shadow-lg p-4 sm:p-6 lg:p-8  w-full ">
          <h2 className="text-3xl font-bold mb-4 text-center">Request Form</h2>
          <p className="mb-4">
            Making a new request form
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

                <form className="mt-4" onSubmit={handleSubmit}>
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
                        name="requester_name"
                        value={requesterName}
                        placeholder="enter your name"
                        required
                        readOnly
                      />
                    </div>
                    <div>
                      <label htmlFor="Email" className="block mb-1 font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        className="border rounded-md px-3 py-2 w-full"
                        id="Email"
                        name="email"
                        value={email}
                        placeholder="enter your email"
                        required
                        readOnly
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
                        name="phone_number"
                        placeholder="enter your phone number"
                        required
                        defaultValue="+251"
                        pattern="\+251[0-9]{9}"
                        maxLength="13"
                        onInput={(e) => {
                          if (!e.target.value.startsWith("+251")) {
                            e.target.value = "+251";
                          }
                        }}
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
                        name="device_type"
                        placeholder="enter your Device Type"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="RequestType" className="block mb-1 font-medium">
                        Request Type
                      </label>
                      <select
                        id="RequestType"
                        name="request_type"
                        className="border border-gray-300 rounded-md p-2 w-full"
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
                    {Other && (
                      <div>
                        <label>
                          Other Request Type
                        </label>
                        <textarea
                          className="border rounded-md px-3 py-2 w-full"
                          name="other_request_type "
                          placeholder="Please describe your request type"

                        ></textarea>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Department
                      </label>

                      {departmentName ? (
                        <input
                          type="text"
                          className="border rounded-md px-3 py-2 w-full"
                          id="department_name"
                          name="department_name"
                          value={departmentName}
                          placeholder="enter your department name"
                          readOnly
                          readOnly
                        />
                      ) : (
                        <select
                          name="department_name"
                          value={departmentName}
                          onChange={(e) => setDepartmentName(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          required
                        >
                          <option value="" disabled>Select your department</option>
                          {departments.length > 0 &&
                            departments.map((department: any, index) => (
                              <option key={index} value={department}>
                                {department}
                              </option>
                            ))}
                        </select>
                      )}
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
                        name="description"
                        placeholder="enter your Description"
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
                        name="model_no"
                        placeholder="enter your Model No"
                        required
                      />
                    </div>
                  </div>
               

                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl mr-2"
                      type="submit"
                    >
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Popup */}
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 md:pl-60 ">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-lg">{popupMessage}</div>
            <button
              onClick={closePopup}
              
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  flex justify-center "
            >
              Close </button>
          </div>
        </div>
      )}
    </div>
  );
}
