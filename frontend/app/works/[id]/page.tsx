"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

interface Work {
    id: number;
    title: string;
    category: string;
    description: string;
    year: number;
    client: string;
    mainImage: string;
    images: string[];
}

export default function WorkInnerPage() {
    const params = useParams();
    const [work, setWork] = useState<Work | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWork = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/works/${params.id}`);
                if (!response.ok) throw new Error("Work not found");
                const data = await response.json();
                setWork(data);
            } catch (err) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) {
            fetchWork();
        }
    }, [params.id]);

    if (isLoading) {
        return (
            <main className={styles.main}>
                <div className={styles.loading}>Loading...</div>
            </main>
        );
    }

    if (error || !work) {
        return (
            <main className={styles.main}>
                <div className={styles.error}>
                    <h1>Work Not Found</h1>
                    <Link href="/works" className={styles.backLink}>
                        ← Back to Works
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            {/* Hero Image */}
            <motion.div
                className={styles.hero}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <img src={work.mainImage} alt={work.title} className={styles.heroImage} />
            </motion.div>

            {/* Content */}
            <div className="container">
                <div className={styles.content}>
                    {/* Back Link */}
                    <Link href="/works" className={styles.backLink}>
                        ← Back to Works
                    </Link>

                    {/* Project Info */}
                    <motion.div
                        className={styles.info}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className={styles.category}>{work.category}</span>
                        <h1 className={styles.title}>{work.title}</h1>

                        <div className={styles.meta}>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Client</span>
                                <span className={styles.metaValue}>{work.client}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <span className={styles.metaLabel}>Year</span>
                                <span className={styles.metaValue}>{work.year}</span>
                            </div>
                        </div>

                        <p className={styles.description}>{work.description}</p>
                    </motion.div>

                    {/* Additional Images */}
                    {work.images && work.images.length > 0 && (
                        <div className={styles.gallery}>
                            {work.images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.galleryItem}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                >
                                    <img src={image} alt={`${work.title} ${index + 1}`} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
