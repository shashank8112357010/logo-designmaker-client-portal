import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Dropdown } from '../../../../components/CustomSelect';
import { createTicket } from '../../../../services/api.service';
import toast from 'react-hot-toast';

const CreateTicket = ({ onBack, onSuccess }) => {
  const [priority, setPriority] = useState(null);
  const [title, setTitle] = useState('');
  const [requestType, setRequestType] = useState('');
  const [ticketBody, setTicketBody] = useState('');

  const options = [
    { label: "New Ticket", color: "bg-blue-500" },
    { label: "On-Going Ticket", color: "bg-yellow-500" },
    { label: "Resolved Ticket", color: "bg-green-500" }
  ];

  const mutation = useMutation({
    mutationFn: createTicket,
    onSuccess: (data) => {
      toast.success('Ticket created successfully!');
      onSuccess(); 
      onBack();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title,
      ticketType: requestType,
      priorityStatus: priority,
      ticketBody
    });
  };

  return (
    <main className="flex-grow  overflow-y-auto ">
      <div className="bg-secondaryBlack p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Create Ticket</h2>
        <p className="text-gray-400 mb-6">Write and address new queries and issues</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className='flex flex-col'>
              <label htmlFor="title" className='text-white text-lg mb-2'>Title</label>
              <input
                id='title'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type Title"
                className="p-4 bg-primaryBlack text-white rounded-lg placeholder:text-customGray"
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="request" className='text-white text-lg mb-2'>Request Ticket Type</label>
              <input
                id='request'
                type="text"
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                placeholder="Type Request Type"
                className="p-4 bg-primaryBlack text-white rounded placeholder:text-customGray"
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-white text-lg mb-2'>Priority Status</label>
              <Dropdown
                options={options}
                value={priority}
                onChange={setPriority}
                placeholder="Please choose one option"
                textColor="white"
              />
            </div>
          </div>
          <label htmlFor='body' className='text-white text-lg mb-4'>Ticket Body</label>
          <textarea
            id='body'
            value={ticketBody}
            onChange={(e) => setTicketBody(e.target.value)}
            placeholder="Type ticket issue here.."
            className="w-full p-4 bg-primaryBlack text-white rounded mt-2 mb-6 border-none resize-none placeholder:text-customGray"
            rows="6"
          ></textarea>
          <div className="flex justify-end items-center gap-6">
            <button
              type="submit"
              className="bg-primaryGreen text-primaryBlack font-bold py-3 px-6 rounded"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Sending...' : 'Send Ticket'}
            </button>
            <button onClick={onBack} className="border-primaryGreen border text-white font-bold py-3 px-10 rounded">Back</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateTicket;
