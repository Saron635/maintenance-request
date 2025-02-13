import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RequestType {
  request_type_id: number;
  request_type_name: string;
}

const RemoveRequestType: React.FC = () => {
  const [requestType, setRequestType] = useState<RequestType[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3002/api/requests/requestTypeList')
      .then((response) => {
        setRequestType(response.data);
      })
      .catch((error) => {
        toast.error(`There was an error fetching the request types!, ${error}`);
        window.location.reload()
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete('http://localhost:3002/api/requests/removeRequestType/', {
        params: { id },
      })
      .then((response) => {
        setRequestType((prevRequestType) =>
          prevRequestType.filter(
            (requestType) => requestType.request_type_id !== id
          )
        );
        toast.success('Request type deleted successfully');
        window.location.reload()
      })
      .catch((error) => {
        toast.error(`There was an error deleting the request type!, ${error}`);
        window.location.reload()
      });
  };

  return (
    
    <div className="max-w-3xl md:mx-auto p-4 md:max-w-2xl md:pl-64">
      <h2 className="font-bold text-2xl mb-6 text-center">Request Types</h2>
      <div className="overflow-x-auto">
        <div className="bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-t-lg flex flex-col md:flex-row justify-between items-center ">
          <div className="w-full md:w-1/4 text-left md:text-left">ID</div>
          <div className="w-full md:w-1/2 text-center">Name</div>
          <div className="w-full md:w-1/4 text-right">Action</div>
        </div>
        <ul className="divide-y divide-gray-200 bg-white rounded-b-lg shadow-md border-b-1">
          {requestType.map((rt) => (
            <li
              key={rt.request_type_id}
              className="flex flex-col md:flex-row items-center py-3 px-4 md:px-6"
            >
              <div className="w-full md:w-1/4 text-left font-mono">{rt.request_type_id}</div>
              <div className="w-full md:w-1/2 text-center">{rt.request_type_name}</div>
              <div className="w-full md:w-1/4 text-right mt-2 md:mt-0">
                <button
                  className="text-white bg-red-400 rounded-full transform hover:transition-transform hover:translate-y-1 
                  hover:shadow-lg py-2 px-4"
                  onClick={() => handleDelete(rt.request_type_id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer /> 
    </div>
  );
};

export default RemoveRequestType;
