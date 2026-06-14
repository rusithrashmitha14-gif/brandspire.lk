"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../Button/Button';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes (optional cleanup)
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo} onClick={closeMenu}>
                    <img src="/brand-logo.png" alt="Brandspire" className={styles.logoImg} />
                </Link>

                <div className={`${styles.links} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
                    <Link href="/" className={`${styles.link} ${styles.mobileOnlyLink}`} onClick={closeMenu}>Home</Link>
                    <Link href="/services" className={styles.link} onClick={closeMenu}>Services</Link>
                    <Link href="/case-studies" className={styles.link} onClick={closeMenu}>Case Studies</Link>
                    <Link href="/about" className={styles.link} onClick={closeMenu}>About</Link>
                    <Link href="/blog" className={styles.link} onClick={closeMenu}>Blog</Link>
                    <Link href="/contact" className={styles.link} onClick={closeMenu}>Contact</Link>
                    <Button href="/contact" size="sm" className={styles.cta} onClick={closeMenu}>Start a Project</Button>
                </div>

                <button 
                    className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.open : ''}`} 
                    onClick={toggleMenu}
                    aria-label="Toggle mobile menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
