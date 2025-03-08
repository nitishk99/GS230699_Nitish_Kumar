import { BrowserRouter as Router } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Navbar from './components/Navbar';
import LeftMenu from './components/LeftMenu';
import PageRouter from './router/PageRouter';
import { useEffect } from 'react';
import { AppDispatch } from './redux/store'; 
import { useDispatch } from 'react-redux';
import { fetchSkus } from './redux/thunks/skuThunks';
import { fetchStores } from './redux/thunks/storeThunks';

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSkus());
    dispatch(fetchStores());
  }, [dispatch]);

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