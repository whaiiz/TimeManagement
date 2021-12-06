import React, { useState, useEffect } from 'react'
import '../styles/pagination.css';

export default function Pagination({itemsPerPage, itemsCount, paginate}) {
    const [pageNumbers, setPageNumbers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    let changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        paginate(pageNumber);
    }
    
    useEffect(() => {
        let setupPagination = () => {
            let newPageNumbers = [];
    
            for (let i = 1; i <= Math.ceil(itemsCount / itemsPerPage); i++) {
                newPageNumbers.push(i);
            }
    
            setPageNumbers(newPageNumbers);
        }

        setupPagination();

    }, [itemsPerPage, itemsCount]);

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <span className={`pagination-item ${currentPage === number ? "selected-item" : ""}`} 
                           onClick={() => changePage(number)}>
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
