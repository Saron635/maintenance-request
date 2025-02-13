import React from 'react'

function ConfirmationPopup() {
  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg shadow-lg'>
        <h2 className='text-xl mb-4'>Are you sure?</h2>
        <div className='flex justify-end space-x-4'>
          <button
            //onClick={onConfirm}
            className='bg-red-500 text-white py-2 px-4 rounded'
          >
            Yes
          </button>
          <button
           // onClick={onClose}
            className='bg-blue-500 text-white py-2 px-4 rounded'
          >
            No
          </button>
        </div>
      </div>
    </div>
  ); 
}

export default ConfirmationPopup
