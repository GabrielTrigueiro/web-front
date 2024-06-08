import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Products from './app/pages/products/products';

function App() {
  return (
    <Routes>
      <Route path="/produtos" element={<Products />} />
      <Route path="*" element={<Navigate to="/produtos" />} />
    </Routes>
  );
}

export default App;
