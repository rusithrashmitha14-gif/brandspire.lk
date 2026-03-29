import styles from './LogoStrip.module.css';
import Image from 'next/image';

const CLIENTS = [
  { name: 'Quick Auto Care', logo: '/images/clients/quickautocare.png' },
  { name: 'Bike Mart', logo: '/images/clients/bikemart.png' },
  { name: 'Lenovo', logo: '/images/clients/lenovo.png' },
  { name: 'A Moda', logo: '/images/clients/amoda.png' },
  { name: 'Logo 5', logo: '/images/clients/logo5.png' },
  { name: 'Logo 6', logo: '/images/clients/logo6.png' },
  { name: 'Logo 7', logo: '/images/clients/logo7.png' },
  { name: 'Logo 8', logo: '/images/clients/logo8.png' },
  { name: 'Logo 9', logo: '/images/clients/logo9.png' },
  { name: 'Logo 10', logo: '/images/clients/logo10.png' },
  { name: 'Logo 11', logo: '/images/clients/logo11.png' },
  { name: 'Logo 12', logo: '/images/clients/logo12.png' },
  { name: 'Logo 13', logo: '/images/clients/logo13.png' },
  { name: 'Logo 14', logo: '/images/clients/logo14.png' },
];


export default function LogoStrip() {
  // We duplicate the array to create a seamless infinite scrolling effect 
  // With 14 logos, we only need to double it once to fill wide screens.
  const marqueeLogos = [...CLIENTS, ...CLIENTS];

  return (
    <section className={styles.logoStripSection}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {marqueeLogos.map((client, index) => (
            <div key={`${client.name}-${index}`} className={styles.logoWrapper}>
              <Image 
                src={client.logo} 
                alt={client.name} 
                width={140} 
                height={70} 
                className={styles.logoImage}
                style={{ objectFit: 'contain' }}
              /> 
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
