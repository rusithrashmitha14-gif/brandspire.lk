'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ShoppingCart, Calendar, PenTool, Share2, UploadCloud, Search, Camera, Target, Mail, FilePlus } from 'lucide-react';
import styles from './pricing.module.css';

export default function PricingClient() {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    };
    
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const essentialFeatures = [
        "Custom design",
        "Up to 6 pages",
        "Mobile responsive design",
        "Free hosting up to 5gb",
        "SSL security certificate",
        "Basic speed optimization",
        "WhatsApp integration",
        "Contact form setup",
        "Social media links",
        "Google Map integration",
        "Basic SEO setup",
        "Security monitoring",
        "Minor edits",
        "24/7 support"
    ];

    const growthFeatures = [
        "Up to 10 pages",
        "Priority support",
        "Monthly website performance check",
        "Advanced SEO optimization",
        "Google Business Profile setup",
        "Monthly analytic report",
        "Faster loading optimization",
        "Additional design customization",
        "Monthly home page banner updates",
        "Blog/news section",
        "Basic lead capture optimization",
        "Meta pixel / Google Analytics integration"
    ];

    const addons = [
        { name: "E-commerce functionality", icon: ShoppingCart },
        { name: "Online booking system", icon: Calendar },
        { name: "Logo design", icon: PenTool },
        { name: "Social media management", icon: Share2 },
        { name: "Product upload services", icon: UploadCloud },
        { name: "SEO campaign", icon: Search },
        { name: "Photography/Videography", icon: Camera },
        { name: "Google Ads setup", icon: Target },
        { name: "Email marketing", icon: Mail },
        { name: "Extra pages", icon: FilePlus }
    ];

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.heroContent}
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeUp}>
                            <span className={styles.label}>Transparent Pricing</span>
                            <h1 className={styles.title}>Plans for every stage of <span className={styles.highlight}>growth</span>.</h1>
                            <p className={styles.heroDesc}>Whether you're just starting out or scaling to the next level, we have a plan designed to fit your unique business needs.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className={styles.pricingSection}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.pricingGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {/* Essential Plan */}
                        <motion.div className={styles.card} variants={fadeUp}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.planName}>Essential</h3>
                                <div className={styles.planPrice}>LKR 3,500</div>
                                <div className={styles.pricePeriod}>per month</div>
                                <div className={styles.setupFee}>+ LKR 7,500 Setup Fee</div>
                            </div>
                            
                            <div className={styles.cardDivider}></div>
                            
                            <ul className={styles.featuresList}>
                                {essentialFeatures.map((feature, idx) => (
                                    <li key={idx}>
                                        <Check size={20} className={styles.checkIcon} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className={styles.cardAction}>
                                <Link href="/contact?plan=essential" className={`${styles.cardBtn} ${styles.btnOutline}`}>
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>

                        {/* Growth Plan (Popular) */}
                        <motion.div className={`${styles.card} ${styles.cardPopular}`} variants={fadeUp}>
                            <div className={styles.popularBadge}>Most Popular</div>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.planName}>Growth</h3>
                                <div className={styles.planPrice}>LKR 5,000</div>
                                <div className={styles.pricePeriod}>per month</div>
                                <div className={styles.setupFee}>+ LKR 10,000 Setup Fee</div>
                            </div>
                            
                            <div className={styles.cardDivider}></div>
                            
                            <ul className={styles.featuresList}>
                                {growthFeatures.map((feature, idx) => (
                                    <li key={idx}>
                                        <Check size={20} className={styles.checkIcon} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className={styles.cardAction}>
                                <Link href="/contact?plan=growth" className={`${styles.cardBtn} ${styles.btnSolid}`}>
                                    Choose Growth
                                </Link>
                            </div>
                        </motion.div>

                        {/* Custom Plan */}
                        <motion.div className={styles.card} variants={fadeUp}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.planName}>Custom</h3>
                                <div className={styles.planPrice}>Let's Talk</div>
                                <div className={styles.pricePeriod}>Tailored to your needs</div>
                                <div className={styles.setupFee}>Custom setup quote</div>
                            </div>
                            
                            <div className={styles.cardDivider}></div>
                            
                            <ul className={styles.featuresList}>
                                <li>
                                    <Check size={20} className={styles.checkIcon} />
                                    <span>Enterprise-level architecture</span>
                                </li>
                                <li>
                                    <Check size={20} className={styles.checkIcon} />
                                    <span>Custom web applications</span>
                                </li>
                                <li>
                                    <Check size={20} className={styles.checkIcon} />
                                    <span>Advanced integrations</span>
                                </li>
                                <li>
                                    <Check size={20} className={styles.checkIcon} />
                                    <span>Dedicated account manager</span>
                                </li>
                            </ul>
                            
                            <div className={styles.cardAction}>
                                <Link href="/contact?plan=custom" className={`${styles.cardBtn} ${styles.btnOutline}`}>
                                    Contact Sales
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Add-ons Section */}
            <section className={styles.addonsSection}>
                <div className={styles.fullWidthContainer}>
                    <div className={styles.addonsHeader}>
                        <h2 className={styles.addonsTitle}>Powerful Add-ons</h2>
                        <p className={styles.addonsDesc}>Enhance your chosen plan with these specialized services.</p>
                    </div>
                    
                    <motion.div 
                        className={styles.addonsGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {addons.map((addon, idx) => {
                            const Icon = addon.icon;
                            return (
                                <motion.div key={idx} className={styles.addonItem} variants={fadeUp}>
                                    <div className={styles.addonIcon}>
                                        <Icon size={24} />
                                    </div>
                                    <span>{addon.name}</span>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
