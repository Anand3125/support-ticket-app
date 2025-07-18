import TicketList from './pages/TicketList';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import { useThemeToggle } from './context/ThemeContext';

// Optionally import these if you're using them somewhere else
// import Button from './components/Button';
// import Input from './components/Input';
// import viteLogo from '/vite.svg';
// import reactLogo from './assets/react.svg';

function App() {
  const { mode, toggleTheme } = useThemeToggle();

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>
      </Box>
      <h1>Ticket Management System</h1>
      <TicketList />
    </Box>
  );
}

export default App;
