import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <span className={styles.label}>/ 404</span>
                <h1 className={styles.title}>PAGE NOT FOUND</h1>
                <p className={styles.subtitle}>
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/" className={styles.button}>
                    <span>Go Home</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
