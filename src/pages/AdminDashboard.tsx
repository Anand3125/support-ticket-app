import React from 'react';
import { Box, Typography } from '@mui/material';

const AdminDashboard: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 600, margin: '2rem auto', p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography>
        Welcome, Admin! Here you can manage the system.
      </Typography>
    </Box>
  );
};

export default AdminDashboard; 