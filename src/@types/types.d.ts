export interface SortItem {
  name: string;
  sortProperty: string;
}

export interface SearchProps {
  searchValue: string;
  setSearchValue: (idx: string) => void;
}
