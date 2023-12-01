import React from 'react';

const PaginationComponent = ({ currentPage, pageSize, totalItems, onSelectPage }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onSelectPage(page);
        }
    };

    return (
        <nav>
            <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageClick(page)}>
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default PaginationComponent;
