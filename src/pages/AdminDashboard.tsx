import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

// Dummy data
const totalTickets = 120;
const openTickets = 45;
const closedTickets = 75;
const ticketVolumeByDay = [
  { day: 'Mon', tickets: 10 },
  { day: 'Tue', tickets: 18 },
  { day: 'Wed', tickets: 15 },
  { day: 'Thu', tickets: 20 },
  { day: 'Fri', tickets: 25 },
  { day: 'Sat', tickets: 22 },
  { day: 'Sun', tickets: 10 },
];
const agentPerformance = [
  { agent: 'Agent A', closed: 30 },
  { agent: 'Agent B', closed: 20 },
  { agent: 'Agent C', closed: 15 },
  { agent: 'Agent D', closed: 10 },
];

const pieData = [
  { name: 'Open', value: openTickets },
  { name: 'Closed', value: closedTickets },
];
const pieColors = ['#1976d2', '#43a047'];

const AdminDashboard: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, margin: '2rem auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Ticket Stats */}
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Card sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Tickets</Typography>
              <Typography variant="h3" color="primary">{totalTickets}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Card sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6">Open vs Closed</Typography>
              <Box sx={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                      {pieData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
          <Card sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6">Ticket Volume (Last 7 Days)</Typography>
              <Box sx={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ticketVolumeByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="tickets" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
        {/* Agent Performance */}
        <Box sx={{ flex: '1 1 100%', minWidth: 300 }}>
          <Card sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Agent Performance (Tickets Closed)</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={agentPerformance}
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis dataKey="agent" type="category" />
                    <RechartsTooltip />
                    <Bar dataKey="closed" fill="#43a047" barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 