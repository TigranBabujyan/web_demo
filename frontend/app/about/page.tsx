"use client";

import { useState, useEffect } from "react";
import SectionBlock from "../../components/SectionBlock";
import styles from "./page.module.css";

interface Section {
    id: string;
    type: string;
    label?: string;
    title?: string;
    subtitle?: string;
    content?: string;
    data?: any;
}

export default function AboutPage() {
    const [sections, setSections] = useState<Section[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAboutPage = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/pages/about");
                const data = await response.json();
                setSections(data.sections);
            } catch (error) {
                console.error("Failed to fetch about page:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAboutPage();
    }, []);

    if (isLoading) {
        return (
            <main className={styles.main}>
                <div className={styles.loading}>Loading...</div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            {sections.map((section) => {
                if (section.type === "text_only") {
                    return (
                        <SectionBlock
                            key={section.id}
                            id={section.id}
                            label={section.label}
                            title={section.title}
                            subtitle={section.subtitle}
                        >
                            {section.content && <p className={styles.contentText}>{section.content}</p>}
                        </SectionBlock>
                    );
                }

                if (section.type === "services") {
                    return (
                        <section key={section.id} id={section.id} className={styles.servicesSection}>
                            <div className="container">
                                <h2 className={styles.sectionTitle}>{section.title}</h2>
                                <div className={styles.servicesGrid}>
                                    {section.data.map((service: any, index: number) => (
                                        <div key={index} className={styles.serviceCard}>
                                            <div className={styles.serviceIcon}>{service.icon}</div>
                                            <h3 className={styles.serviceName}>{service.name}</h3>
                                            <p className={styles.serviceDescription}>{service.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    );
                }

                if (section.type === "partners") {
                    return (
                        <section key={section.id} id={section.id} className={styles.partnersSection}>
                            <div className="container">
                                <h2 className={styles.sectionTitle}>{section.title}</h2>
                                <div className={styles.partnersGrid}>
                                    {section.data.map((partner: any, index: number) => (
                                        <div key={index} className={styles.partnerCard}>
                                            {partner.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    );
                }

                return null;
            })}
        </main>
    );
}
