import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { CustomDropdown } from '../../../components/CustomSelect';
import TicketCard from './TicketCard';
import TicketView from './TicketView';

const TicketMain = ({ onNewTicket }) => {
    const ticketOptions = [
        { label: 'All Tickets', value: 'All Tickets', color: 'bg-gray-500' },
        { label: 'New Tickets', value: 'New Tickets', color: 'bg-blue-500' },
        { label: 'On-Going Tickets', value: 'On-Going Tickets', color: 'bg-orange-500' },
        { label: 'Resolved Tickets', value: 'Resolved Tickets', color: 'bg-green-500' },
    ];

    const timeframeOptions = [
        { label: 'This Week', value: 'This Week' },
        { label: 'This Month', value: 'This Month' },
    ];

    const [selectedPriority, setSelectedPriority] = useState(ticketOptions[0]);
    const [selectedTimeframe, setSelectedTimeframe] = useState(timeframeOptions[0]);
    const [openedTicket, setOpenedTicket] = useState(null);

    const handleOpenTicket = (ticket) => {
        setOpenedTicket(ticket);
    };

    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    const showtime = (time > 12) ? (time - 12 + ' PM') : (time + ' AM');

    const tickets = [
        {
            id: '2023-CS123',
            status: 'New Tickets',
            statusColor: 'bg-blue-500',
            description: 'How to deposit money to my portal?',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: showtime,
            user: 'John Snow'
        },
        {
            id: '2023-CS124',
            status: 'On-Going Tickets',
            statusColor: 'bg-orange-500',
            description: 'How to deposit money to my portal?',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: showtime,
            user: 'John Snow'
        },
        {
            id: '2023-CS125',
            status: 'Resolved Tickets',
            statusColor: 'bg-green-500',
            description: 'How to deposit money to my portal?',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: showtime,
            user: 'John Snow'
        },
    ];

    const filteredTickets = tickets.filter(ticket =>
        selectedPriority.value === 'All Tickets' || ticket.status === selectedPriority.value
    );

    if (openedTicket) {
        return <TicketView ticket={openedTicket} onBack={() => setOpenedTicket(null)} />;
    }

    return (
        <div className="bg-primaryBlack flex flex-col lg:flex-row relative">
            <Sidebar />
            <div className="lg:ml-[16.6%] lg:w-[83.4%] overflow-x-hidden w-full bg-primaryBlack min-h-screen flex-grow absolute border-l-2 border-secondaryBlack">
                <Header />
                <main className="p-6">
                    <div className='bg-secondaryBlack mr-4 p-4'>
                        <div className="flex justify-between items-center mb-6">
                            <div className="relative w-full lg:w-1/3">
                                <input
                                    type="text"
                                    placeholder="Search for ticket"
                                    className="bg-primaryBlack text-white px-4 py-2 rounded-full w-3/4 pl-10"
                                />
                                <img src='/img/search-normal.png' className="absolute top-3 left-3 text-gray-500" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <CustomDropdown
                                        options={ticketOptions}
                                        selectedOption={selectedPriority}
                                        setSelectedOption={setSelectedPriority}
                                    />
                                </div>
                                <div className="relative w-40">
                                    <CustomDropdown
                                        options={timeframeOptions}
                                        selectedOption={selectedTimeframe}
                                        setSelectedOption={setSelectedTimeframe}
                                    />
                                </div>
                                <button
                                    onClick={onNewTicket}
                                    className="bg-primaryGreen text-primaryBlack px-4 py-2 rounded font-bold flex items-center gap-1"
                                >
                                    <img className='h-5 w-5' src='/img/message-edit.png' />
                                    New Ticket
                                </button>
                            </div>
                        </div>
                        <div className="p-4 rounded-lg">
                            {filteredTickets.map(ticket => (
                                <TicketCard key={ticket.id} ticket={ticket} onOpenTicket={handleOpenTicket} />
                            ))}
                        </div>
                        <div className="flex justify-end items-center mt-4 space-x-6">
                            <button className="text-customGray">Previous</button>
                            <div className="flex space-x-2 w-28">
                                <button className="bg-primaryGreen text-center text-primaryBlack px-4 py-2 rounded-lg font-bold w-1/2">1</button>
                                <button className="text-white border-white border-2 w-1/2 rounded-lg ">2</button>
                            </div>
                            <button className="text-customGray">Next</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TicketMain;
