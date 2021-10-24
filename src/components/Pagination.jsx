import React, {useState} from 'react'
import '../styles/pagination.css';

export default function Pagination({itemsPerPage, itemsCount, paginate}) {
    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        paginate(pageNumber);
    }
    
    for (let i = 1; i <= Math.ceil(itemsCount / itemsPerPage); i++) pageNumbers.push(i);

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a href="!#" 
                            className={`pagination-item ${currentPage === number ? "selected-item" : ""}`} 
                            onClick={() => changePage(number)}>
                        {number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
