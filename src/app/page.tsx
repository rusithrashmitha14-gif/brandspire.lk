import Button from "@/components/Button/Button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              We build websites that <span className={styles.highlight}>grow local businesses</span>
            </h1>
            <p className={styles.subtitle}>
              Brandspire is a premium digital agency dedicated to elevating local brands through world-class design and performance-driven development.
            </p>
            <div className={styles.heroActions}>
              <Button href="/contact" size="lg">Start a Project</Button>
              <Button href="/case-studies" variant="outline" size="lg">View Work</Button>
            </div>
          </div>
        </div>

        {/* Background Visual Element (Bird-style) */}
        <div className={styles.heroVisual}>
          <div className={styles.blob}></div>
        </div>
      </section>

      {/* Services Section Preview */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Our Services</span>
            <h2 className={styles.sectionTitle}>What we excel at</h2>
          </div>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3>Web Design</h3>
              <p>Stunning, user-centric designs that capture your brand's essence and convert visitors.</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Web Development</h3>
              <p>High-performance, scalable websites built with the latest technologies for local growth.</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>SEO</h3>
              <p>Data-driven strategies to ensure your business stays at the top of local search results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className={styles.ctaStrip}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to transform your digital presence?</h2>
            <Button href="/contact" size="lg" variant="secondary">Get in Touch</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
