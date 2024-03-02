import React from 'react';
import axios from 'axios';
import { Sort, Categoryes, PizzaBlock, Skeleton, Pagination } from '../components';
import { useAppDispatch, useAppSelector } from '../redux';
import { changeIsLoading, setPizzas } from '../redux/slices/PizzaSlice';
import { type Pizza } from '../@types/Pizzas';

export const Home: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  const { activeSortItem, indexCategory, searchValue, currentPage } = useAppSelector(
    (state) => state.filter
  );
  const setIsLoading = (value: boolean): void => {
    dispatch(changeIsLoading(value));
  };
  const setItems = (value: Pizza[]): void => {
    dispatch(setPizzas(value));
  };
  const { pizzas, isLoading } = useAppSelector((state) => state.pizzas);
  // eslint check fix
  if (activeSortItem.sortProperty === undefined) {
    activeSortItem.sortProperty = '';
  }
  const pizzasBlock = pizzas.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  React.useEffect(() => {
    const orderBy = activeSortItem.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = activeSortItem.sortProperty.replace('-', '');
    const searchBy = searchValue !== '' ? `&search=${searchValue}` : '';
    const cotegoryBy = indexCategory > 0 ? `category=${indexCategory}` : '';
    setIsLoading(true);

    axios
      .get<Pizza[]>(
        `https://65d61378f6967ba8e3bd739e.mockapi.io/pizzas?page=${currentPage}&limit=4&${cotegoryBy}&sortBy=${sortBy}&order=${orderBy}${searchBy}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setItems([]);
        setIsLoading(true);
      });
    window.scrollTo(0, 0);
  }, [indexCategory, activeSortItem, searchValue, currentPage]);

  return (
    <>
      {' '}
      <div className="content__top">
        <Categoryes />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzasBlock}</div>
      <Pagination />
    </>
  );
};
