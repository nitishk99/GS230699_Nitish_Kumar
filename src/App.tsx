import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    </Provider>
  );
}

export default App;