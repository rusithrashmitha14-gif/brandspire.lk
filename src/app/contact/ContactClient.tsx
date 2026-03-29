'use client';

import styles from './contact.module.css';
import ContactForm from './ContactForm';
import { motion } from 'framer-motion';

export default function ContactClient() {
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
                            <span className={styles.label}>Get in Touch</span>
                            <h1 className={styles.title}>Start your <span className={styles.highlight}>project</span>.</h1>
                            <p className={styles.heroDesc}>Ready to scale? Drop us a line and let's engineer something phenomenal together.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className={styles.contactSection}>
                <div className={styles.fullWidthContainer}>
                    <motion.div 
                        className={styles.contactGrid}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        <motion.div className={styles.contactInfo} variants={fadeUp}>
                            <div className={styles.infoBlock}>
                                <h3>Email Us</h3>
                                <a href="mailto:hello@brandspire.lk">hello@brandspire.lk</a>
                            </div>
                            <div className={styles.infoBlock}>
                                <h3>Call or WhatsApp</h3>
                                <a href="tel:+94705080577">+94 70 508 0577</a>
                            </div>
                            <div className={styles.infoBlock}>
                                <h3>Our Headquarters</h3>
                                <p>Colombo, Sri Lanka</p>
                            </div>
                        </motion.div>

                        <motion.div className={styles.formWrapper} variants={fadeUp}>
                            <div className={styles.contactFormBox}>
                                <h2>Send a detailed message</h2>
                                <p className={styles.formDesc}>For the fastest response, please fill out the form below with as much detail as possible.</p>
                                <ContactForm />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
