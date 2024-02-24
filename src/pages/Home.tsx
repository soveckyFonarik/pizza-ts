import React from 'react';

import { Sort, Categoryes, PizzaBlock, Skeleton } from '../components';
export const Home = (): React.ReactElement => {
  const [items, setItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    fetch('https://65d61378f6967ba8e3bd739e.mockapi.io/pizzas')
      .then(async (res) => await res.json())
      .then((json: any[]) => {
        setItems(json);
        setIsLoading(false);
      })
      .catch(() => {});
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {' '}
      <div className="content__top">
        <Categoryes />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  );
};
