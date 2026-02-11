"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import styles from "./SectionBlock.module.css";

interface SectionBlockProps {
    label?: string;
    title?: string;
    subtitle?: string;
    content?: string;
    image?: string;
    imagePosition?: "left" | "right";
    buttonText?: string;
    buttonHref?: string;
    tagline?: string;
    children?: ReactNode;
    variant?: "default" | "olive" | "dark";
    id?: string;
}

export default function SectionBlock({
    label,
    title,
    subtitle,
    content,
    image,
    imagePosition = "right",
    buttonText,
    buttonHref,
    tagline,
    children,
    variant = "default",
    id,
}: SectionBlockProps) {
    return (
        <section id={id} className={`${styles.section} ${styles[variant]}`}>
            <div className={`${styles.container} container`}>
                <div className={`${styles.content} ${image ? styles.hasImage : ""} ${imagePosition === "left" ? styles.imageLeft : ""}`}>
                    {/* Text Content */}
                    <motion.div
                        className={styles.textContent}
                        initial={{ opacity: 0, x: imagePosition === "left" ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {label && <span className={styles.label}>{label}</span>}
                        {title && (
                            <h2 className={styles.title}>
                                {title.split("\n").map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < title.split("\n").length - 1 && <br />}
                                    </span>
                                ))}
                            </h2>
                        )}
                        {subtitle && (
                            <p className={styles.subtitle}>
                                {subtitle.split("\n").map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        {i < subtitle.split("\n").length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                        )}
                        {content && <p className={styles.contentText}>{content}</p>}
                        {buttonText && buttonHref && (
                            <div className={styles.buttonWrapper}>
                                <Button text={buttonText} href={buttonHref} variant="pill" icon="arrow" />
                            </div>
                        )}
                        {tagline && <p className={styles.tagline}>{tagline}</p>}
                    </motion.div>

                    {/* Image */}
                    {image && (
                        <motion.div
                            className={styles.imageWrapper}
                            initial={{ opacity: 0, x: imagePosition === "left" ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <img src={image} alt={title || ""} className={styles.image} />
                        </motion.div>
                    )}
                </div>

                {/* Custom Children Content */}
                {children && <div className={styles.childrenWrapper}>{children}</div>}
            </div>
        </section>
    );
}
