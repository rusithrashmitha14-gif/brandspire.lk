import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import styles from './slug.module.css';

// Reuse the image mapping
const getServiceDetails = (slug: string) => {
    switch(slug?.toLowerCase()) {
        case 'web-design':
        case 'design':
            return {
                features: ['UI/UX Mastery', 'Responsive Layouts', 'Brand Identity Integration'],
                image: '/images/services/web-design-new.jpg'
            };
        case 'web-development':
        case 'development':
            return {
                features: ['Full-Stack Solutions', 'Scalable Architecture', 'API Integrations'],
                image: '/images/services/web-development-new.jpg'
            };
        case 'seo':
        case 'search-engine-optimization':
        case 'seo-optimization':
            return {
                features: ['Keyword Dominance', 'Technical Audits', 'Link Building'],
                image: '/images/services/seo-new.jpg'
            };
        default:
            return {
                features: ['Custom Strategy', 'Performance Optimization', 'Continuous Support'],
                image: null
            };
    }
};

type Params = Promise<{ slug: string }>

export default async function ServiceDetail({ params }: { params: Params }) {
    const { slug } = await params;

    const supabase = await createClient();
    const { data: service, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single();
        
    if (error || !service) {
        notFound();
    }
    
    const details = getServiceDetails(slug);
    
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.fullWidthContainer}>
                    <div className={styles.heroContent}>
                        <span className={styles.label}>SERVICE DETAILS</span>
                        <h1 className={styles.title}>{service.title}</h1>
                        <p className={styles.heroDesc}>{service.description}</p>
                    </div>
                </div>
            </section>
            
            <section className={styles.contentSection}>
                <div className={styles.fullWidthContainer}>
                    <div className={styles.grid}>
                        <div className={styles.imageCol}>
                            {details.image ? (
                                <div className={styles.imageWrapper}>
                                    <Image 
                                        src={details.image} 
                                        alt={service.title} 
                                        fill 
                                        style={{ objectFit: 'cover' }} 
                                    />
                                </div>
                            ) : service.icon ? (
                                <div className={styles.iconPlaceholder}>{service.icon}</div>
                            ) : null}
                        </div>
                        
                        <div className={styles.textCol}>
                            <h2>What we deliver</h2>
                            <p className={styles.detailsText}>
                                Our {service.title.toLowerCase()} service is engineered to scale your digital presence. 
                                We don't just execute basic tasks; we architect an ecosystem that dominates your market.
                            </p>
                            
                            <div className={styles.features}>
                                <h3>Key Features</h3>
                                <ul>
                                    {details.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <span className={styles.check}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className={styles.actions}>
                                <Button href="/contact" size="lg" variant="primary">Start Your Project</Button>
                                <Button href="/services" size="lg" variant="outline">Back to Services</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
