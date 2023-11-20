import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({ dogsPerPage, allDogs, pagination, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.crumbs}>
        {pageNumbers.map((number) => (
          <li
            className={currentPage === number ? styles.crumb__active : styles.crumb}
            key={number}
            onClick={() => pagination(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
}


