"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const heroContent = {
    description:
        "Independent design agency working across motion, branding, product, UI/UX, and immersive design, turning ideas into real outcomes.",
    ctaText: "START A PROJECT",
    ctaLink: "#contact",
    backgroundImage:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=80",
};

export default function Hero() {
    return (
        <section className={styles.hero}>
            {/* Background Visual */}
            <div className={styles.visual}>
                <img
                    src={heroContent.backgroundImage}
                    alt="Abstract dark atmospheric visual"
                    className={styles.image}
                />
                <div className={styles.overlay} />
            </div>

            <div className={`${styles.content} container`}>
                {/* Left: Agency Description */}
                <motion.p
                    className={styles.description}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {heroContent.description}
                </motion.p>

                {/* Right: CTA Button */}
                <motion.a
                    href={heroContent.ctaLink}
                    className={styles.cta}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className={styles.ctaText}>{heroContent.ctaText}</span>
                    <span className={styles.ctaArrow}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 17L17 7M17 7H7M17 7V17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </motion.a>
            </div>
        </section>
    );
}
