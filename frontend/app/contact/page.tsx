import SectionBlock from "../../components/SectionBlock";
import ContactForm from "../../components/ContactForm";
import styles from "./page.module.css";

export default function ContactPage() {
    return (
        <main className={styles.main}>
            <SectionBlock
                label="/ contact"
                title="LET'S TALK"
                subtitle="Got a project in mind? Want to collaborate? Fill out the form and we'll get back to you within 48 hours."
            />

            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {/* Contact Form */}
                        <div className={styles.formWrapper}>
                            <ContactForm />
                        </div>

                        {/* Contact Info */}
                        <div className={styles.infoWrapper}>
                            <div className={styles.infoItem}>
                                <h3 className={styles.infoTitle}>Email</h3>
                                <a href="mailto:hello@paranoids.agency" className={styles.infoLink}>
                                    hello@paranoids.agency
                                </a>
                            </div>

                            <div className={styles.infoItem}>
                                <h3 className={styles.infoTitle}>Instagram</h3>
                                <a
                                    href="https://instagram.com/paranoids.agency"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.infoLink}
                                >
                                    @paranoids.agency
                                </a>
                            </div>

                            <div className={styles.infoItem}>
                                <h3 className={styles.infoTitle}>LinkedIn</h3>
                                <a
                                    href="https://linkedin.com/company/paranoids"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.infoLink}
                                >
                                    linkedin.com/company/paranoids
                                </a>
                            </div>

                            <div className={styles.infoItem}>
                                <h3 className={styles.infoTitle}>Location</h3>
                                <p className={styles.infoText}>Remote Worldwide</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
