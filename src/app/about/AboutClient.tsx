'use client';

import Image from 'next/image';
import styles from './about.module.css';
import { motion } from 'framer-motion';

export default function AboutClient({ teamMembers }: { teamMembers: any[] }) {
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
            {/* About Hero */}
            <section className={styles.hero}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.heroContent}
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeUp}>
                            <span className={styles.label}>Our Story</span>
                            <h1 className={styles.title}>Empowering local brands through <span className={styles.highlight}>digital excellence</span>.</h1>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Brand Story Section */}
            <section className={styles.storySection}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.storyGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.div className={styles.storyContent} variants={fadeUp}>
                            <p className={styles.lead}>
                                Founded in Sri Lanka, Brandspire was born from a simple observation: local businesses have incredible potential but often lack the digital tools to compete on a global scale.
                            </p>
                            <p className={styles.desc}>
                                We're a team of designers, developers, and strategists who believe that premium design shouldn't be reserved for multi-national corporations. We bring world-class digital experiences directly to our local community, helping brands stand out and scale effectively.
                            </p>
                        </motion.div>
                        <motion.div className={styles.storyImage} variants={fadeUp}>
                            <div className={styles.storyImageWrapper}>
                                <Image
                                    src="/images/target-location.png"
                                    alt="Target Location Sri Lanka"
                                    fill
                                    className={styles.locationImage}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className={styles.valuesSection}>
                <div className={styles.fullWidthContainer}>
                    <motion.div
                        className={styles.valuesHeader}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={fadeUp}
                    >
                        <span className={styles.labelDark}>Core Principles</span>
                        <h2 className={styles.sectionTitle}>What drives us</h2>
                    </motion.div>
                    
                    <motion.div 
                        className={styles.valuesGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        <motion.div className={styles.valueCard} variants={fadeUp}>
                            <div className={styles.valueIcon}>📍</div>
                            <h3>Local Focus</h3>
                            <p>We understand the local market and build solutions that resonate with our community.</p>
                        </motion.div>
                        <motion.div className={styles.valueCard} variants={fadeUp}>
                            <div className={styles.valueIcon}>💎</div>
                            <h3>Premium Quality</h3>
                            <p>No compromises. We deliver high-end, world-class digital experiences in every project.</p>
                        </motion.div>
                        <motion.div className={styles.valueCard} variants={fadeUp}>
                            <div className={styles.valueIcon}>🚀</div>
                            <h3>Growth Driven</h3>
                            <p>Our work isn't just about looking good; it's about delivering measurable results for your business.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className={styles.teamSection}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.teamHeader}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={fadeUp}
                    >
                        <span className={styles.labelDark}>The Masterminds</span>
                        <h2 className={styles.sectionTitle}>Meet the experts</h2>
                    </motion.div>
                    
                    <motion.div 
                        className={styles.teamGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {teamMembers && teamMembers.length > 0 ? (
                            teamMembers.map((member) => (
                                <motion.div key={member.id} className={styles.teamCard} variants={fadeUp}>
                                    <div className={styles.memberPhoto}>
                                        {member.photo ? (
                                            <Image 
                                                src={member.photo} 
                                                alt={member.name} 
                                                fill
                                                className={styles.photo}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className={styles.photoPlaceholder}></div>
                                        )}
                                    </div>
                                    <div className={styles.memberInfo}>
                                        <h3>{member.name}</h3>
                                        <p>{member.role}</p>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p className={styles.placeholder}>Our dedicated team members will be shown here soon.</p>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
