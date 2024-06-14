import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const TicketMain = () => {
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedTimeframe, setSelectedTimeframe] = useState('This Week');

    const tickets = [
        { id: 1, status: 'New Tickets', description: 'How to deposit money to my portal?', date: '12:45 AM', user: 'John Snow' },
        { id: 2, status: 'On-Going Tickets', description: 'How to deposit money to my portal?', date: '12:45 AM', user: 'John Snow' },
        { id: 3, status: 'Resolved Tickets', description: 'How to deposit money to my portal?', date: '12:45 AM', user: 'John Snow' },
    ];

    const filteredTickets = tickets.filter(ticket =>
        selectedPriority === '' || ticket.status === selectedPriority
    );

    return (
        <div className="bg-primaryBlack flex flex-col lg:flex-row relative">
            <Sidebar />
            <div className="lg:ml-[16.7%] lg:w-[84.3%] w-full bg-primaryBlack min-h-screen flex-grow absolute border-l-2 border-secondaryBlack">
                <Header />
                <main className="p-6">
                    <div className='bg-secondaryBlack mr-4 p-4'>
                        <div className="flex justify-between items-center mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for ticket"
                                    className="bg-primaryBlack text-white px-4 py-2 rounded-lg w-full"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <select
                                        value={selectedPriority}
                                        onChange={(e) => setSelectedPriority(e.target.value)}
                                        className="bg-secondaryBlack text-white px-4 py-2 rounded border-primaryGreen border-2 overflow-hidden appearance-none"
                                        
                                    >
                                        <option value="" disabled selected hidden>Select Priority</option>
                                        <option style={{ width: '150px' }}  value="New Tickets">New Tickets</option>
                                        <option style={{ width: '150px' }}  value="On-Going Tickets">On-Going Tickets</option>
                                        <option style={{ width: '150px' }}  value="Resolved Tickets">Resolved Tickets</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <select
                                        value={selectedTimeframe}
                                        onChange={(e) => setSelectedTimeframe(e.target.value)}
                                        className="bg-secondaryBlack text-white px-4 py-2  rounded border-primaryGreen border-2"
                                    >
                                        <option value="This Week">This Week</option>
                                        <option value="This Month">This Month</option>
                                    </select>
                                </div>
                                <button className="bg-primaryGreen text-primaryBlack px-4 py-2 rounded-lg font-bold">
                                    New Ticket
                                </button>
                            </div>
                        </div>
                        <div className=" p-4 rounded-lg">
                            {filteredTickets.map(ticket => (
                                <div key={ticket.id} className="border-b border-gray-700 py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className={`block text-${ticket.status === 'New Tickets' ? 'blue-500' : ticket.status === 'On-Going Tickets' ? 'orange-500' : 'green-500'} text-lg font-semibold`}>Ticket# {ticket.id}</span>
                                            <p className="text-gray-400">{ticket.description}</p>
                                            <p className="text-gray-500">{ticket.user}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-gray-400 block">{ticket.date}</span>
                                            <span className={`block text-${ticket.status === 'New Tickets' ? 'blue-500' : ticket.status === 'On-Going Tickets' ? 'orange-500' : 'green-500'} font-semibold`}>{ticket.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button className="text-white">Previous</button>
                            <div className="flex space-x-2">
                                <button className="bg-primaryGreen text-primaryBlack px-4 py-2 rounded-lg font-bold">1</button>
                                <button className="text-white">2</button>
                            </div>
                            <button className="text-white">Next</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TicketMain;
