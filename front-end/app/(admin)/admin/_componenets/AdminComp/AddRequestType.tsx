import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RequestType {
  request_type_id: number;
  request_type_name: string;
}

const AddRequestType: React.FC = () => {
  const [requestType, setRequestType] = useState<RequestType[]>([]);
  const [isAddRequestTypeModal, setIsAddRequestTypeModal] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3002/api/requests/requestTypeList')
      .then((response) => {
        setRequestType(response.data);
      })
      .catch((error) => {
        toast.error(`There was an error fetching the request types! ${error.message}`);
        window.location.reload()
      });
  }, []);

  const handleAddRequestTypeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const requestTypeName = formData.get('requestTypeName') as string;

    if (requestTypeName.trim() === '') {
      toast.error('Request Type name is required');
      window.location.reload()
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/api/requests/addRequestType', {
        request_type_name: requestTypeName,
      });

      setRequestType([...requestType, response.data]);
      toast.success('Request Type added successfully');
      window.location.reload()
      setIsAddRequestTypeModal(false); // Close the modal
      (event.target as HTMLFormElement).reset(); // Clear form fields
    } catch (error) {
      toast.error(`Error adding Request Type: ${error.message}`);
      window.location.reload()
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-4xl md:mx-auto px-4 sm:px-6 lg:px-8 md:pl-64">
        <h2 className="font-bold text-2xl sm:text-3xl mb-6 text-center">
          Add New Request Type
        </h2>
        <div className="bg-gray-200 text-gray-700 px-4 py-3 rounded-t-lg flex justify-between text-sm sm:text-base">
          <div className="w-1/3">ID</div>
          <div className="w-1/2 text-right mr-3">Name</div>
        </div>
        <ul className="divide-y divide-gray-200 bg-white rounded-b-lg shadow-md">
          {requestType.map((rt) => (
            <li
              key={rt.request_type_id}
              className="flex justify-between items-center px-4 py-2 text-sm sm:text-base"
            >
              <span>{rt.request_type_id}</span>
              {rt.request_type_name}
            </li>
          ))}
        </ul>
        <button
          className="bg-orange-400 text-lg text-black justify-center py-2 px-4 mt-6 w-full sm:w-auto rounded-full
           hover:bg-orange-600 transform hover:transition-transform hover:translate-y-1 hover:shadow-md"
          onClick={() => setIsAddRequestTypeModal(true)}
        >
          Add New Request Type
        </button>
        {isAddRequestTypeModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4 text-center">
                Add Request Type
              </h2>

              <form onSubmit={handleAddRequestTypeSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Request Type Name
                  </label>
                  <input
                    type="text"
                    placeholder="Request Type Name"
                    name="requestTypeName"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddRequestTypeModal(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddRequestType;
