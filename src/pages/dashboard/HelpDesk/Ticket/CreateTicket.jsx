import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Dropdown } from '../../../../components/CustomSelect';
import { createTicket } from '../../../../services/api.service';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

const CreateTicket = ({ onBack, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [requestType, setRequestType] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [loading, setLoading] = useState(false);
  // const [showError, setShowError] = useState(false);

  const options = ["Finance", "Design", "Service"];

  const mutation = useMutation({
    mutationFn: createTicket,
    onSuccess: (res) => {
      // console.log(data)
      toast.success(res.data.message);
      setLoading(false);
      onSuccess();
      onBack();
    },
    onError: (error) => {
      // console.log(error.response.data.message)
      setLoading(false);
      toast.error(error.response.data.message || 'An error occurred');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!requestType) {
    //   setShowError(true);
    //   setLoading(false);
    //   return;
    // }
    setLoading(true);
    mutation.mutate({
      title,
      ticketType: requestType,
      ticketBody
    });
  };

  return (
    <main className="flex-grow overflow-y-auto">
      <div className="bg-secondaryBlack p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Create Ticket</h2>
        <p className="text-gray-400 mb-6">Write and address new queries and issues</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 mb-6">
            <div className='flex flex-col'>
              <label htmlFor="title" className='text-white text-lg mb-2'>Title</label>
              <input
                id='title'
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type Title"
                className="p-4 bg-primaryBlack text-white rounded-lg placeholder:text-customGray"
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-white text-lg mb-2'>Request Ticket Type</label>
              <Dropdown
                options={options}
                value={requestType}
                onChange={setRequestType}
                placeholder="Please choose one option"
                textColor="white"
              />
              {/* {showError && !requestType && <p className="text-red-500 text-sm mt-2">This field is required.</p>} */}
            </div>
          </div>
          <label htmlFor='body' className='text-white text-lg mb-4'>Ticket Body</label>
          <textarea
            id='body'
            value={ticketBody}
            required
            onChange={(e) => setTicketBody(e.target.value)}
            placeholder="Type ticket issue here..."
            className="w-full p-4 bg-primaryBlack text-white rounded mt-2 mb-6 border-none resize-none placeholder:text-customGray"
            rows="6"
          ></textarea>
          <div className="flex justify-end items-center gap-6">
            <button
              type="submit"
              className="bg-primaryGreen text-primaryBlack font-bold py-3 px-6 rounded w-36"
            >
              {loading ? <BeatLoader size={8} color={"#000"} /> : 'Send Ticket'}
            </button>
            <button onClick={onBack} className="border-primaryGreen border text-white font-bold py-3 px-10 rounded">Back</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateTicket;
