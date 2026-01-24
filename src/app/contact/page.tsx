import Button from '@/components/Button/Button';
import styles from './contact.module.css';

export default function Contact() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className="container">
                    <span className={styles.label}>Get in Touch</span>
                    <h1 className={styles.title}>Start your <span className={styles.highlight}>project</span></h1>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.contactGrid}>
                        <div className={styles.contactInfo}>
                            <div className={styles.infoBlock}>
                                <h3>Email Us</h3>
                                <a href="mailto:hello@brandspire.lk">hello@brandspire.lk</a>
                            </div>
                            <div className={styles.infoBlock}>
                                <h3>Call or WhatsApp</h3>
                                <a href="tel:+94771234567">+94 77 123 4567</a>
                            </div>
                            <div className={styles.infoBlock}>
                                <h3>Our Office</h3>
                                <p>Colombo, Sri Lanka</p>
                            </div>
                        </div>

                        <div className={styles.contactForm}>
                            <form>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" placeholder="John Doe" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" placeholder="john@example.com" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="service">Service Interested In</label>
                                    <select id="service">
                                        <option value="web-design">Web Design</option>
                                        <option value="web-development">Web Development</option>
                                        <option value="seo">SEO</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Project Details</label>
                                    <textarea id="message" rows={5} placeholder="Tell us about your project..." required></textarea>
                                </div>
                                <Button type="submit" size="lg">Send Message</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
