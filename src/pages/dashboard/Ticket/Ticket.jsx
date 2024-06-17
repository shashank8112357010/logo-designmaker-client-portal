import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TicketMain from './TicketMain';
import CreateTicket from './CreateTicket';

const Ticket = () => {
    const [view, setView] = useState('ticketMain'); // 'ticketMain' or 'createTicket'

    const handleBack = () => {
        setView('ticketMain');
    };

    return (
        <div className="relative">
            <AnimatePresence>
                {view === 'ticketMain' && (
                    <motion.div
                        key="ticketMain"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute w-full h-full"
                    >
                        <TicketMain onNewTicket={() => setView('createTicket')} />
                    </motion.div>
                )}
                {view === 'createTicket' && (
                    <motion.div
                        key="createTicket"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute w-full h-full"
                    >
                        <CreateTicket onBack={handleBack} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Ticket;
