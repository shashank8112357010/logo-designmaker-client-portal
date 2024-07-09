import React from 'react';

const TicketCard = ({ticketId,userId, username, title,ticketType,priorityStatus,ticketBody,postedAt, onOpenTicket }) => {
    return (
        <div className="bg-primaryBlack p-4 mb-4 rounded-lg ">
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2 text-white">
                    <div className={`w-4 h-4 rounded-full ${priorityStatus?.color}`}></div>
                    <h3 className="font-semibold">{`Ticket# ${ticketId}`}</h3>
                </div>
                <div className="text-sm flex items-center space-x-2 text-customGray">
                <div className={`w-2 h-2 rounded-full ${priorityStatus?.color}`}></div>
                    <span>{priorityStatus?.label}</span>
                    <span>Posted at {postedAt}</span>
                </div>
            </div>
            <div className="mt-2">
                <h4 className="font-semibold text-white">{title}</h4>
                <p className="text-gray-400 text-sm mt-2">{ticketBody}</p>
            </div>
            <div className='mt-4'>
                <div className='bg-white h-0.5 w-full rounded-full'></div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                    <img src="/img/profile.jpg" alt=" " className='h-8 w-8 rounded-full' />
                    <span className='text-white'>{username}</span>
                </div>
                <button 
                    onClick={() => onOpenTicket(userId)}
                    className="text-blue-500 underline"
                >
                    Open Ticket
                </button>
            </div>
        </div>
    );
};

export default TicketCard;
