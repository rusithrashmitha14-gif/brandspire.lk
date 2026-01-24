import styles from './about.module.css';

export default function About() {
    return (
        <div className={styles.container}>
            {/* About Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <span className={styles.label}>Our Story</span>
                    <h1 className={styles.title}>Empowering local brands through <span className={styles.highlight}>digital excellence</span>.</h1>
                </div>
            </section>

            {/* Brand Story Section */}
            <section className="section">
                <div className="container">
                    <div className={styles.storyGrid}>
                        <div className={styles.storyContent}>
                            <p className={styles.lead}>
                                Founded in Sri Lanka, Brandspire was born from a simple observation: local businesses have incredible potential but often lack the digital tools to compete on a global scale.
                            </p>
                            <p>
                                We're a team of designers, developers, and strategists who believe that premium design shouldn't be reserved for multi-national corporations. We bring that same level of "Bird Marketing" quality to our local community.
                            </p>
                        </div>
                        <div className={styles.storyImage}>
                            {/* Optional image or abstract visual */}
                            <div className={styles.abstractVisual}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className={`${styles.values} section`}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>What drives us</h2>
                    <div className={styles.valuesGrid}>
                        <div className={styles.valueCard}>
                            <h3>Local Focus</h3>
                            <p>We understand the local market and build solutions that resonate with our community.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <h3>Premium Quality</h3>
                            <p>No compromises. We deliver high-end, world-class digital experiences in every project.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <h3>Growth Driven</h3>
                            <p>Our work isn't just about looking good; it's about delivering measurable results for your business.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section (Placeholder for Dynamic Content) */}
            <section className="section">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.label}>Our Team</span>
                        <h2 className={styles.sectionTitle}>Meet the experts</h2>
                    </div>
                    <div className={styles.teamGrid}>
                        {/* Dynamic team members will be mapped here from Supabase */}
                        <p className={styles.placeholder}>Our dedicated team members will be shown here soon.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
