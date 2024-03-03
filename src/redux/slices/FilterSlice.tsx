import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type SortItem, type FilterState } from '../../@types/Filters';
import qs from 'qs';
import { Sortlist } from '../../components/Sort';

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
    },

    setFilters(state, action: PayloadAction<string>) {
      const resQS = qs.parse(action.payload.substring(1));
      state.indexCategory = Number(resQS.indexCategory);
      state.currentPage = Number(resQS.currentPage);
      const findeSortProp = Sortlist.find((prop) => prop.sortProperty === resQS.sortProperty);
      if (findeSortProp != null) {
        state.activeSortItem = findeSortProp;
      }
    }
  }
});

export const { setCategoryId, setSortProperty, setSearchValue, setCurrentPage, setFilters } =
  FilterSlice.actions;

export default FilterSlice.reducer;
