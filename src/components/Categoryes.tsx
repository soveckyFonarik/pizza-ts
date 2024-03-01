import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux';
import { setCategoryId } from '../redux/slices/FilterSlice';

export const Categoryes: React.FC = () => {
  const dispatch = useAppDispatch();
  const onChangeCategory = (i: number): void => {
    dispatch(setCategoryId(i));
  };
  const { indexCategory } = useAppSelector((state) => state.filter);
  const categoriesNames = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categoriesNames.map((category: string, key: number) => (
          <li
            key={key}
            onClick={() => {
              onChangeCategory(key);
            }}
            className={indexCategory === key ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
