import React from 'react';
import './scss/app.scss';
import { Header } from './components';
import { Home, NotFoud, Cart } from './pages';
import { Route, Routes } from 'react-router-dom';
import { type SearchProps } from './@types/types';
// import pizass from './assets/pizzas.json';

export const SearchContext = React.createContext<SearchProps>({
  searchValue: '',
  setSearchValue: () => {}
});

function App(): React.ReactElement {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
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
      </SearchContext.Provider>
    </div>
  );
}

export default App;
