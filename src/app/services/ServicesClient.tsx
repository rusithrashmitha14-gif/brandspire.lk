'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import styles from './services.module.css';
import ServicesSlogan from './ServicesSlogan';
import { motion } from 'framer-motion';

const getServiceDetails = (slug: string) => {
    switch(slug?.toLowerCase()) {
        case 'web-design':
        case 'design':
            return {
                features: ['UI/UX Mastery', 'Responsive Layouts', 'Brand Identity Integration'],
                image: '/images/services/web-design-new.jpg'
            };
        case 'web-development':
        case 'development':
            return {
                features: ['Full-Stack Solutions', 'Scalable Architecture', 'API Integrations'],
                image: '/images/services/web-development-new.jpg'
            };
        case 'seo':
        case 'search-engine-optimization':
        case 'seo-optimization':
            return {
                features: ['Keyword Dominance', 'Technical Audits', 'Link Building'],
                image: '/images/services/seo-new.jpg'
            };
        default:
            return {
                features: ['Custom Strategy', 'Performance Optimization', 'Continuous Support'],
                image: null
            };
    }
};

export default function ServicesClient({ services }: { services: any[] }) {
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
                        <motion.div className={styles.heroMain} variants={fadeUp}>
                            <span className={styles.label}>OUR SERVICES</span>
                            <h1 className={styles.title}>Solutions engineered for <span className={styles.highlight}>dominance.</span></h1>
                            <p className={styles.heroDesc}>
                                We don't just build websites and run campaigns. We architect digital engines that propel your brand above the competition and drive relentless local and global growth.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
                <ServicesSlogan />
            </section>

            <section className={styles.servicesSection}>
                <div className={styles.fullWidthContainer}>
                    <div className={styles.servicesList}>
                        {services.map((service: any, idx: number) => {
                            const details = getServiceDetails(service.slug);
                            return (
                            <motion.div 
                                key={service.slug} 
                                className={`${styles.serviceRow} ${idx % 2 !== 0 ? styles.rowReverse : ''}`}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2, margin: "-100px" }}
                                variants={fadeUp}
                            >
                                <div className={styles.serviceInfo}>
                                    <span className={styles.serviceNumber}>0{idx + 1}</span>
                                    <h2>{service.title}</h2>
                                    <p className={styles.serviceDesc}>{service.description}</p>
                                    
                                    <ul className={styles.serviceFeatures}>
                                        {details.features.map((feature, fIdx) => (
                                            <li key={fIdx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.serviceVisual}>
                                    {details.image ? (
                                        <Image 
                                            src={details.image} 
                                            alt={service.title} 
                                            fill 
                                            style={{ objectFit: 'cover' }} 
                                        />
                                    ) : service.icon ? (
                                        <div className={styles.largeIcon}>{service.icon}</div>
                                    ) : (
                                        <div className={styles.visualPlaceholder}>
                                            <span>{service.title.substring(0, 2).toUpperCase()}</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )})}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className={styles.whySection}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.whyGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        <motion.div className={styles.whyText} variants={fadeUp}>
                            <span className={styles.labelDark}>The Brandspire Edge</span>
                            <h2>We engineer solutions that scale with your ambitions.</h2>
                            <p>Our approach blends data-driven strategy with award-winning design. We don't just build websites; we build ecosystems designed to dominate your market format and convert traffic into loyal customers continuously.</p>
                            <Button href="/about" variant="outline" size="lg" className={styles.whyBtn}>Learn About Our Agency</Button>
                        </motion.div>
                        <motion.div className={styles.whyStats} variants={staggerContainer}>
                            <motion.div className={styles.statBox} variants={fadeUp}>
                                <span className={styles.statNum}>98%</span>
                                <span className={styles.statLabel}>Client Retention</span>
                            </motion.div>
                            <motion.div className={styles.statBox} variants={fadeUp}>
                                <span className={styles.statNum}>2.5x</span>
                                <span className={styles.statLabel}>Average ROI</span>
                            </motion.div>
                            <motion.div className={styles.statBox} variants={fadeUp}>
                                <span className={styles.statNum}>50+</span>
                                <span className={styles.statLabel}>Brands Scaled</span>
                            </motion.div>
                            <motion.div className={styles.statBox} variants={fadeUp}>
                                <span className={styles.statNum}>24/7</span>
                                <span className={styles.statLabel}>Elite Support</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className={styles.processSection}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.processHeader}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={fadeUp}
                    >
                        <span className={styles.processLabel}>Our Proven Methodology</span>
                        <h2 className={styles.sectionTitle}>How we engineer success</h2>
                    </motion.div>
                    
                    <div className={styles.timelineWrapper}>
                        <div className={styles.timelineLine}></div>
                        <motion.div 
                            className={styles.processGrid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={staggerContainer}
                        >
                            <motion.div className={styles.processStep} variants={fadeUp}>
                                <div className={styles.stepNode}></div>
                                <span className={styles.stepNum}>01</span>
                                <h3>Discover & Plan</h3>
                                <p>We start by deeply analyzing your market, dissecting competitors, and outlining a blueprint for digital dominance.</p>
                            </motion.div>
                            <motion.div className={styles.processStep} variants={fadeUp}>
                                <div className={styles.stepNode}></div>
                                <span className={styles.stepNum}>02</span>
                                <h3>Architect & Design</h3>
                                <p>Our designers craft high-converting, visually striking interfaces that immediately captivate your ideal consumer base.</p>
                            </motion.div>
                            <motion.div className={styles.processStep} variants={fadeUp}>
                                <div className={styles.stepNode}></div>
                                <span className={styles.stepNum}>03</span>
                                <h3>Develop & Build</h3>
                                <p>We write clean, high-performance code integrating cutting-edge tech stacks for lightning-fast speeds.</p>
                            </motion.div>
                            <motion.div className={styles.processStep} variants={fadeUp}>
                                <div className={styles.stepNode}></div>
                                <span className={styles.stepNum}>04</span>
                                <h3>Launch & Scale</h3>
                                <p>Rigorous QA precedes a flawless launch. We then deploy marketing strategies to funnel continuous traffic to your new ecosystem.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <motion.section 
                className={styles.cta}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <div className="container">
                    <h2>Have a specific need?</h2>
                    <Button href="/contact" size="lg">Let's Talk</Button>
                </div>
            </motion.section>
        </div>
    );
}
