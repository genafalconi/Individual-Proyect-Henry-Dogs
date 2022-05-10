import React from "react";
import styles from './Pagination.module.css'

export default function Pagination({ razPerPage, razas, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(razas / razPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className={styles.index}>
            <ul>
                {pageNumbers &&
                    pageNumbers.map(num => (
                        <li className={styles.list} key={num}>
                            <a className={styles.a} href="#/" onClick={() => {paginado(num)}}>{num}-</a>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}