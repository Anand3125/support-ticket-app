import React from 'react';
import type { Ticket } from '../types/ticket';
import { Paper, useTheme } from '@mui/material';

const TicketCard: React.FC<{ ticket: Ticket; onClick?: () => void }> = ({ ticket, onClick }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={2}
      sx={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: theme.palette.background.paper,
        transition: 'background 0.3s',
      }}
      onClick={onClick}
    >
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Assignee:</strong> {ticket.assignee}</p>
      <p><small>Created: {new Date(ticket.createdAt).toLocaleString()}</small></p>
    </Paper>
  );
};

export default TicketCard;
