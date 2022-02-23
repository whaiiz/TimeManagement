import React, { useState, useEffect } from 'react'
import '../../styles/common/pagination.css';

export default function Pagination({itemsPerPage, itemsCount, paginate}) {
    const [pageNumbers, setPageNumbers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    let changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        paginate(pageNumber);
    }
    
    useEffect(() => {
        let newPageNumbers = [];
    
        for (let i = 1; i <= Math.ceil(itemsCount / itemsPerPage); i++) {
            newPageNumbers.push(i);
        }

        setPageNumbers(newPageNumbers);
        setCurrentPage(1);

    }, [itemsPerPage, itemsCount]);

    return (
        <React.Fragment>
            {pageNumbers.length > 1 && <nav>
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
            </nav>}
        </React.Fragment>
    )
}
