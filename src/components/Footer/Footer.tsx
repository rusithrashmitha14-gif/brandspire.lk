import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>Brandspire</Link>
                        <div className={styles.brandLogoWrapper}>
                            <img src="/images/bs-logo.png" alt="Brandspire BS Logo" width={80} height={80} style={{ objectFit: 'contain' }} />
                        </div>
                        <p className={styles.tagline}>Inspire your brand</p>
                        <div className={styles.socials}>
                            {/* Social icons would go here */}
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4>Services</h4>
                        <ul>
                            <li><Link href="/services/web-design">Web Design</Link></li>
                            <li><Link href="/services/web-development">Web Development</Link></li>
                            <li><Link href="/services/seo">SEO</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Company</h4>
                        <ul>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/case-studies">Case Studies</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Contact</h4>
                        <ul>
                            <li>hello@brandspire.lk</li>
                            <li>+94 70 508 0577</li>
                            <li>Colombo, Sri Lanka</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} Brandspire. All rights reserved.</p>
                    <div className={styles.legal}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
