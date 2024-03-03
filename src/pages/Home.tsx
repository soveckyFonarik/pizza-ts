import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { Sort, Categoryes, PizzaBlock, Skeleton, Pagination } from '../components';
import { useAppDispatch, useAppSelector } from '../redux';
import { changeIsLoading, setPizzas } from '../redux/slices/PizzaSlice';
import { type Pizza } from '../@types/Pizzas';
import { setFilters } from '../redux/slices/FilterSlice';
import { type UrlFilterSet } from '../@types/Filters';

export const Home: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMountd = React.useRef(false);

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

  /**
   * если был первый рендер - сохраняем в redux
   */
  React.useEffect(() => {
    const UrlParams: string = window.location.search;
    if (UrlParams === '') {
      isSearch.current = true;
      return;
    }

    dispatch(setFilters(UrlParams));
    isSearch.current = true;
  }, []);

  /**
   * бизнесс логика загрузка пицц с БЭ
   */
  const fetchPizzas = (): void => {
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
  };

  /**
   * грузим пиццы если был первый рендер и изменились параметры поиска
   */
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [indexCategory, activeSortItem, searchValue, currentPage]);

  /**
   * если только в redux поменялись фильтры - сохраняем в URL браузера
   */
  React.useEffect(() => {
    if (!isMountd.current) {
      isMountd.current = true;
      return;
    }
    const Filters: UrlFilterSet = {
      sortProperty: activeSortItem.sortProperty,
      indexCategory,
      currentPage
    };
    const queryString = qs.stringify(Filters);
    navigate(`?${queryString}`);
  }, [indexCategory, activeSortItem, searchValue, currentPage]);
  return (
    <>
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
