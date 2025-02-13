"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

interface MaintenanceRequest {
  request_id: number;
  requester_name: string;
  email: string;
  device_type: string;
  phone_number: string;
  status: string;
  description: string;
  model_no: string;
  other_request_type: string;
  urgency?: string;
}

const RequestDetail = () => {
  const [request, setRequest] = useState<MaintenanceRequest | null>(null);
  const [urgency, setUrgency] = useState<string>("");
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [showRejectTextarea, setShowRejectTextarea] = useState<boolean>(false);
  const pathname = usePathname();
  const request_id = pathname.split("/statusId/").pop();
  const router = useRouter();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/requests/maintenanceRequests/${request_id}`);
        if (!response.ok) {
          throw new Error("Request not found");
        }
        const data = await response.json();
        setRequest(data[0]);
        setUrgency(data[0]?.urgency || "");
      } catch (error) {
        console.error(error);
      }
    };

    if (request_id) {
      fetchRequest();
    }
  }, [request_id]);

  const handleStatusUpdate = async (newStatus: string, reason: string = "") => {
    try {
      const response = await fetch(`http://localhost:3002/api/requests/maintenanceRequests/${request?.request_id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus, rejectionReason: reason }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedRequest = await response.json();
      setRequest(updatedRequest);

      if (newStatus === "Pending") {
        router.push("/department/accepted");
      } else if (newStatus === "Rejected") {
        router.push("/department/rejected");
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      toast.error(`Failed to ${newStatus.toLowerCase()} request`);
    }
  };

  const handlePopReject = () => {
    setShowRejectTextarea(true);
  };

  const handleUrgencyChange = async (newUrgency: string) => {
    try {
      const response = await fetch(`http://localhost:3002/api/requests/maintenanceRequests/${request?.request_id}/priority`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priority: newUrgency }),
      });

      if (!response.ok) {
        throw new Error("Failed to update priority");
      }

      const updatedRequest = await response.json();
      setRequest(updatedRequest);
      toast.success("Priority updated successfully");
    } catch (error) {
      console.error("Error updating priority:", error);
      toast.error("Failed to update priority");
    }
  };

  const handleAccept = () => {
    handleUrgencyChange(urgency);
    handleStatusUpdate("Pending");
  };

  const handleRejectSubmit = async () => {
    if (!request) return;

    try {
      const response = await fetch(`http://localhost:3002/api/requests/maintenanceRequests/rejectHandle/${request.request_id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Rejected",
          rejectionReason: rejectionReason,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedRequest = await response.json();
      setRequest(updatedRequest);
      handleStatusUpdate("Rejected", rejectionReason);
      router.push("/department/rejected");
    } catch (error) {
      console.error("Error updating request status:", error);
      toast.error("Failed to reject request");
    }
  };

  if (!request) {
    return <p>Request Not Found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Request Details</h1>
        <p>
          <strong>Requester Name:</strong> {request.requester_name}
        </p>
        <p>
          <strong>Device Type:</strong> {request.device_type}
        </p>
        <p>
          <strong>Phone Number:</strong> {request.phone_number}
        </p>
        <p>
          <strong>Email:</strong> {request.email}
        </p>
        <p>
          <strong>Description:</strong> {request.description}
        </p>
        <p>
          <strong>Model No:</strong> {request.model_no}
        </p>
        <p>
          <strong>Other request type:</strong> {request.other_request_type}
        </p>
        <p>
          <strong>Status:</strong> {request.status}
        </p>

        {/* Urgency selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="Urgency" className="block mb-1 font-medium">
              Urgency
            </label>
            <select
              id="Urgency"
              name="priority"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
              required
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
        </div>

        {request.status === "In_Progress" && (
          <div className="mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={handlePopReject}
            >
              Reject
            </button>
          </div>
        )}

        {showRejectTextarea && (
          <div className="mt-4">
            <textarea
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Please provide a reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
              onClick={handleRejectSubmit}
            >
              Submit Rejection
            </button>
          </div>
        )}
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default RequestDetail;
