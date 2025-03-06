import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/Navbar';
import LeftMenu from './components/LeftMenu';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import RouterComponent from './router/RouterComponent';

const drawerWidth = 240;

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

        <NavBar />
        <LeftMenu />
        <Box
          sx={{ backgroundColor: '#BCBCBC', flexGrow: 1, height: '100vh' }}
        >
          <Toolbar />
          <RouterComponent />
        </Box>

      </Box>
    </Router>
  );
};

export default App;