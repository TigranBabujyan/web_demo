import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: "pill" | "default";
    icon?: "arrow" | "none";
    type?: "button" | "submit" | "reset";
}

export default function Button({
    text,
    href,
    onClick,
    variant = "pill",
    icon = "arrow",
    type = "button",
}: ButtonProps) {
    const buttonContent = (
        <>
            <span>{text}</span>
            {icon === "arrow" && (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={`${styles.button} ${styles[variant]}`}
            >
                {buttonContent}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.button} ${styles[variant]}`}
        >
            {buttonContent}
        </button>
    );
}
