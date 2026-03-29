'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './blog.module.css';
import { motion } from 'framer-motion';

export default function BlogClient({ posts }: { posts: any[] }) {
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
                            <span className={styles.label}>Our Blog</span>
                            <h1 className={styles.title}>Insights for <span className={styles.highlight}>digital growth</span>.</h1>
                            <p className={styles.heroDesc}>Deep dives into marketing strategies, design systems, and scaling your brand ethically.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className={styles.gridSection}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.blogGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {posts && posts.map((post: any) => (
                            <motion.div key={post.slug} variants={fadeUp}>
                                <article className={styles.postCard}>
                                    <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                                        <div className={styles.imageWrapper}>
                                            {post.featured_image ? (
                                                <Image 
                                                    src={post.featured_image} 
                                                    alt={post.title}
                                                    fill
                                                    className={styles.featuredImage}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div className={styles.imagePlaceholder}></div>
                                            )}
                                        </div>
                                        <div className={styles.content}>
                                            <div className={styles.meta}>
                                                <span className={styles.category}>Growth Strategy</span>
                                                <span className={styles.dot}></span>
                                                <span>{post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recent'}</span>
                                            </div>
                                            <h3>{post.title}</h3>
                                            <p>{post.meta_description || (post.content && post.content.substring(0, 100) + '...')} </p>
                                            <span className={styles.readMore}>Read Article <span className={styles.arrow}>→</span></span>
                                        </div>
                                    </Link>
                                </article>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className={styles.newsletter}>
                <div className={styles.fullWidthContainer}>
                    <div className={styles.newsletterBox}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h2>Stay inspired</h2>
                            <p>Get the latest digital marketing tips and case studies delivered to your inbox.</p>
                            <form className={styles.form}>
                                <input type="email" placeholder="Your email address" required className={styles.input} />
                                <button type="submit" className={styles.submitBtn}>Subscribe</button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
