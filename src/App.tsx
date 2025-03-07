
import { BrowserRouter as Router } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Navbar from './components/Navbar';
import LeftMenu from './components/LeftMenu';
import PageRouter from './router/PageRouter';


const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
        <Navbar />
        <LeftMenu />
        <Box
          sx={{ backgroundColor: '#BCBCBC', flexGrow: 1, height: '100vh' }}
        >
          <Toolbar />
          <PageRouter />
        </Box>
      </Box>
    </Router>
  );
};

export default App;