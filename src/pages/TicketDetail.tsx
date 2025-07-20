import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ticketsJson from '../data/tickets.json';
import { Card, CardContent, Typography, Button, Box, useTheme } from '@mui/material';
import type { Ticket } from '../types/ticket';

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const ticket = (ticketsJson as Ticket[]).find(t => t.id === Number(id));

  if (!ticket) {
    return <Typography variant="h6">Ticket not found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '2rem auto' }}>
      <Card sx={{ backgroundColor: theme.palette.background.paper, transition: 'background 0.3s' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {ticket.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {ticket.description}
          </Typography>
          <Typography variant="subtitle1"><strong>Status:</strong> {ticket.status}</Typography>
          <Typography variant="subtitle1"><strong>Priority:</strong> {ticket.priority}</Typography>
          <Typography variant="subtitle1"><strong>Assignee:</strong> {ticket.assignee}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Created: {new Date(ticket.createdAt).toLocaleString()}
          </Typography>
          <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate('/')}>Back to List</Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TicketDetail; 