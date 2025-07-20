import React, { useEffect, useState } from 'react';
import ticketsJson from '../data/tickets.json';
import TicketCard from '../components/TicketCard';
import type { Ticket } from '../types/ticket';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Pagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TICKETS_PER_PAGE = 5;

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    setTickets(ticketsJson as Ticket[]);
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = statusFilter === 'All' || ticket.status === statusFilter;
    const priorityMatch = priorityFilter === 'All' || ticket.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  // Pagination logic
  const pageCount = Math.ceil(filteredTickets.length / TICKETS_PER_PAGE);
  const paginatedTickets = filteredTickets.slice(
    (page - 1) * TICKETS_PER_PAGE,
    page * TICKETS_PER_PAGE
  );

  // Reset to page 1 if filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, priorityFilter]);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        🎫 All Tickets
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            label="Priority"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {paginatedTickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} onClick={() => navigate(`/ticket/${ticket.id}`)} />
      ))}

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default TicketList;
