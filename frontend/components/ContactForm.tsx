"use client";

import { useState, FormEvent } from "react";
import InputField from "./InputField";
import Button from "./Button";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
    onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        budget: "",
        message: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error on change
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("http://localhost:3001/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to submit");

            setSubmitStatus("success");
            setFormData({ name: "", email: "", company: "", budget: "", message: "" });
            onSuccess?.();
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <InputField
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(value) => handleChange("name", value)}
                    error={errors.name}
                    placeholder="Your name"
                    required
                />
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => handleChange("email", value)}
                    error={errors.email}
                    placeholder="your@email.com"
                    required
                />
            </div>

            <div className={styles.row}>
                <InputField
                    label="Company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={(value) => handleChange("company", value)}
                    placeholder="Company name (optional)"
                />
                <InputField
                    label="Budget"
                    name="budget"
                    type="text"
                    value={formData.budget}
                    onChange={(value) => handleChange("budget", value)}
                    placeholder="e.g. $5k-10k (optional)"
                />
            </div>

            <InputField
                label="Message"
                name="message"
                type="textarea"
                value={formData.message}
                onChange={(value) => handleChange("message", value)}
                error={errors.message}
                placeholder="Tell us about your project..."
                required
            />

            <div className={styles.actions}>
                <Button
                    text={isSubmitting ? "Sending..." : "Send Message"}
                    type="submit"
                    variant="pill"
                    icon="arrow"
                />
            </div>

            {submitStatus === "success" && (
                <div className={styles.successMessage}>
                    ✓ Message sent successfully! We'll get back to you soon.
                </div>
            )}

            {submitStatus === "error" && (
                <div className={styles.errorMessage}>
                    ✗ Failed to send message. Please try again.
                </div>
            )}
        </form>
    );
}
