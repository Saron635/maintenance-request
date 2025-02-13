import { useRouter } from 'next/navigation';

const AssignedComponents = ({ requests }) => {
  const router = useRouter();

  // Handle button click to route to details page
  const handleClick = (id: number) => {
    router.push(`/dashboard/api/item/assignedDetail/${id}`);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto ">
          <thead>
            <tr className="bg-gray-200">
              {/* Initial columns */}
              <th className="px-4 py-2">Requester</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Device Type</th>
              <th className="px-4 py-2">Model No</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request: any) => (
              <tr key={request.request_id} className="hover:bg-gray-100">
                {/* Display only the first 5 fields */}
                <td className="px-4 py-2">{request.requester_name}</td>
                <td className="px-4 py-2">{request.department}</td>
                <td className="px-4 py-2">{request.device_type}</td>
                <td className="px-4 py-2">{request.model_no}</td>
                <td className="px-4 py-2">{request.status}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleClick(request.request_id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AssignedComponents;
