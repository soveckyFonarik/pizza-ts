import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type SortItem, type FilterState } from '../../@types/types';

const initialState: FilterState = {
  indexCategory: 0,
  searchValue: '',
  activeSortItem: {
    name: 'популярности',
    sortProperty: 'raiting'
  },
  currentPage: 1
};

export const FilterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.indexCategory = action.payload;
    },

    setSortProperty(state, action: PayloadAction<SortItem>) {
      state.activeSortItem = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    }
  }
});

export const { setCategoryId, setSortProperty, setSearchValue, setCurrentPage } =
  FilterSlice.actions;

export default FilterSlice.reducer;
