"use client";

import styles from "./Pagination.module.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    // Show pages around current page
    if (currentPage > 3) {
        pages.push("...");
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
    }

    // Show ellipsis before last page if needed
    if (currentPage < totalPages - 2) {
        pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return (
        <nav className={styles.pagination} aria-label="Pagination">
            <button
                className={styles.arrow}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <div className={styles.pages}>
                {pages.map((page, index) => {
                    if (page === "...") {
                        return (
                            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            className={`${styles.page} ${page === currentPage ? styles.active : ""}`}
                            onClick={() => onPageChange(page as number)}
                            aria-label={`Page ${page}`}
                            aria-current={page === currentPage ? "page" : undefined}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                className={styles.arrow}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </nav>
    );
}
