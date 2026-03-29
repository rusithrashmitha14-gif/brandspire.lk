'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './case-studies.module.css';
import { motion } from 'framer-motion';

export default function CaseStudiesClient({ caseStudies }: { caseStudies: any[] }) {
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
                        <motion.div variants={fadeUp}>
                            <span className={styles.label}>Our Portfolio</span>
                            <h1 className={styles.title}>Results-driven <span className={styles.highlight}>excellence</span>.</h1>
                            <p className={styles.heroDesc}>Explore our most impactful case studies and see how we scale local brands to new heights.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className={styles.gridSection}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.grid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {caseStudies && caseStudies.map((project: any) => (
                            <motion.div key={project.slug} variants={fadeUp}>
                                <Link href={`/case-studies/${project.slug}`} className={styles.projectCard}>
                                    <div className={styles.imageWrapper}>
                                        {project.images && project.images.length > 0 ? (
                                            <Image 
                                                src={project.images[0]} 
                                                alt={project.client_name} 
                                                fill
                                                className={styles.placeholderImg} 
                                                style={{ objectFit: 'cover' }} 
                                            />
                                        ) : (
                                            <div className={styles.placeholderImg}></div>
                                        )}
                                        <div className={styles.overlay}>
                                            <span>View Case Study</span>
                                        </div>
                                    </div>
                                    <div className={styles.content}>
                                        <p className={styles.category}>{project.industry}</p>
                                        <h3>{project.client_name}</h3>
                                        <p className={styles.outcome}>{project.results || 'Transformative strategic campaign'}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2>Ready to trigger your next phase of growth?</h2>
                        <Link href="/contact" className={styles.ctaLink}>Let's talk strategy →</Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
