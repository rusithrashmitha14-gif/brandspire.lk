'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './blog-detail.module.css';
import { motion } from 'framer-motion';

export default function BlogDetailClient({ post }: { post: any }) {
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
                            <Link href="/blog" className={styles.backLink}>
                                <span className={styles.arrow}>←</span> Back to Library
                            </Link>
                        </motion.div>
                        
                        <div className={styles.heroContent}>
                            <motion.div variants={fadeUp} className={styles.meta}>
                                <span className={styles.category}>Growth Strategy</span>
                                <span className={styles.dot}></span>
                                <time dateTime={post.created_at} className={styles.date}>
                                    {new Date(post.created_at).toLocaleDateString()}
                                </time>
                            </motion.div>
                            
                            <motion.h1 variants={fadeUp} className={styles.title}>
                                {post.title}
                            </motion.h1>
                            
                            {post.meta_description && (
                                <motion.p variants={fadeUp} className={styles.summary}>
                                    {post.meta_description}
                                </motion.p>
                            )}
                            
                            {post.team && (
                                <motion.div variants={fadeUp} className={styles.author}>
                                    {post.team.photo ? (
                                        <div className={styles.authorPhotoWrapper}>
                                            <Image 
                                                src={post.team.photo} 
                                                alt={post.team.name}
                                                fill
                                                className={styles.authorPhoto}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    ) : (
                                        <div className={styles.authorPlaceholder}>
                                            {post.team.name.charAt(0)}
                                        </div>
                                    )}
                                    <span className={styles.authorName}>{post.team.name}</span>
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
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className={styles.articleBodyWrapper}
                    >
                        {post.featured_image && (
                             <motion.div variants={fadeUp} className={styles.featuredImageWrapper}>
                                <Image 
                                    src={post.featured_image} 
                                    alt={post.title}
                                    fill
                                    className={styles.featuredImage}
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            </motion.div>
                        )}
                        
                        <motion.div variants={fadeUp} className={styles.blogBody}>
                            <p>{post.content}</p>
                        </motion.div>
                    </motion.div>
                </div>
            </article>

            {/* Newsletter CTA */}
            <section className={styles.newsletter}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.newsletterBox}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2>Enjoyed the article?</h2>
                        <p>Subscribe for more digital growth insights sent directly to your inbox.</p>
                        <form className={styles.form}>
                            <input type="email" placeholder="Your email address" required className={styles.input} />
                            <button type="submit" className={styles.submitBtn}>Subscribe</button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
