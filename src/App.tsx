import React, { type ReactElement } from 'react';
import './scss/app.scss';
import { Header, Sort, Categoryes, PizzaBlock } from './components';

function App(): ReactElement {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categoryes />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaBlock price={30} />
            <PizzaBlock price={60} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
