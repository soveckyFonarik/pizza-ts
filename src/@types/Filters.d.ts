export interface SortItem {
  name: string;
  sortProperty: string;
}

export interface SearchProps {
  searchValue: string;
  setSearchValue: (idx: string) => void;
}
export interface CategoriesProps {
  value: number;
  onChangeCategory: (idx: number) => void;
}

export interface FilterState {
  indexCategory: number;
  activeSortItem: SortItem;
  searchValue: string;
  currentPage: number;
}

export interface PaginationProps {
  currentPage: number;
  onChangePage: (page: number) => void;
}

export interface FilterSet {
  activeSortItem: SortItem;
  indexCategory: number;
  currentPage: number;
}

export interface UrlFilterSet {
  sortProperty: string;
  indexCategory: number;
  currentPage: number;
}
