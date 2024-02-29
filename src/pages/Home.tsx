import React from 'react';

import { Sort, Categoryes, PizzaBlock, Skeleton, Pagination } from '../components';
import { type SearchProps, type SortItem } from '../@types/types';
import { SearchContext } from '../App';
export const Home: React.FC = (): React.ReactElement => {
  const { searchValue }: SearchProps = React.useContext(SearchContext);
  const [items, setItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, onChangePage] = React.useState(1);
  const [activeSortItem, setActiveSortItem] = React.useState<SortItem>({
    name: 'популярности',
    sortProperty: 'raiting'
  });
  const [indexCategory, setActiveCategoryIndex] = React.useState(0);

  const orderBy = activeSortItem.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = activeSortItem.sortProperty.replace('-', '');
  const searchBy = searchValue !== '' ? `&search=${searchValue}` : '';
  const cotegoryBy = indexCategory > 0 ? `category=${indexCategory}` : '';
  const pizzas = items
    // .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://65d61378f6967ba8e3bd739e.mockapi.io/pizzas?page=${currentPage}&limit=4&${cotegoryBy}&sortBy=${sortBy}&order=${orderBy}${searchBy}`
    )
      .then(async (res) => await res.json())
      .then((json: any[]) => {
        setItems(json);
        setIsLoading(false);
      })
      .catch(() => {});
    window.scrollTo(0, 0);
  }, [indexCategory, activeSortItem, searchValue, currentPage]);

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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};
