import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setCurrentPage } from '../../redux/slices/FilterSlice';

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const onChangePage = (page: number): void => {
    dispatch(setCurrentPage(page));
  };
  const { currentPage } = useAppSelector((state) => state.filter);
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => {
        onChangePage(event.selected + 1);
      }}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
};
