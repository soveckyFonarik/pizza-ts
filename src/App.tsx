import React from 'react';
import './scss/app.scss';
import { Header, Sort, Categoryes, PizzaBlock } from './components';
// import pizass from './assets/pizzas.json';

function App(): React.ReactElement {
  const [items, setItems] = React.useState<any[]>([]);
  React.useEffect(() => {
    fetch('https://65d61378f6967ba8e3bd739e.mockapi.io/pizzas')
      .then(async (res) => await res.json())
      .then((json: any[]) => {
        setItems(json);
      })
      .catch(() => {});
  }, []);

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
            {items.map((obj: any) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
