import React, { useEffect, useState } from 'react';
import ticketsJson from '../data/tickets.json';
import TicketCard from '../components/TicketCard';
import type { Ticket } from '../slices/ticketsSlice';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Pagination,
  IconButton,
} from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTickets } from '../slices/ticketsSlice';

const TICKETS_PER_PAGE = 5;

type SortField = 'createdAt' | 'priority' | 'status' | 'title';
type SortDirection = 'asc' | 'desc';

const sortPriority = (a: string, b: string, direction: SortDirection) => {
  const order: Record<'Low' | 'Medium' | 'High', number> = { Low: 1, Medium: 2, High: 3 };
  return direction === 'asc' ? order[a as 'Low' | 'Medium' | 'High'] - order[b as 'Low' | 'Medium' | 'High'] : order[b as 'Low' | 'Medium' | 'High'] - order[a as 'Low' | 'Medium' | 'High'];
};
const sortStatus = (a: string, b: string, direction: SortDirection) => {
  const order: Record<'Open' | 'In Progress' | 'Closed', number> = { Open: 1, 'In Progress': 2, Closed: 3 };
  return direction === 'asc' ? order[a as 'Open' | 'In Progress' | 'Closed'] - order[b as 'Open' | 'In Progress' | 'Closed'] : order[b as 'Open' | 'In Progress' | 'Closed'] - order[a as 'Open' | 'In Progress' | 'Closed'];
};

const TicketList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tickets = useAppSelector((state) => state.tickets.tickets);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [page, setPage] = useState<number>(1);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const navigate = useNavigate();

  useEffect(() => {
    if (tickets.length === 0) {
      dispatch(setTickets(ticketsJson as Ticket[]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = statusFilter === 'All' || ticket.status === statusFilter;
    const priorityMatch = priorityFilter === 'All' || ticket.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  // Sorting logic
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortField === 'createdAt') {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
    }
    if (sortField === 'priority') {
      return sortPriority(a.priority, b.priority, sortDirection);
    }
    if (sortField === 'status') {
      return sortStatus(a.status, b.status, sortDirection);
    }
    if (sortField === 'title') {
      if (a.title < b.title) return sortDirection === 'asc' ? -1 : 1;
      if (a.title > b.title) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
    return 0;
  });

  // Pagination logic
  const pageCount = Math.ceil(sortedTickets.length / TICKETS_PER_PAGE);
  const paginatedTickets = sortedTickets.slice(
    (page - 1) * TICKETS_PER_PAGE,
    page * TICKETS_PER_PAGE
  );

  // Reset to page 1 if filters or sort change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, priorityFilter, sortField, sortDirection]);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        🎫 All Tickets
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
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

        {/* Sorting Controls */}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            label="Sort By"
          >
            <MenuItem value="createdAt">Created At</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          color="primary"
          sx={{ alignSelf: 'center' }}
          aria-label="Toggle sort direction"
        >
          {sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
        </IconButton>
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
