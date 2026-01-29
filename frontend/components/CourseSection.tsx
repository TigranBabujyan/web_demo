"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./CourseSection.module.css";

interface CourseSectionProps {
    label?: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonHref?: string;
    tagline?: string;
    image?: string;
}

export default function CourseSection({
    label = "/courses",
    title = "LEARN DESIGN\nTHE HARD WAY",
    subtitle = "A practical advanced course to grow as a design generalist.\nBuilt from real projects and real mistakes.",
    buttonText = "ORDER NOW",
    buttonHref = "/course",
    tagline = "No theory loops. No corporate fluff.",
    image = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80",
}: CourseSectionProps) {
    return (
        <section id="course" className={styles.section}>
            <div className={`${styles.container} container`}>
                {/* Left Content */}
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.label}>{label}</span>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.subtitle}>{subtitle}</p>
                    <Link href={buttonHref} className={styles.button}>
                        {buttonText}
                    </Link>
                    <p className={styles.tagline}>{tagline}</p>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img src={image} alt="Course visual" className={styles.image} />
                </motion.div>
            </div>
        </section>
    );
}
