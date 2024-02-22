import React from 'react';
import styles from './NotFound.module.scss';
export const NotFoudBlock = (): React.ReactElement => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😔</span> <br />
        Ничего не найдено:
      </h1>
      <p className={styles.description}>К сожалению ничего не найдено</p>
    </div>
  );
};
