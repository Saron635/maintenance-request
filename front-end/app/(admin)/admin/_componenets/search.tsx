import { Search } from 'lucide-react'
import React from 'react'

function search() {
  return (
    <div className="flex  align-baseline border border-green-500">
      <div className='border ' >
        <input type="text" placeholder="Search..."
        className=" p-2 border border-gray-300 rounded-md mb-4"
      />
      </div>
       
      <div className='border items-center'><Search/></div>
    </div>
  )
}

export default search

