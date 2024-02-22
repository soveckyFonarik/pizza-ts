import React from 'react';
import './scss/app.scss';
import { Header } from './components';
import { Home, NotFoud, Cart } from './pages';
import { Route, Routes } from 'react-router-dom';
// import pizass from './assets/pizzas.json';

function App(): React.ReactElement {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoud />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
