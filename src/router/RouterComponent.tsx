import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Test from '../components/Test';
import Store from '../pages/Store'; // Import the Store component

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/store" element={<Store />} /> {/* Define the route for the Store page */}
      {/* Add other routes here */}
    </Routes>
  );
};

export default RouterComponent;