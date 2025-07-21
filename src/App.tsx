import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TicketList from './pages/TicketList';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import TicketDetail from './pages/TicketDetail';
import { useThemeToggle } from './context/ThemeContext';
import CreateTicketForm from './pages/CreateTicketForm';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  const { mode, toggleTheme } = useThemeToggle();

  return (
    <BrowserRouter>
      <Navbar />
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        <Box sx={{ position: 'absolute', top: 96, right: 16, zIndex: 1201 }}>
          <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
        </Box>
        <h1>Ticket Management System</h1>
       
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TicketList />} />
            <Route path="/ticket/:id" element={<TicketDetail />} />
          </Route>
          <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
        <CreateTicketForm />
      </Box>
    </BrowserRouter>
  );
}

export default App;
