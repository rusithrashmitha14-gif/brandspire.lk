import Link from 'next/link';
import Button from '@/components/Button/Button';
import styles from './services.module.css';

const SERVICES = [
    {
        title: 'Web Design',
        slug: 'web-design',
        description: 'We create visually stunning, user-centric designs that not only look great but also drive engagement and conversions for local businesses.',
        features: ['UI/UX Design', 'Brand Identity', 'Responsive Layouts']
    },
    {
        title: 'Web Development',
        slug: 'web-development',
        description: 'Our development team builds high-performance, scalable websites using the latest technologies to ensure your business stays ahead.',
        features: ['Custom Web Apps', 'E-commerce Solutions', 'CMS Integration']
    },
    {
        title: 'SEO',
        slug: 'seo',
        description: 'We optimize your digital presence to ensure your business ranks at the top of local search results and attracts more customers.',
        features: ['Keyword Research', 'On-Page SEO', 'Local SEO Optimization']
    }
];

export default function Services() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className="container">
                    <span className={styles.label}>Our Expertise</span>
                    <h1 className={styles.title}>Solutions tailored for <span className={styles.highlight}>local growth</span></h1>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className={styles.servicesGrid}>
                        {SERVICES.map((service) => (
                            <div key={service.slug} className={styles.serviceCard}>
                                <div className={styles.serviceHeader}>
                                    <h2>{service.title}</h2>
                                </div>
                                <p className={styles.description}>{service.description}</p>
                                <ul className={styles.features}>
                                    {service.features.map(feature => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                                <div className={styles.actions}>
                                    <Button href={`/services/${service.slug}`} variant="outline" size="sm">Learn More</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className={`${styles.process} section`}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.label}>Our Process</span>
                        <h2 className={styles.sectionTitle}>How we bring success</h2>
                    </div>
                    <div className={styles.processGrid}>
                        <div className={styles.processStep}>
                            <span className={styles.stepNum}>01</span>
                            <h3>Discover</h3>
                            <p>We start by understanding your brand, goals, and target audience in the local market.</p>
                        </div>
                        <div className={styles.processStep}>
                            <span className={styles.stepNum}>02</span>
                            <h3>Design</h3>
                            <p>We create a premium visual identity and user experience that sets you apart from the competition.</p>
                        </div>
                        <div className={styles.processStep}>
                            <span className={styles.stepNum}>03</span>
                            <h3>Build</h3>
                            <p>Our developers turn designs into high-performance, functional websites using modern tech.</p>
                        </div>
                        <div className={styles.processStep}>
                            <span className={styles.stepNum}>04</span>
                            <h3>Launch</h3>
                            <p>We ensure a smooth deployment and provide initial optimization for immediate impact.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className="container">
                    <h2>Have a specific need?</h2>
                    <Button href="/contact" size="lg">Let's Talk</Button>
                </div>
            </section>
        </div>
    );
}
