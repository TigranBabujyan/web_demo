"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";

// Dynamically import Hero3D (no SSR since it uses WebGL)
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

export default function HeroSection() {
    return (
        <motion.section
            className={styles.section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <Hero3D />
        </motion.section>
    );
}
