import React, { useState } from 'react';
import { Dropdown } from '../../../components/CustomSelect';

const Request = ({ isVisible, onClose, onSubmit, serviceType }) => {
    const [requestType, setRequestType] = useState('');
    const [comments, setComments] = useState('');

    const options = [
        { label: "Not good" },
        { label: "Not Interested" },
        { label: "Not valuable" },
    ]
    const handleCommentsChange = (e) => setComments(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ requestType, comments });
        onClose();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 left-[16.7%] top-24 flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-customGray bg-opacity-10"></div>
            <div className="bg-secondaryBlack p-6 rounded-lg w-1/2 z-20">
                <h3 className="text-lg text-white font-semibold mb-4">Refund Request</h3>
                <form onSubmit={handleSubmit}>
                    <div className='flex gap-10  w-full'>
                        <div className="mb-4 w-1/2">
                            <label className="block mb-2  text-white">Service Type</label>
                            <input
                                type="text"
                                value={serviceType}
                                readOnly
                                className=" block w-full px-3 py-4 text-customGray rounded-md shadow-sm focus:outline-none bg-primaryBlack"
                            />
                        </div>
                        <div className="mb-4 w-1/2">
                            <label className="block mb-2  text-white">Request Ticket Type</label>
                            <Dropdown
                                options={options}
                                value={requestType}
                                onChange={setRequestType}
                                placeholder="Select Request Ticket Type"
                                textColor="#BDBDBD80"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block  text-white">Additional Comments</label>
                        <textarea
                            value={comments}
                            onChange={handleCommentsChange}
                            className="mt-2 block w-full px-4 py-3 text-customGray rounded-md shadow-sm focus:outline-none bg-primaryBlack placeholder:text-customGray resize-none"
                            rows="4"
                            placeholder='Type Your Message here...'
                        ></textarea>
                    </div>
                    <div className="flex justify-center space-x-4 mt-10">
                        <button
                            type="button"
                            onClick={onClose}
                            className=" text-white border-2 border-primaryGreen px-10 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-primaryGreen text-primaryBlack font-medium px-10 py-2 rounded">
                            Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Request;
