import React from 'react';

import { Sort, Categoryes, PizzaBlock, Skeleton } from '../components';
import { type SortItem } from '../@types/types';
export const Home = (): React.ReactElement => {
  const [items, setItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeSortItem, setActiveSortItem] = React.useState<SortItem>({
    name: 'популярности',
    sortProperty: 'raiting'
  });
  const [indexCategory, setActiveCategoryIndex] = React.useState(0);

  const orderBy = activeSortItem.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = activeSortItem.sortProperty.replace('-', '');
  const cotegoryBy = indexCategory > 0 ? `category=${indexCategory}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://65d61378f6967ba8e3bd739e.mockapi.io/pizzas?${cotegoryBy}&sortBy=${sortBy}&order=${orderBy}`
    )
      .then(async (res) => await res.json())
      .then((json: any[]) => {
        setItems(json);
        setIsLoading(false);
      })
      .catch(() => {});
    window.scrollTo(0, 0);
  }, [indexCategory, activeSortItem]);

  return (
    <>
      {' '}
      <div className="content__top">
        <Categoryes
          value={indexCategory}
          onChangeCategory={(i: number): void => {
            setActiveCategoryIndex(i);
          }}
        />
        <Sort
          value={activeSortItem}
          onChangeSort={(value: SortItem): void => {
            setActiveSortItem(value);
          }}
        />
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
