import React from 'react';
interface CategoriesProps {
  value: number;
  onChangeCategory: (idx: number) => void;
}
export const Categoryes: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
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
            className={value === key ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
