import React from 'react';
import './scss/app.scss';
import { Header } from './components';
import { Home, NotFoud, Cart } from './pages';
import { Route, Routes } from 'react-router-dom';
// import pizass from './assets/pizzas.json';

function App(): React.ReactElement {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<Home searchValue={searchValue} setSearchValue={setSearchValue} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFoud />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
