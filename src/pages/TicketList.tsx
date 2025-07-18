import React, { useState, useEffect } from 'react';
import ticketsJson from '../data/tickets.json';
import TicketCard from '../components/TicketCard';
import type { Ticket } from '../types/ticket';


const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

 
  
  useEffect(() => {
    setTickets(ticketsJson as Ticket[]);
  }, []);
  
  
  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 All Tickets</h2>
      {tickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;
