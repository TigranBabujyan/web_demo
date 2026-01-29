"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
    label?: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonHref?: string;
    tagline?: string;
}

export default function ContactSection({
    label = "/ contact",
    title = "READY TO BREAK RULES?",
    subtitle = "If you want impact you know what to do.\nIf you want safe, this probably isn't for you.",
    buttonText = "CONTACT US",
    buttonHref = "mailto:hello@paranoids.agency",
    tagline = "We reply only to serious ideas.",
}: ContactSectionProps) {
    return (
        <section id="contact" className={styles.section}>
            <div className={`${styles.container} container`}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
            </div>
        </section>
    );
}
