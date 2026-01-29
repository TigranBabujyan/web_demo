"use client";

import { motion } from "framer-motion";
import WorkCard from "./WorkCard";
import styles from "./FeaturedWorks.module.css";

interface Card {
    id: string;
    image: string;
    category: string;
    title: string;
    description: string;
}

interface Row {
    id: string;
    cards: Card[];
}

interface Section {
    id: string;
    label: string;
    title: string;
    subtitle: string;
    rows: Row[];
}

interface FeaturedWorksProps {
    sections: Section[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const rowVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
    },
};

export default function FeaturedWorks({ sections }: FeaturedWorksProps) {
    return (
        <>
            {sections.map((section) => (
                <section key={section.id} className={styles.section} id={section.id}>
                    <div className={`${styles.container} container`}>
                        {/* Section Header */}
                        <header className={styles.header}>
                            <motion.span
                                className={styles.label}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                {section.label}
                            </motion.span>

                            <div className={styles.titleGroup}>
                                <motion.h2
                                    className={styles.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                >
                                    {section.title}
                                </motion.h2>

                                <motion.p
                                    className={styles.subtitle}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    {section.subtitle.split("\n").map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            {i < section.subtitle.split("\n").length - 1 && <br />}
                                        </span>
                                    ))}
                                </motion.p>
                            </div>
                        </header>

                        {/* Cards Grid */}
                        <motion.div
                            className={styles.cards}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {section.rows.map((row) => (
                                <motion.div
                                    key={row.id}
                                    className={styles.row}
                                    variants={rowVariants}
                                >
                                    {row.cards.map((card) => (
                                        <WorkCard
                                            key={card.id}
                                            image={card.image}
                                            category={card.category}
                                            title={card.title}
                                            description={card.description}
                                        />
                                    ))}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            ))}
        </>
    );
}
