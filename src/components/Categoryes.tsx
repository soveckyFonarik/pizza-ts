import React from 'react';

export const Categoryes: React.FC = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [indexCategory, setActiveIndex] = React.useState(0);
  return (
    <div className="categories">
      <ul>
        {categories.map((category: string, key: number) => (
          <li
            key={key}
            onClick={() => {
              setActiveIndex(key);
            }}
            className={indexCategory === key ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
