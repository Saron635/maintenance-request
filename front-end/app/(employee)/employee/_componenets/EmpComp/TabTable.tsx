"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import jwtDecode from "jwt-decode"; // Correct import

// Define the interface for the JWT payload
interface DecodedToken {
  userId: string;
  username: string;
  role: string;
}

export const TabTable = ({ requests }) => {
  const categorizedRequests = {
    history: requests,
    pending: requests.filter(request => request.status === 'In_Progress'),
    accepted: requests.filter(request => request.status === 'Pending'),
    rejected: requests.filter(request => request.status === 'Rejected'),
    Assigned: requests.filter(request => request.status === 'Assigned'),
    completed: requests.filter(request => request.status === 'Completed'),
  };

  const router = useRouter();

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-green-200 text-green-800";
      case "In_Progress":
        return "bg-yellow-200 text-yellow-800";
      case "Completed":
        return "bg-blue-200 text-blue-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      case "Assigned":
        return "bg-red-200 text-green-700";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const [activeTab, setActiveTab] = useState("pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [technicianName, setTechnicianName] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [technicianId, setTechnicianId] = useState(null); // New state for technicianId
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  

  const handleCompletedButtonClick = (requestId) => {
    console.log(requestId);
    setCurrentRequestId(requestId);
    fetchTechnicianName(requestId);
    console.log(technicianName);
    setIsModalOpen(true);
  };
  // Add this useEffect to trigger fetchTechnicianId when technicianName is updated
  useEffect(() => {
    if (technicianName) {
      fetchTechnicianId(); // This will be called only when technicianName is updated
    }
  }, [technicianName]);

  const fetchRejectionReason = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/requests/getRejectionReason`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_id: requestId }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setRejectionReason(data.reasonOnRejection);
        setIsRejectionModalOpen(true);
      } else {
        console.error('Failed to fetch rejection reason:', data.message);
      }
    } catch (error) {
      console.error('Error fetching rejection reason:', error);
    }
  };
  

  const fetchTechnicianName = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/feedbacks/getTechnicianName`, {
        method: 'POST', // Change to POST
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify({ requestId }) // Send requestId in the body
      });

      const data = await response.json();

      if (data.success) {
        setTechnicianName(data.technicianName);
      }

    } catch (error) {
      console.error("Failed to fetch technician name:", error);
    }
  };


  const fetchTechnicianId = async () => {

    console.log(technicianName)
    try {
      const response = await fetch(`http://localhost:3002/api/feedbacks/getTechnicianId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: technicianName }), // Assuming technicianName matches the username in your table
      });

      const data = await response.json();

      if (data.success) {
        setTechnicianId(data.technician_id);
        console.log(data.technician_id)
      } else {
        console.error('Failed to fetch technician ID:', data.message);
      }
    } catch (error) {
      console.error('Error fetching technician ID:', error);
    }
  };




  const handleFormSubmitForFeedback = async (e) => {
    e.preventDefault();

    const getTokenFromCookies = () => {
      const cookieString = document.cookie;
      const cookies = cookieString.split("; ");
      const authTokenCookie = cookies.find((cookie) =>
        cookie.startsWith("authToken=")
      );
      return authTokenCookie ? authTokenCookie.split("=")[1] : null;
    };


    const token = getTokenFromCookies();
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);

      try {
        const response = await fetch(`http://localhost:3002/api/feedbacks/addFeedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestId: currentRequestId,
            employeeId: decodedToken.userId /* extract employee_id from auth token here */,
            technicianId: technicianId/* fetch technician_id from completionConfirmation table */,
            rating,
            comments,
          }),
        });

        const data = await response.json();

        if (data.success) {
          // Optionally, update the UI to reflect the new feedback
          // You may need to refetch data or update state
        } else {
          console.error('Failed to submit feedback:', data.message);
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    }
    setIsModalOpen(false);
  };



  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTechnicianName("");
    setRating("");
    setComments("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, possibly sending the rating and comments to the server
    setIsModalOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const currentRequests = categorizedRequests[activeTab];
  const totalPages = Math.ceil(currentRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const requestToBeRendered = currentRequests.slice(startIndex, endIndex);

  const handleClickRoute = () => {
    const randomId = Math.floor(Math.random() * 10000);
    router.push(`/employee/api/item/newForm/${randomId}`);
  };

  return (
    <div className="container mx-auto mt-8 p-8">
      <div className="flex flex-row right-0 bg-blue-950 rounded-lg w-fit mb-8 p-2">
        <div className="text-gray-200 text-center">
          <Plus />
        </div>
        <div>
          <button className="text-gray-200 items-end flex-row" onClick={handleClickRoute}>
            New Request
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        {["history", "pending", "accepted", "rejected", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold ${activeTab === tab ? "text-white bg-blue-500" : "text-blue-500 bg-gray-200"
              } rounded-lg`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-center">Description</th>
              <th className="py-2 px-4 text-center">Request Type</th>
              <th className="py-2 px-4 text-center">Device Type</th>
              <th className="py-2 px-4 text-center">Urgency</th>
              <th className="py-2 px-4 text-center">Status of Request</th>
            </tr>
          </thead>
          <tbody>
            {requestToBeRendered.map((row, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4 text-center">{row.description}</td>
                <td className="py-2 px-4 text-center">{row.request_type}</td>
                <td className="py-2 px-4 text-center">{row.device_type}</td>
                <td className="py-2 px-4 text-center">{row.priority}</td>
                <td className="py-2 px-4 text-center">
  {row.status === "Completed" ? (
    <button
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full hover:shadow-lg ${getStatusClass(row.status)}`}
      onClick={() => handleCompletedButtonClick(row.request_id)}
    >
      {row.status}
    </button>
  ) : row.status === "Rejected" ? (
    <button
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full hover:shadow-lg ${getStatusClass(row.status)}`}
      onClick={() => fetchRejectionReason(row.request_id)} // Fetch reason on click
    >
      {row.status}
    </button>
  ) : (
    <button
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full hover:shadow-lg ${getStatusClass(row.status)}`}
    >
      {row.status}
    </button>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
{/* pagination */}
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? "bg-blue-950 text-white" : "bg-gray-200 text-gray-800"
              }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-800"
          onClick={() => setCurrentPage((next) => Math.min(next + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-2xl mb-4">Completed Request Details</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Technician Name
                </label>
                <input
                  type="text"
                  value={technicianName}
                  disabled
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select a rating</option>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Comments
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleFormSubmitForFeedback}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isRejectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold">Rejection Reason</h2>
            <p className="mt-2">{rejectionReason}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsRejectionModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default TabTable;
