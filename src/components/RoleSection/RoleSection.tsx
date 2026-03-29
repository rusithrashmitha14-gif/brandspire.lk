import Image from 'next/image';
import Link from 'next/link';
import styles from './RoleSection.module.css';

export default function RoleSection() {
  return (
    <section className={styles.roleSection}>
      <div className={styles.container}>
        {/* Top Right Floating Button */}
        <div className={styles.quoteButtonWrapper}>
          <Link href="/contact" className={styles.quoteButton}>
            GET A QUOTE
          </Link>
        </div>

        <div className={styles.grid}>
          {/* Left Column - Image */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/images/role-mockup.png" 
                alt="Brandspire Digital Marketing Dashboard" 
                width={800}
                height={550}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className={styles.textColumn}>
            <h2 className={styles.heading}>The Role of a Global Digital Marketing Agency</h2>
            <p className={styles.paragraph}>
              As a comprehensive full service digital marketing agency with a worldwide reach, Brandspire designs and executes digital strategies that embrace the entirety of the online sphere. Beyond just offering individual services, Brandspire's methodology is holistic, empowering businesses to leverage the full potential of the digital world and enhance their online presence.
            </p>
            <p className={styles.paragraph}>
              Our team of digital experts specializes in understanding each brand's unique needs and devising custom strategies that make businesses stand out in the digital space. We take pride in driving digital transformation, employing forward-thinking methods to keep our clients at the cutting edge of digital advancements.
            </p>

            <h2 className={styles.heading}>Your Partner for Digital Transformation</h2>
            <p className={styles.paragraph}>
              Brandspire acts as a reliable ally in your digital journey, offering the necessary support and insight to navigate the intricate and rapidly evolving digital environment. Our commitment to superior quality and client-centric service has established us as a favored digital partner for businesses seeking to boost their online visibility.
            </p>
            <p className={styles.paragraph}>
              In the realm of digital, success is defined by visibility and innovation, and our agency is dedicated to ensuring your business excels in both. We excel in applying digital solutions to their greatest effect, ensuring our clients not only adapt but excel in the digital age. Your digital triumph is our ultimate aim, and we possess the skills to achieve it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
