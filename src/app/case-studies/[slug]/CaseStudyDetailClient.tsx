'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './case-study-detail.module.css';
import { motion } from 'framer-motion';

export default function CaseStudyDetailClient({ caseStudy }: { caseStudy: any }) {
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
            {/* Hero Section */}
            <header className={styles.hero}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeUp}>
                            <Link href="/case-studies" className={styles.backLink}>
                                <span className={styles.arrow}>←</span> Back to Portfolio
                            </Link>
                        </motion.div>
                        
                        <div className={styles.heroGrid}>
                            <motion.div className={styles.heroContent} variants={fadeUp}>
                                <span className={styles.industry}>{caseStudy.industry}</span>
                                <h1 className={styles.title}>{caseStudy.client_name}</h1>
                                <p className={styles.summary}>{caseStudy.results || 'Transformative digital solution.'}</p>
                            </motion.div>
                            
                            {caseStudy.images && caseStudy.images.length > 0 && (
                                <motion.div className={styles.heroImageWrapper} variants={fadeUp}>
                                    <Image 
                                        src={caseStudy.images[0]} 
                                        alt={`${caseStudy.client_name} Showcase`}
                                        fill
                                        className={styles.heroImage}
                                        style={{ objectFit: 'cover' }}
                                        priority
                                    />
                                    <div className={styles.imageOverlay}></div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Main Content */}
            <article className={styles.mainContent}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.contentGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        <div className={styles.mainText}>
                            {caseStudy.problem && (
                                <motion.section className={styles.contentSection} variants={fadeUp}>
                                    <h2>The Challenge</h2>
                                    <p>{caseStudy.problem}</p>
                                </motion.section>
                            )}

                            {caseStudy.solution && (
                                <motion.section className={styles.contentSection} variants={fadeUp}>
                                    <h2>Our Solution</h2>
                                    <p>{caseStudy.solution}</p>
                                </motion.section>
                            )}

                            {caseStudy.results && (
                                <motion.section className={styles.contentSection} variants={fadeUp}>
                                    <h2>The Results</h2>
                                    <p>{caseStudy.results}</p>
                                </motion.section>
                            )}
                        </div>
                        
                        <aside className={styles.sidebar}>
                            <motion.div className={styles.infoCard} variants={fadeUp}>
                                <h3>Project Details</h3>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Client</span>
                                    <span className={styles.infoValue}>{caseStudy.client_name}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Industry</span>
                                    <span className={styles.infoValue}>{caseStudy.industry}</span>
                                </div>
                                {caseStudy.website_url && (
                                    <div className={styles.infoItem} style={{ marginTop: '10px' }}>
                                        <span className={styles.infoLabel}>View Project</span>
                                        <a href={caseStudy.website_url} target="_blank" rel="noopener noreferrer" className={styles.liveSiteBtn}>
                                            Visit Live Site ↗
                                        </a>
                                    </div>
                                )}
                                {caseStudy.tech_stack && caseStudy.tech_stack.length > 0 && (
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Tech Stack</span>
                                        <div className={styles.techStack}>
                                            {caseStudy.tech_stack.map((tech: string) => (
                                                <span key={tech} className={styles.techBadge}>{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </aside>
                    </motion.div>
                </div>
            </article>

            {/* CTA */}
            <section className={styles.cta}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2>Ready to achieve similar results?</h2>
                        <Link href="/contact" className={styles.ctaLink}>Start your project →</Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
