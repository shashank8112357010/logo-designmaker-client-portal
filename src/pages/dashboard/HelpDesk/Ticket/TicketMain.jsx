import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomDropdown } from '../../../../components/CustomSelect';
import TicketCard from './TicketCard';
import TicketView from './TicketView';
import CreateTicket from './CreateTicket';
import { getAllTickets } from '../../../../services/api.service';

const TicketMain = () => {
    const ticketOptions = [
        { label: 'All Tickets', value: 'All Tickets', color: 'bg-gray-500' },
        { label: 'New Tickets', value: 'New Tickets', color: 'bg-blue-500' },
        { label: 'On-Going Tickets', value: 'On-Going Tickets', color: 'bg-orange-500' },
        { label: 'Resolved Tickets', value: 'Resolved Tickets', color: 'bg-green-500' },
    ];

    const [selectedPriority, setSelectedPriority] = useState('All Tickets');
    const [openedTicket, setOpenedTicket] = useState(null);
    const [showCreateTicket, setShowCreateTicket] = useState(false);

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['tickets', selectedPriority],
        queryFn: () => getAllTickets(selectedPriority),
    });

    const handleOpenTicket = (ticket) => {
        setOpenedTicket(ticket);
    };

    const handleNewTicketClick = () => {
        setShowCreateTicket(true);
    };

    const handleBackFromCreateTicket = () => {
        setShowCreateTicket(false);
    };

    const handleBackFromTicketView = () => {
        setOpenedTicket(null);
    };

    const refetchTickets = () => {
        queryClient.invalidateQueries(['tickets']);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading tickets</div>;

    return (
        <div className="ticket-main-container px-4 pt-12">
            <div className={`fade ${!openedTicket && !showCreateTicket ? 'fade-enter-active' : 'fade-exit-active'}`}>
                {!openedTicket && !showCreateTicket && (
                    <main className="main">
                        <div className='bg-secondaryBlack mr-4 p-4'>
                            <div className="flex justify-between items-center mb-6">
                                <div className="relative w-full lg:w-1/3">
                                    <input
                                        type="text"
                                        placeholder="Search for ticket"
                                        className="bg-primaryBlack text-white px-4 py-2 rounded-full w-3/4 pl-10"
                                    />
                                    <img src='/img/search-normal.png' alt='search' className="absolute top-3 left-3 text-gray-500" />
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <CustomDropdown
                                            options={ticketOptions}
                                            selectedOption={selectedPriority}
                                            setSelectedOption={setSelectedPriority}
                                        />
                                    </div>
                                    <button
                                        onClick={handleNewTicketClick}
                                        className="bg-primaryGreen text-primaryBlack px-4 py-2 rounded font-bold flex items-center gap-1"
                                    >
                                        <img className='h-5 w-5' src='/img/message-edit.png' alt='' />
                                        New Ticket
                                    </button>
                                </div>
                            </div>
                            {data?.tickets?.map(ticket => (
                                <TicketCard key={ticket._id} ticketId={ticket._id} username={ticket.username} userId={ticket.userId} title={ticket.title} ticketType={ticket.ticketType} priorityStatus={ticket.priorityStatus} ticketBody={ticket.ticketBody} postedAt={ticket.postedAt} onOpenTicket={handleOpenTicket} />
                            ))}
                            <div className="flex justify-end items-center mt-4 space-x-6">
                                <button className="text-customGray">Previous</button>
                                <div className="flex space-x-2 w-28">
                                    <button className="bg-primaryGreen text-center text-primaryBlack px-4 py-2 rounded-lg font-bold w-1/2">1</button>
                                    <button className="text-white border-white border-2 w-1/2 rounded-lg">2</button>
                                </div>
                                <button className="text-customGray">Next</button>
                            </div>
                        </div>
                    </main>
                )}
            </div>

            <div className={`fade ${openedTicket ? 'fade-enter-active' : 'fade-exit-active'}`}>
                {openedTicket && (
                    <TicketView ticket={openedTicket} onBack={handleBackFromTicketView} />
                )}
            </div>

            <div className={`fade ${showCreateTicket ? 'fade-enter-active' : 'fade-exit-active'}`}>
                {showCreateTicket && (
                    <CreateTicket onBack={handleBackFromCreateTicket} onSuccess={refetchTickets} />
                )}
            </div>
        </div>
    );
};

export default TicketMain;
