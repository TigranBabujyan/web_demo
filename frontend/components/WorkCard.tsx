"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./WorkCard.module.css";

interface WorkCardProps {
    id: number;
    image: string;
    category: string;
    title: string;
    description: string;
}

export default function WorkCard({
    id,
    image,
    category,
    title,
    description,
}: WorkCardProps) {
    return (
        <Link href={`/works/${id}`} className={styles.cardLink}>
            <motion.article
                className={styles.card}
                whileHover="hover"
                initial="rest"
                animate="rest"
            >
                <div className={styles.imageWrapper}>
                    <motion.img
                        src={image}
                        alt={title}
                        className={styles.image}
                        loading="lazy"
                        variants={{
                            rest: { scale: 1, filter: "grayscale(30%)" },
                            hover: { scale: 1.05, filter: "grayscale(0%)" },
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    />
                    <motion.div
                        className={styles.cardOverlay}
                        variants={{
                            rest: { opacity: 0 },
                            hover: { opacity: 1 },
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.h3
                        className={styles.hoverTitle}
                        variants={{
                            rest: { opacity: 0, y: 10 },
                            hover: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        {description}
                    </motion.h3>
                </div>

                <div className={styles.info}>
                    <div className={styles.meta}>
                        <span className={styles.category}>{category}</span>
                    </div>
                    <div className={styles.main}>
                        <h4 className={styles.title}>{title}</h4>
                        <p className={styles.description}>{description}</p>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}
