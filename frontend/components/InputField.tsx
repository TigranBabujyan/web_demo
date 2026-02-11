"use client";

import { useState, ChangeEvent, FocusEvent } from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
    label: string;
    name: string;
    type?: "text" | "email" | "textarea";
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
}

export default function InputField({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
    required = false,
}: InputFieldProps) {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsFocused(true);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsFocused(false);
    };

    const inputClasses = `${styles.input} ${isFocused ? styles.focused : ""} ${!!value ? styles.filled : ""} ${error ? styles.error : ""}`;

    return (
        <div className={styles.field}>
            <label htmlFor={name} className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>

            {type === "textarea" ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className={inputClasses}
                    rows={5}
                    required={required}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className={inputClasses}
                    required={required}
                />
            )}

            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}
