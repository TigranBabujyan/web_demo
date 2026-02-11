"use client";

import { useState, useEffect } from "react";
import WorksGrid from "../../components/WorksGrid";
import styles from "./page.module.css";

interface Work {
    id: number;
    title: string;
    category: string;
    description: string;
    mainImage: string;
}

export default function WorksPage() {
    const [works, setWorks] = useState<Work[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWorks = async (page: number, category: string) => {
        setIsLoading(true);
        try {
            const categoryParam = category === "all" ? "" : `&category=${category}`;
            const response = await fetch(
                `http://localhost:3001/api/works?page=${page}&limit=8${categoryParam}`
            );
            const data = await response.json();
            setWorks(data.works);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Failed to fetch works:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/works/categories");
            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchWorks(currentPage, selectedCategory);
    }, [currentPage, selectedCategory]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to first page when changing category
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <main className={styles.main}>
            <div className="container">
                <header className={styles.header}>
                    <span className={styles.label}>/ portfolio</span>
                    <h1 className={styles.title}>ALL WORKS</h1>
                    <p className={styles.subtitle}>
                        Concept-driven work turned into real outcomes.
                        <br />
                        Explore our full portfolio across motion, branding, UI/UX, and 3D design.
                    </p>
                </header>

                {isLoading ? (
                    <div className={styles.loading}>Loading works...</div>
                ) : (
                    <WorksGrid
                        works={works}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </main>
    );
}
