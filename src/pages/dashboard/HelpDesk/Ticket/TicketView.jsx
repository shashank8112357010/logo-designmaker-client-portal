import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReplyToTicket } from '../../../../services/api.service';
import { toast } from 'react-toastify';


const TicketView = ({ ticketId, priorityStatus, ticketTitle, ticketType, ticketBody, username, postedAt, replies, onBack }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const queryClient = useQueryClient();

    const addReplyMutation = useMutation({
        mutationFn: addReplyToTicket,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['ticket', data.ticket._id]);
            setShowReplyForm(false);
            setReplyText('');
        },
        onError: (error) => {
            toast.error(error.message)
            setErrorMessage(error.message);
        },
    });

    const handleReplyClick = () => {
        setShowReplyForm(true);
    };

    const handleCloseReplyForm = () => {
        setShowReplyForm(false);
        setReplyText('');
        setErrorMessage('');
    };

    const handleReplyChange = (e) => {
        setReplyText(e.target.value);
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        addReplyMutation.mutate({ ticketId, replyBody: replyText });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <div className='flex-grow relative'>
            <main className="flex-grow relative h-full">
                <div className="flex-grow overflow-x-hidden relative h-full">
                    <div className="bg-secondaryBlack p-4 rounded">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2 text-white">
                                <div className={`w-4 h-4 rounded-full ${priorityStatus?.color}`}></div>
                                <h3 className="font-semibold">{`Ticket# ${ticketId}`}</h3>
                            </div>
                            <div className="text-sm flex items-center space-x-2 text-customGray">
                                <span>Posted at {formatDate(postedAt)}</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h4 className="font-semibold text-white">{ticketTitle}</h4>
                            <p className="text-gray-400 text-sm mt-2">{ticketBody}</p>
                        </div>
                        <div className='mt-4'>
                            <div className='bg-white h-0.5 w-full rounded-full'></div>
                            <div className="flex items-center space-x-2 mt-4">
                                <img src="/img/Ellipse.jpg" alt="" className='h-8 w-8 rounded-full' />
                                <span className='text-white'>{username}</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            {replies.map(reply => (
                                <div key={reply._id} className="bg-secondaryBlack rounded mt-10">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center space-x-2 text-white">
                                            <div className={`w-4 h-4 rounded-full ${priorityStatus?.color}`}></div>
                                            <h4 className="font-semibold">Reply for Ticket# {reply.ticketId}</h4>
                                        </div>
                                        <div className="text-sm text-customGray">
                                            <span>Posted at {formatDate(reply.postedAt)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-gray-400 text-sm mt-2 break-words">{reply.replyBody}</p>
                                    </div>
                                    <div className='mt-10'>
                                        <div className='bg-white h-0.5 w-full rounded-full'></div>
                                        <div className="flex items-center space-x-2 mt-4">
                                            <img src="/img/Ellipse.jpg" alt="" className='h-8 w-8 rounded-full' />
                                            <span className='text-white'>{reply?.username}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end items-center mt-4">
                            <div className='flex space-x-4'>
                                <button onClick={handleReplyClick} className="border-primaryGreen border text-white font-medium p-2 rounded flex items-center gap-3">
                                    <img src="/img/Reply.png" alt="" />Reply
                                </button>
                                <button onClick={onBack} className="border-primaryGreen border text-white font-bold py-3 px-6 rounded mx-10">Back</button>
                                <button className="bg-primaryGreen font-medium rounded px-4">Close Ticket</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {showReplyForm && (
                <div className="fixed inset-0 left-[16.7%] top-24 flex items-center justify-center z-10">
                    <div className="absolute inset-0 bg-customGray bg-opacity-10 h-full"></div>
                    <div className="bg-secondaryBlack p-6 rounded-lg w-[90%] z-20">
                        <h3 className="text-lg text-white font-semibold mb-4">Reply to Ticket #{ticketId}</h3>
                        <form onSubmit={handleReplySubmit}>
                            <div className='w-5/6'>
                                <div className='flex gap-8'>
                                    <div className="mb-4 w-1/3">
                                        <label className="block text-sm font-medium text-white">Ticket Number</label>
                                        <input
                                            type="text"
                                            value={ticketId}
                                            readOnly
                                            className="mt-1 block w-full px-3 py-2 text-customGray rounded-md shadow-sm focus:outline-none bg-primaryBlack"
                                        />
                                    </div>
                                    <div className="mb-4 w-1/3">
                                        <label className="block text-sm font-medium text-white">Request Ticket Type</label>
                                        <input
                                            readOnly
                                            type="text"
                                            value={ticketType}
                                            className="mt-1 block w-full px-3 py-2 text-customGray rounded-md shadow-sm focus:outline-none bg-primaryBlack"
                                        />
                                    </div>
                                    <div className="mb-4 w-1/3">
                                        <label className="block text-sm font-medium text-white">Priority</label>
                                        <div className="mt-1 w-full px-3 py-2 flex items-center gap-2 text-customGray rounded-md shadow-sm bg-primaryBlack">
                                            <div className={`w-3 h-3 rounded-full ${priorityStatus?.color}`}></div>
                                            <span>{priorityStatus?.label}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-white">Ticket Body</label>
                                    <textarea
                                        placeholder='Type Your Reply here...'
                                        value={replyText}
                                        onChange={handleReplyChange}
                                        required
                                        className="placeholder:text-customGray mt-1 block w-full px-3 py-2 appearance-none resize-none bg-primaryBlack text-white rounded-md shadow-sm break-words"
                                        rows="5"
                                    ></textarea>
                                </div>
                            </div>
                            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseReplyForm}
                                    className="bg-primaryBlack text-white border-2 border-primaryGreen px-6 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-primaryGreen text-primaryBlack font-bold px-4 py-2 rounded" disabled={addReplyMutation.isLoading}>
                                    {addReplyMutation.isLoading ? 'Submitting...' : 'Submit Reply'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketView;
