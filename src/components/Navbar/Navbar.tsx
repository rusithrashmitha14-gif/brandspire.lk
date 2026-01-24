"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../Button/Button';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Brandspire
                </Link>

                <div className={styles.links}>
                    <Link href="/services" className={styles.link}>Services</Link>
                    <Link href="/case-studies" className={styles.link}>Work</Link>
                    <Link href="/about" className={styles.link}>About</Link>
                    <Link href="/blog" className={styles.link}>Blog</Link>
                    <Link href="/contact" className={styles.link}>Contact</Link>
                    <Button href="/contact" size="sm" className={styles.cta}>Start a Project</Button>
                </div>

                <button className={styles.mobileMenuBtn}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
