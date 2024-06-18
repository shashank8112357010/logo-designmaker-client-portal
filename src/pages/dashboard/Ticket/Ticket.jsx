import React, { useState } from 'react';
import TicketMain from './TicketMain';
import CreateTicket from './CreateTicket';
import TicketView from './TicketView';

function Ticket() {
  const [activeComponent, setActiveComponent] = useState('ticketMain');
  const renderComponent = () => {
    switch (activeComponent) {
      case 'ticketMain':
        return <TicketMain onNewTicketClick={() => setActiveComponent('createTicket')} />;
      case 'createTicket':
        return <CreateTicket onBack={() => setActiveComponent('ticketMain')} />;
      case 'ticketView':
        return <TicketView onBack={() => setActiveComponent('ticketView')} />;
      default:
        return <TicketMain onNewTicketClick={() => setActiveComponent('createTicket')} />;
    }
  };

  return (
  <div>
        {renderComponent()}
      </div>
    
  );
}

export default Ticket;

