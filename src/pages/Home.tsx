import React from 'react';
// import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { type UrlFilterSet } from '../@types/Filters';
import { type SearchPizzaParams } from '../@types/Pizzas';
import { Categoryes, Pagination, PizzaBlock, Skeleton, Sort } from '../components';
import { fetchPizzass, useAppDispatch, useAppSelector } from '../redux';
import { setFilters } from '../redux/slices/FilterSlice';

export const Home: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMountd = React.useRef(false);

  const { activeSortItem, indexCategory, searchValue, currentPage } = useAppSelector(
    (state) => state.filter
  );

  const { pizzas, status } = useAppSelector((state) => state.pizzas);
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
      return;
    }

    dispatch(setFilters(UrlParams));
  }, []);

  /**
   * бизнесс логика загрузка пицц с БЭ
   */
  const getchPizzas = async (): Promise<any> => {
    const orderBy = activeSortItem.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = activeSortItem.sortProperty.replace('-', '');
    const searchBy = searchValue !== '' ? `&search=${searchValue}` : '';
    const cotegoryBy = indexCategory > 0 ? `category=${indexCategory}` : '';
    const urlParams: SearchPizzaParams = {
      cotegoryBy,
      sortBy,
      order: orderBy,
      search: searchBy,
      currentPage: String(currentPage)
    };
    dispatch<any>(fetchPizzass(urlParams));
  };

  /**
   * грузим пиццы если был первый рендер и изменились параметры поиска
   */
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getchPizzas().catch((oError) => {
        console.log(oError);
      });
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
      <div className="content__items">{status !== 'completed' ? skeletons : pizzasBlock}</div>
      <Pagination />
    </>
  );
};
