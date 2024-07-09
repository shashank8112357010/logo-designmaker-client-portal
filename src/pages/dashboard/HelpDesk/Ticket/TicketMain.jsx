import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomDropdown } from '../../../../components/CustomSelect';
import TicketCard from './TicketCard';
import TicketView from './TicketView';
import CreateTicket from './CreateTicket';
import NoData from './NoData'; // Import the NoData component
import { getAllTickets, getTicketById } from '../../../../services/api.service';

const TicketMain = () => {
    const ticketOptions = [
        { label: 'All Tickets', value: '', color: 'bg-gray-500' },
        { label: 'New Tickets', value: 'New Ticket', color: 'bg-blue-500' },
        { label: 'On-Going Tickets', value: 'On-Going Ticket', color: 'bg-orange-500' },
        { label: 'Resolved Tickets', value: 'Resolved Ticket', color: 'bg-green-500' },
    ];

    const timeframeOptions = [
        { label: 'This Week', value: 'This Week' },
        { label: 'This Month', value: 'This Month' },
    ];

    const [selectedPriority, setSelectedPriority] = useState(ticketOptions[0]);
    const [selectedTimeframe, setSelectedTimeframe] = useState(timeframeOptions[0]);
    const [openedTicketId, setOpenedTicketId] = useState(null);
    const [showCreateTicket, setShowCreateTicket] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [totalTickets, setTotalTickets] = useState(0);

    const queryClient = useQueryClient();

    const { data: ticketsData, refetch } = useQuery({
        queryKey: ['tickets', { pageNum, status: selectedPriority?.value }],
        queryFn: async () => {
            const response = await getAllTickets({ pageNum, status: selectedPriority?.value });
            setTotalTickets(response.ticketCount);
            return response;
        },
    });

    useEffect(() => {
        refetch();
    }, [selectedPriority, pageNum, selectedTimeframe]);

    const { data: ticketData, isLoading: isLoadingTicket, isError: isErrorTicket, error: errorTicket } = useQuery({
        queryKey: ['ticket', openedTicketId],
        queryFn: () => getTicketById(openedTicketId),
        enabled: !!openedTicketId,
    });

    const handleOpenTicket = (ticketId) => {
        setOpenedTicketId(ticketId);
    };

    const handleNewTicketClick = () => {
        setShowCreateTicket(true);
    };

    const handleBackFromCreateTicket = () => {
        setShowCreateTicket(false);
    };

    const handleBackFromTicketView = () => {
        setOpenedTicketId(null);
    };

    const refetchTickets = () => {
        queryClient.invalidateQueries(['tickets']);
    };

    const handleNextClick = () => {
        if (pageNum < Math.ceil(totalTickets / 3)) {
            setPageNum(prev => prev + 1);
        }
    };

    const handlePreviousClick = () => {
        setPageNum(prev => Math.max(prev - 1, 1));
    };

    useEffect(() => {
        setPageNum(1);
    }, [selectedPriority, selectedTimeframe]);

    const pageButtons = [pageNum, pageNum + 1].filter(num => num <= Math.ceil(totalTickets / 3));
    const tickets = ticketsData?.tickets || [];

    return (
        <div className="ticket-main-container px-4 pt-12">
            <div className={`fade ${!openedTicketId && !showCreateTicket ? 'fade-enter-active' : 'fade-exit-active'}`}>
                {!openedTicketId && !showCreateTicket && (
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
                                    <div className="relative w-40">
                                        <CustomDropdown
                                            options={timeframeOptions}
                                            selectedOption={selectedTimeframe}
                                            setSelectedOption={setSelectedTimeframe}
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
                            {tickets.length > 0 ? (
                                <>
                                    {tickets.map(ticket => (
                                        <TicketCard
                                            key={ticket._id}
                                            ticketId={ticket._id}
                                            username={ticket.username}
                                            userId={ticket.userId}
                                            title={ticket.title}
                                            ticketType={ticket.ticketType}
                                            priorityStatus={ticket.priorityStatus}
                                            ticketBody={ticket.ticketBody}
                                            postedAt={ticket.postedAt}
                                            onOpenTicket={handleOpenTicket}
                                        />
                                    ))}
                                    <div className="flex justify-end items-center mt-4 space-x-6">
                                        <button className="text-customGray" onClick={handlePreviousClick}>Previous</button>
                                        <div className="flex space-x-2 w-28">
                                            {pageButtons.map((num) => (
                                                <button
                                                    key={num}
                                                    className={`text-center px-4 py-2 rounded-lg font-bold ${pageNum === num ? 'bg-primaryGreen text-primaryBlack' : 'text-white border-white border-2'}`}
                                                    onClick={() => setPageNum(num)}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                        <button className="text-customGray" onClick={handleNextClick} disabled={pageNum >= Math.ceil(totalTickets / 3)}>Next</button>
                                    </div>
                                </>
                            ) : (
                                <NoData /> // Display NoData component when there are no tickets
                            )}
                        </div>
                    </main>
                )}
            </div>

            <div className={`fade ${openedTicketId ? 'fade-enter-active' : 'fade-exit-active'}`}>
                {openedTicketId && !isLoadingTicket && ticketData && (
                    <TicketView
                        ticketId={ticketData?.ticket._id}
                        username={ticketData?.ticket.username}
                        priorityStatus={ticketData?.ticket.priorityStatus}
                        ticketTitle={ticketData?.ticket.title}
                        ticketType={ticketData?.ticket.ticketType}
                        ticketBody={ticketData?.ticket.ticketBody}
                        postedAt={ticketData?.ticket.postedAt}
                        replies={ticketData?.ticket.replies}
                        onBack={handleBackFromTicketView}
                    />
                )}
                {isLoadingTicket && <div>Loading...</div>}
                {isErrorTicket && <div>Error: {errorTicket.message}</div>}
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
