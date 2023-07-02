import React from 'react';
import ProductList from './components/LandingPage';
import Form from './components/form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/form" element={<Form/>} />
          <Route path="/" element={<ProductList/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;