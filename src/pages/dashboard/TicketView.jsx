import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const TicketView = ({ ticket, onBack }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replies, setReplies] = useState(ticket?.replies || []);
    const [replyText, setReplyText] = useState('');

    const handleReplyClick = () => {
        setShowReplyForm(true);
    };

    const handleCloseReplyForm = () => {
        setShowReplyForm(false);
        setReplyText('');
    };

    const handleReplyChange = (e) => {
        setReplyText(e.target.value);
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();
        const newReply = {
            id: ticket.id,
            text: replyText,
            date: new Date().toLocaleTimeString(),
            user: "Admin",
        };
        setReplies([...replies, newReply]);
        setShowReplyForm(false);
        setReplyText('');
    };

    return (
        <div className="bg-primaryBlack flex relative">
            <Sidebar />
            <div className="lg:ml-[16.3%] lg:w-[83.7%] w-full bg-primaryBlack flex flex-col flex-grow absolute min-h-screen border-l-2 border-secondaryBlack">
                <Header />
                <main className="flex-grow px-6 overflow-y-auto relative">
                    <div className="flex-grow px-6 overflow-y-auto relative mt-8">
                        <div className="bg-secondaryBlack p-4 rounded">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-2 text-white">
                                    <div className={`w-4 h-4 rounded-full ${ticket.statusColor}`}></div>
                                    <h3 className="font-semibold">{`Ticket# ${ticket.id}`}</h3>
                                </div>
                                <div className="text-sm flex items-center space-x-2 text-customGray">
                                    <span>Posted at {ticket.date}</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <h4 className="font-semibold text-white">{ticket.description}</h4>
                                <p className="text-gray-400 text-sm mt-2">{ticket.details}</p>
                            </div>
                            <div className='mt-4'>
                                <div className='bg-white h-0.5 w-full rounded-full'></div>
                                <div className="flex items-center space-x-2 mt-4">
                                    <img src="/img/Ellipse.jpg" alt="" className='h-8 w-8 rounded-full' />
                                    <span className='text-white'>{ticket.user}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                {replies.map(reply => (
                                    <div key={reply.id} className="bg-secondaryBlack  rounded mt-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center space-x-2 text-white">
                                                <div className={`w-4 h-4 rounded-full ${ticket.statusColor}`}></div>
                                                <h4 className="font-semibold">Reply for Ticket# {reply.id}</h4>
                                            </div>
                                            <div className="text-sm text-customGray">
                                                <span>Posted at {reply.date}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm mt-2 w-fit">{reply.text}</p>
                                        <div className='mt-4'>
                                            <div className='bg-white h-0.5 w-full rounded-full'></div>
                                            <div className="flex items-center space-x-2 mt-4">
                                                <img src="/img/Ellipse.jpg" alt="" className='h-8 w-8 rounded-full' />
                                                <span className='text-white'>{reply.user}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end items-center mt-4">
                                <div className='flex space-x-4'>
                                    <button onClick={handleReplyClick} className="border-primaryGreen border-2 text-white font-medium p-2 rounded flex items-center gap-3">
                                        <img src="/img/Reply.png" alt="" />Reply
                                    </button>
                                    <button onClick={onBack} className="bg-primaryGreen font-medium p-2 rounded">Closed Ticket</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showReplyForm && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="absolute inset-0 bg-customGray bg-opacity-50"></div>
                            <div className="bg-secondaryBlack p-6 rounded-lg w-[90%] z-20">
                                <h3 className="text-lg text-white font-semibold mb-4">Reply to Ticket #{ticket.id}</h3>
                                <form onSubmit={handleReplySubmit}>
                                    <div className='w-5/6'>
                                        <div className='flex gap-8'>
                                            <div className="mb-4 w-1/3">
                                                <label className="block text-sm font-medium text-white">Ticket Number</label>
                                                <input
                                                    type="text"
                                                    value={ticket.id}
                                                    readOnly
                                                    className="mt-1 block w-full px-3 py-2 text-customGray rounded-md shadow-sm focus:outline-none bg-primaryBlack"
                                                />
                                            </div>
                                            <div className="mb-4 w-1/3">
                                                <label className="block text-sm font-medium text-white">Request Ticket Type</label>
                                                <input
                                                    readOnly
                                                    type="text"
                                                    value="Deposit"
                                                    className="mt-1 block w-full px-3 py-2 text-customGray rounded-md shadow-sm focus:outline-none bg-primaryBlack"
                                                />
                                            </div>
                                            <div className="mb-4 w-1/3">
                                                <label className="block text-sm font-medium text-white">Priority</label>
                                                <div className="mt-1 block w-full px-3 py-2 flex items-center gap-2 text-customGray rounded-md shadow-sm bg-primaryBlack">
                                                    <div className={`w-3 h-3 rounded-full ${ticket.statusColor}`}></div>
                                                    <span>{ticket.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-white">Ticket Body</label>
                                            <textarea
                                                placeholder='Type Your Reply here...'
                                                value={replyText}
                                                onChange={handleReplyChange}
                                                className="placeholder:text-customGray mt-1 block w-full px-3 py-2 appearance-none resize-none bg-primaryBlack text-white rounded-md shadow-sm"
                                                rows="5"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={handleCloseReplyForm}
                                            className="bg-primaryBlack text-white border-2 border-primaryGreen px-6 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="bg-primaryGreen text-primaryBlack font-bold px-4 py-2 rounded">
                                            Submit Reply
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default TicketView;
