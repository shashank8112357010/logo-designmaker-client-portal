import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Select from '../../components/Select';

const HelpdeskMain = () => {
  const [priority, setPriority] = useState([]);

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
  };

  const options = [
    "low",
    "medium",
    "high"
  ];

  return (
    <div className=" bg-primaryBlack flex relative">
      <Sidebar />
      <div className="lg:ml-[16.3%] lg:w-[83.7%] w-full bg-primaryBlack flex flex-col flex-grow absolute min-h-screen border-l-2 border-secondaryBlack">
        <Header />
        <main className="flex-grow px-6 overflow-y-auto">
          <div className="bg-secondaryBlack p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Create Ticket</h2>
            <p className="text-gray-400 mb-6">Write and address new queries and issues</p>
            <form>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className='flex flex-col'>
                  <label htmlFor="title" className='text-white text-lg mb-2'>Title</label>
                  <input
                    id='title'
                    type="text"
                    placeholder="Type Title"
                    className="p-4 bg-primaryBlack text-white rounded-lg"
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="request" className='text-white text-lg mb-2'>Request Ticket Type</label>
                  <input
                    id='request'
                    type="text"
                    placeholder="Type Request Type"
                    className="p-4 bg-primaryBlack text-white rounded"
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="priority" className='text-white text-lg mb-2'>Priority Status</label>
                  <Select options={options} multiple={false} value={priority} onChange={handlePriorityChange} />
                </div>
              </div>
              <textarea
                placeholder="Type ticket issue here.."
                className="w-full p-4 bg-primaryBlack text-white rounded mb-6 border-none resize-none"
                rows="6"
              ></textarea>
              <button
                type="submit"
                className="bg-primaryGreen text-primaryBlack font-bold py-3 px-6 rounded hover:bg-green-600 transition-colors"
              >
                Send Ticket
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HelpdeskMain;