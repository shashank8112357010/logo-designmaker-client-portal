import React from 'react';

const TicketCard = ({ ticket, onOpenTicket }) => {
    return (
        <div className="bg-primaryBlack p-4 mb-4 rounded-lg ">
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2 text-white">
                    <div className={`w-4 h-4 rounded-full ${ticket.statusColor}`}></div>
                    <h3 className="font-semibold">{`Ticket# ${ticket.id}`}</h3>
                </div>
                <div className="text-sm flex items-center space-x-2 text-customGray">
                    <span>{ticket.status}</span>
                    <span>Posted at {ticket.date}</span>
                </div>
            </div>
            <div className="mt-2">
                <h4 className="font-semibold text-white">{ticket.description}</h4>
                <p className="text-gray-400 text-sm mt-2">{ticket.details}</p>
            </div>
            <div className='mt-4'>
                <div className='bg-white h-0.5 w-full rounded-full'></div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                    <img src="/img/Ellipse.jpg" alt="" className='h-8 w-8 rounded-full' />
                    <span className='text-white'>{ticket.user}</span>
                </div>
                <button 
                    onClick={() => onOpenTicket(ticket)}
                    className="text-blue-500 underline"
                >
                    Open Ticket
                </button>
            </div>
        </div>
    );
};

export default TicketCard;
