import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners';
import { CustomDropdown } from '../../../../components/CustomSelect';
import TicketCard from './TicketCard';
import TicketView from './TicketView';
import CreateTicket from './CreateTicket';
import NoData from './NoData';
import { getAllTickets, getTicketById } from '../../../../services/api.service';
import { XCircleIcon } from '@heroicons/react/24/outline';

const TicketMain = () => {
    const ticketOptions = [
        { label: 'All Tickets', value: '', color: 'bg-gray-500' },
        { label: 'New Tickets', value: 'New Ticket', color: 'bg-blue-500' },
        { label: 'On-Going Tickets', value: 'On-Going Ticket', color: 'bg-yellow-500' },
        { label: 'Resolved Tickets', value: 'Resolved Ticket', color: 'bg-green-500' },
    ];

    const [selectedPriority, setSelectedPriority] = useState(ticketOptions[0]);
    const [openedTicketId, setOpenedTicketId] = useState(null);
    const [showCreateTicket, setShowCreateTicket] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [totalTickets, setTotalTickets] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const queryClient = useQueryClient();

    const { data: ticketsData, isLoading: isLoadingTickets, refetch } = useQuery({
        queryKey: ['tickets', { pageNum, status: selectedPriority?.value, ticketTitle: searchInput }],
        queryFn: async () => {
            const response = await getAllTickets({ pageNum, status: selectedPriority?.value, ticketTitle: searchInput });
            return response;
        },
    });

    const { data: ticketData, isLoading: isLoadingTicket, isError: isErrorTicket, error: errorTicket } = useQuery({
        queryKey: ['ticket', openedTicketId],
        queryFn: async () => {
            const response = await getTicketById(openedTicketId);
            return response.ticket[0];
        },
        enabled: !!openedTicketId,
    });

    useEffect(() => {
        refetch();
    }, [searchInput, pageNum, selectedPriority, refetch]);

    useEffect(() => {
        if (ticketsData) {
            setTotalTickets(ticketsData.ticketCount);
        }
    }, [ticketsData]);

    const handleOpenTicket = (ticketId) => {
        setOpenedTicketId(ticketId);
    };

    const handleNewTicketClick = () => {
        setShowCreateTicket(true);
    };

    const handleBackFromCreateTicket = () => {
        setShowCreateTicket(false);
        setPageNum(1);
    };

    const handleBackFromTicketView = () => {
        setOpenedTicketId(null);
        refetch();
    };

    const refetchTickets = () => {
        queryClient.invalidateQueries(['tickets']);
        // queryClient.invalidateQueries(['searchTickets']);
    };

    const handleNextClick = () => {
        if (pageNum < Math.ceil(totalTickets / 3)) {
            setPageNum((prev) => prev + 1);
        }
    };

    const handlePreviousClick = () => {
        setPageNum((prev) => Math.max(prev - 1, 1));
    };

    const handleClearInput = () => {
      setSearchInput('');
    };


    useEffect(() => {
        setPageNum(1);
    }, [selectedPriority]);

    const totalPages = Math.ceil(totalTickets / 3);
    const pageButtons = [pageNum, pageNum + 1].filter((num) => num <= totalPages);
    const tickets = ticketsData?.tickets || [];

    return (
        <div className="ticket-main-container px-4 pt-12">
            <div className={`fade ${!openedTicketId && !showCreateTicket ? 'fade-enter-active' : 'fade-exit-active'}`}>
                {!openedTicketId && !showCreateTicket && (
                    <main className="main ">
                        <div className='bg-secondaryBlack mr-4 p-4 min-h-[75vh] relative'>
                            <div className="flex justify-between items-center mb-6">
                                <div className="relative w-full lg:w-1/3">
                                    <input
                                        type="text"
                                        placeholder="Search for ticket"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        className="bg-primaryBlack text-white px-4 py-2 rounded-full w-full pl-10"
                                    />
                                    {searchInput && (
                                        <button
                                            type="button"
                                            onClick={handleClearInput}
                                            className="absolute right-3 top-2.5"
                                        >
                                            <XCircleIcon className="w-6 h-6 text-white" />
                                        </button>
                                    )}
                                    <img src='/img/search-normal.png' alt='search' className="absolute top-3 left-3 text-gray-500" />
                                    {/* <button onClick={handleSearch} className="bg-primaryGreen text-primaryBlack px-4 py-2 rounded ml-2">Search</button> */}
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
                            {isLoadingTickets ? (
                                <div className=" h-[60vh] flex items-center justify-center ">
                                    <BounceLoader color={"#36D7B7"} />
                                </div>
                            ) : tickets.length > 0 ? (
                                <>
                                    <div className='mb-16'>
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
                                                profileImg={ticket?.profileImg}
                                                onOpenTicket={handleOpenTicket}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center space-x-4 mt-4 absolute bottom-2 left-5 right-4">
                                        <span className="text-primaryGreen ">
                                            Page {pageNum} of {totalPages}
                                        </span>
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={handlePreviousClick}
                                                className={` text-white px-4 py-2 rounded ${pageNum === 1 ? 'invisible' : ''}`}
                                                disabled={pageNum === 1}
                                            >
                                                Previous
                                            </button>
                                            {pageButtons.map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setPageNum(page)}
                                                    className={` font-medium px-5 py-2 rounded ${pageNum === page ? 'bg-primaryGreen text-primaryBlack' : 'border text-white border-white'}`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            <button
                                                onClick={handleNextClick}
                                                className={` text-white px-4 py-2 rounded ${pageNum >= totalPages ? 'invisible' : ''}`}
                                                disabled={pageNum >= totalPages}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <NoData message="No tickets found" />
                            )}
                        </div>
                    </main>
                )}
            </div>
            <div className={`fade ${openedTicketId ? 'fade-enter-active' : 'fade-exit-active'}`}>
                {openedTicketId && (
                    <TicketView
                        key={ticketData?._id}
                        ticketData={ticketData}
                        isLoading={isLoadingTicket}
                        isError={isErrorTicket}
                        error={errorTicket}
                        onBack={handleBackFromTicketView}
                    />
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
