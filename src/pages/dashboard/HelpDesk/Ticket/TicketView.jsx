
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReplyToTicket, closeTicket } from '../../../../services/api.service';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import ConfirmClosePop from './ConfirmClosePop'; // Assuming you have this component

const TicketView = ({ ticketData, onBack }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmClose, setConfirmClose] = useState(false);
    

    const queryClient = useQueryClient();

    const addReplyMutation = useMutation({
        mutationFn: addReplyToTicket,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['ticket', data?.ticket._id]);
            setShowReplyForm(false);
            setReplyText('');
            setLoading(false);
        },
        onError: (error) => {
            toast.error(error.message);
            setErrorMessage(error.message);
            setLoading(false);
        },
    });

    const closeTicketMutation = useMutation({
        mutationFn: closeTicket,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['ticket', ticketData._id]);
            toast.success(data.message);
            setLoading(false);
            setConfirmClose(false);
        },
        onError: (error) => {
            toast.error(error.message);
            setLoading(false);
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
        setLoading(true);
        addReplyMutation.mutate({ ticketId: ticketData._id, replyBody: replyText });
    };

    const handleCloseTicket = () => {
        setLoading(true);
        closeTicketMutation.mutate(ticketData._id);
    };

    const handleConfirmClose = () => {
        setConfirmClose(true);
    };

    const handleBack=()=>{
        setConfirmClose(false)
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const isResolved = ticketData?.priorityStatus?.label === 'Resolved Ticket';

    return (
        <div className='flex-grow relative'>
            <main className="flex-grow relative h-full">
                <div className="flex-grow overflow-x-hidden relative h-full">
                    <div className="bg-secondaryBlack p-4 rounded">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-2 text-white">
                                <div className={`w-4 h-4 rounded-full ${ticketData?.priorityStatus?.color}`}></div>
                                <h3 className="font-semibold">{`Ticket# ${ticketData?._id}`}</h3>
                            </div>
                            <div className="text-xs text-customGray">
                                <span>Posted at {formatDate(ticketData?.postedAt)}</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h4 className="font-semibold text-white">{ticketData?.title}</h4>
                            <p className="text-customGray text-sm mt-2">{ticketData?.ticketBody}</p>
                        </div>
                        <div className='mt-4 space-y-2'>
                            <div className="flex items-center justify-end space-x-2 mt-4 mb-4">
                                <img
                                    src={ticketData?.profileImg ? ticketData?.profileImg : '/img/profile.jpg'}
                                    alt="profile"
                                    className='h-6 w-6 rounded-full'
                                    onError={(e) => { e.target.onerror = null; e.target.src = '/img/profile.jpg'; }}
                                />
                                <span className='text-customGray text-sm'>{ticketData?.username || 'Admin'}</span>
                            </div>
                            <div className='bg-customGray h-0.5 w-full rounded-full'></div>
                        </div>
                        <div className="mt-4">
                            {ticketData?.replies?.map(reply => (
                                <div key={reply?._id} className="bg-secondaryBlack rounded mt-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center space-x-2 text-white">
                                            <div className={`w-4 h-4 rounded-full ${ticketData?.priorityStatus?.color}`}></div>
                                            <h4 className="font-semibold">Reply for Ticket# {reply?.ticketId}</h4>
                                        </div>
                                        <div className="text-xs text-customGray">
                                            <span>Posted at {formatDate(reply?.postedAt)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <p className="text-customGray text-sm mt-2 break-words">{reply?.replyBody}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <div className="flex items-center justify-end space-x-2 mt-4 mb-4">
                                            <img src={reply?.profileImg || '/img/profile.jpg'} alt="" className='h-6 w-6 rounded-full' />
                                            <span className='text-customGray text-sm'>{reply?.username || 'Admin'}</span>
                                        </div>
                                        <div className='bg-customGray h-0.5 w-full rounded-full'></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end items-center mt-4">
                            <div className='flex space-x-4'>
                                {!isResolved && (
                                    <button onClick={handleReplyClick} className="border-primaryGreen border text-white font-medium py-2 px-6 rounded flex items-center gap-3">
                                        <img src="/img/Reply.png" alt="" />Reply
                                    </button>
                                )}
                                <button onClick={onBack} className="border-primaryGreen border text-white font-bold py-2 px-6 rounded">Back</button>
                                <button
                                    onClick={loading ? '' : (confirmClose ? '' : handleConfirmClose)}
                                    className={`bg-primaryGreen close-btn font-medium rounded px-4 w-32 ${isResolved ? 'hover:bg-customGray cursor-not-allowed' : ''}`}
                                    disabled={isResolved} 

                                >
                                    {isResolved ?  <p className='ticketview-close-msg'>this ticket is closed</p> : '' }
                                    {loading ? <BeatLoader size={8} color={"#000"} />  : 'Close ticket'}
                                </button>
                                

                            </div>
                        </div>
                        <div>
                        {confirmClose && (
                                    <ConfirmClosePop handleBack={handleBack} handleCloseTicket= {handleCloseTicket}/>            
                                )}
                        </div>
                    </div>
                </div>
            </main>
            {showReplyForm && (
                <div className="fixed inset-0 left-[16.7%] top-24 flex items-center justify-center z-10">
                    <div className="absolute inset-0 bg-customGray bg-opacity-10 h-full"></div>
                    <div className="bg-secondaryBlack p-6 rounded-lg w-[90%] z-20">
                        <h3 className="text-lg text-white font-semibold mb-4">Reply to Ticket #{ticketData?._id}</h3>
                        <form onSubmit={handleReplySubmit}>
                            <div className='w-5/6'>
                                <div className='flex gap-8'>
                                    <div className="mb-4 w-1/3">
                                        <label className="block text-sm font-medium text-white">Ticket Number</label>
                                        <input
                                            type="text"
                                            value={ticketData?._id}
                                            readOnly
                                            className="mt-1 block w-full px-3 py-2 text-customGray rounded-md shadow-sm focus:outline-none bg-primaryBlack"
                                        />
                                    </div>
                                    <div className="mb-4 w-1/3">
                                        <label className="block text-sm font-medium text-white">Request Ticket Type</label>
                                        <input
                                            readOnly
                                            type="text"
                                            value={ticketData?.ticketType}
                                            className="mt-1 block w-full px-3 py-2 text-customGray rounded-md shadow-sm focus:outline-none bg-primaryBlack"
                                        />
                                    </div>
                                    <div className="mb-4 w-1/3">
                                        <label className="block text-sm font-medium text-white">Priority</label>
                                        <div className="mt-1 w-full px-3 py-2 flex items-center gap-2 text-customGray rounded-md shadow-sm bg-primaryBlack">
                                            <div className={`w-3 h-3 rounded-full ${ticketData?.priorityStatus?.color}`}></div>
                                            <span>{ticketData?.priorityStatus?.label}</span>
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

                            <div className="flex justify-end items-center space-x-4">
                                {errorMessage && <div className="text-red-500 ">{errorMessage}</div>}
                                <button
                                    type="button"
                                    onClick={handleCloseReplyForm}
                                    className=" text-white py-2 px-8 border rounded-md border-primaryGreen">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primaryGreen  text-primaryBlack font-medium rounded-md  py-2 px-2 w-36">
                                    {loading ? <BeatLoader size={8} color={"#000"} /> : 'Submit Reply'}
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

