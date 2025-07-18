import React from 'react';
import type { Ticket } from '../types/ticket';

const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Assignee:</strong> {ticket.assignee}</p>
      <p><small>Created: {new Date(ticket.createdAt).toLocaleString()}</small></p>
    </div>
  );
};

export default TicketCard;
