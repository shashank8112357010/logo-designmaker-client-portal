import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import TicketMain from './TicketMain';
import CreateTicket from './CreateTicket';
import TicketView from './TicketView';
import Sidebar from '../Sidebar';
import Header from '../Header';

function Ticket() {
  const [activeComponent, setActiveComponent] = useState('ticketMain');
  const renderComponent = () => {
    switch (activeComponent) {
      case 'ticketMain':
        return <TicketMain onNewTicketClick={() => setActiveComponent('createTicket')} />;
      case 'createTicket':
        return <CreateTicket onBack={() => setActiveComponent('ticketMain')} />;
      case 'ticketView':
        return <TicketView  onBack={() => setActiveComponent('ticketView')} />;
      default:
        return <TicketMain onNewTicketClick={() => setActiveComponent('createTicket')} />;
    }
  };

  return (
    <div className="bg-primaryBlack flex flex-col lg:flex-row relative">
      <Sidebar />
      <div className="lg:ml-[16.7%] lg:w-[83.3%]   w-full bg-primaryBlack min-h-screen flex-grow absolute border-l-2 border-secondaryBlack">
        <Header />
        <TransitionGroup className="component-wrapper">
          <CSSTransition
            key={activeComponent}
            timeout={300}
            classNames="fade"
          >
            {renderComponent()}
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}

export default Ticket;

