"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Tag.module.css";

interface TagProps {
    label: string;
    selected?: boolean;
    onClick?: () => void;
}

export default function Tag({ label, selected = false, onClick }: TagProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            className={`${styles.tag} ${selected ? styles.selected : ""}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {label}
        </motion.button>
    );
}
