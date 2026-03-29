import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    href?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    type = 'button',
    href,
    disabled = false,
}) => {
    const buttonClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${className} ${disabled ? styles.disabled : ''}`;

    if (href) {
        return (
            <a href={href} className={buttonClasses}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
