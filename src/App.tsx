import React, { type ReactElement } from 'react';
import './scss/app.scss';
import { Header, Sort, Categoryes, PizzaBlock } from './components';
import pizass from './assets/pizzas.json';
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
            {pizass.map((obj: any) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
