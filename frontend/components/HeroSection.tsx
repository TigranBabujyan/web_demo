"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";

// Dynamically import Hero3D (no SSR since it uses WebGL)
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <section className={styles.section}>
                <div className={styles.heroGradient} />

                {/* Central PARANOID'S logo */}
                <div className={styles.heroLogo}>
                    <span className={styles.heroLogoText}>PARANOID'S</span>
                </div>

                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <span className={styles.heroLabel}>/paranoid visuals</span>
                        <div className={styles.heroTitle}>
                            <h2 className={styles.heroTitleSmall}>WE DON&apos;T FIT IN.</h2>
                            <h1 className={styles.heroTitleLarge}>WE MAKE BRANDS LOUD.</h1>
                        </div>
                        <p className={styles.heroDescription}>
                            Independent design agency working across motion, branding,
                            product, UI/UX, and immersive design, turning ideas into real
                            outcomes.
                        </p>
                    </div>
                    <a href="/contact" className={styles.heroButton}>
                        START A PROJECT
                        <span className={styles.heroButtonArrow}>→</span>
                    </a>
                </div>
            </section>
        );
    }

    return (
        <motion.section
            className={styles.section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* 3D Canvas - fills the section */}
            <Hero3D />

            {/* Subtle radial gradient overlay (matches Figma's 6% opacity ellipse) */}
            <div className={styles.heroGradient} />

            {/* Central PARANOID'S logo */}
            <div className={styles.heroLogo}>
                <span className={styles.heroLogoText}>PARANOID'S</span>
            </div>

            {/* Hero content overlay - positioned at bottom per Figma */}
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <span className={styles.heroLabel}>/paranoid visuals</span>
                    <div className={styles.heroTitle}>
                        <h2 className={styles.heroTitleSmall}>WE DON&apos;T FIT IN.</h2>
                        <h1 className={styles.heroTitleLarge}>WE MAKE BRANDS LOUD.</h1>
                    </div>
                    <p className={styles.heroDescription}>
                        Independent design agency working across motion, branding,
                        product, UI/UX, and immersive design, turning ideas into real
                        outcomes.
                    </p>
                </div>

                <a href="/contact" className={styles.heroButton}>
                    START A PROJECT
                    <span className={styles.heroButtonArrow}>→</span>
                </a>
            </div>
        </motion.section>
    );
}
