"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Tag from "./Tag";
import Pagination from "./Pagination";
import styles from "./WorksGrid.module.css";

interface Work {
    id: number;
    title: string;
    category: string;
    description: string;
    mainImage: string;
}

interface WorksGridProps {
    works: Work[];
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function WorksGrid({
    works,
    categories,
    selectedCategory,
    onCategoryChange,
    currentPage,
    totalPages,
    onPageChange,
}: WorksGridProps) {
    return (
        <div className={styles.wrapper}>
            {/* Category Filters */}
            <div className={styles.filters}>
                <Tag
                    label="All"
                    selected={selectedCategory === "all"}
                    onClick={() => onCategoryChange("all")}
                />
                {categories.map((category) => (
                    <Tag
                        key={category}
                        label={category}
                        selected={selectedCategory === category}
                        onClick={() => onCategoryChange(category)}
                    />
                ))}
            </div>

            {/* Works Grid */}
            <div className={styles.grid}>
                {works.map((work, index) => (
                    <motion.div
                        key={work.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link href={`/works/${work.id}`} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={work.mainImage}
                                    alt={work.title}
                                    className={styles.image}
                                    loading="lazy"
                                />
                                <div className={styles.overlay}>
                                    <span className={styles.viewDetails}>View Details →</span>
                                </div>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.category}>{work.category}</span>
                                <h3 className={styles.title}>{work.title}</h3>
                                <p className={styles.description}>{work.description}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
}
