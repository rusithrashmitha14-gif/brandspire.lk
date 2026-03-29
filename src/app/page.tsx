import Link from "next/link";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import { Twitter, Instagram, Linkedin, Facebook, Search, Monitor, PenTool, Check } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import HeroSlogan from "./HeroSlogan";
import LogoStrip from "@/components/LogoStrip/LogoStrip";
import RoleSection from "@/components/RoleSection/RoleSection";
import HoverCursor from "@/components/HoverCursor/HoverCursor";

export default async function Home() {
  const supabase = await createClient();

  // Fetch all dynamic data in parallel
  const [
    { data: services },
    { data: caseStudies },
    { data: teamMembers }
  ] = await Promise.all([
    supabase.from('services').select('*').limit(3),
    supabase.from('case_studies').select('id, slug, client_name, images').order('created_at', { ascending: false }).limit(3),
    supabase.from('team_members').select('*').order('created_at', { ascending: true })
  ]);

  return (
    <div className={styles.container}>
      {/* Refined Hero / Intro Section (Design from Image 2) */}
      <section className={styles.hero}>
        <div className={styles.fullWidthContainer}>
          <div className={styles.heroGrid}>
            <div className={styles.heroMain}>
              <div className={styles.heroContent}>
                <h2 className={styles.agencyTitle}>Digital Marketing Agency</h2>
                <p className={styles.agencyDesc}>
                  At Brandspire, we empower brands to thrive in the digital world. With personalized marketing strategies that drive engagement and growth. Let's elevate your online presence together!
                </p>
                <div className={styles.heroContact}>
                  <span>Wanna get in touch? </span>
                  <a href="/contact" className={styles.talkLink}>Let's talk</a>
                </div>
              </div>
            </div>

            <div className={styles.heroSidebar}>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon} aria-label="Twitter"><Twitter size={20} /></a>
                <a href="#" className={styles.socialIcon} aria-label="Instagram"><Instagram size={20} /></a>
                <a href="#" className={styles.socialIcon} aria-label="LinkedIn"><Linkedin size={20} /></a>
                <a href="#" className={styles.socialIcon} aria-label="Facebook"><Facebook size={20} /></a>
              </div>
              <div className={styles.verticalText}>
                <span>INSPIRE YOUR BRAND</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Large Text — mouse proximity glow */}
        <HeroSlogan />
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.fullWidthContainer}>
          <div className={styles.servicesGrid}>
            {[
              {
                id: '1',
                title: 'Web Design',
                icon: Monitor,
                features: [
                  'Tailored Online Spaces: Craft websites that reflect your brand\'s core values and aims.',
                  'Enhanced Usability Web Design: Prioritize user experience with intuitive design and navigation.',
                  'Optimal Web Functionality: Focus on consistent uptime, robust security, and high-speed performance.'
                ]
              },
              {
                id: '2',
                title: 'Web Development',
                icon: PenTool,
                features: [
                  'Universal Web Access: Construct efficient websites to engage a broad audience and elevate your brand.',
                  'Customized Web Projects: Design unique solutions tailored to client requirements and audience engagement.',
                  'Data-Driven Web Evolution: Implement analytical approaches for ongoing website enhancement.'
                ]
              },
              {
                id: '3',
                title: 'SEO',
                icon: Search,
                features: [
                  'Global Reach SEO: Use SEO to expand your audience worldwide, boosting brand visibility and growth.',
                  'Focused Engagement SEO: Develop SEO-driven campaigns for precise audience targeting and enhanced returns.',
                  'Analytical SEO Enhancement: Leverage SEO data to refine strategies for superior outcomes.'
                ]
              }
            ].map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className={styles.serviceCard}>
                  <div className={styles.serviceIconWrapper}>
                    <Icon size={48} strokeWidth={1.5} />
                  </div>
                  <h3>{service.title}</h3>
                  <ul className={styles.serviceFeatures}>
                    {service.features.map((feature, idx) => {
                      const split = feature.split(':');
                      return (
                        <li key={idx}>
                          <div className={styles.featureIcon}>
                            <Check size={20} color="#77FF3C" />
                          </div>
                          <span className={styles.featureText}>
                            {split.length > 1 ? (
                              <>
                                <span style={{color: '#000', fontWeight: 600}}>{split[0]}:</span>
                                {split.slice(1).join(':')}
                              </>
                            ) : (
                              feature
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Location Section (Using updated image) */}
      <section className={styles.locationSection}>
        <div className={styles.fullWidthContainer}>
          <div className={styles.locationGrid}>
            <div className={styles.locationContent}>
              <h2 className={styles.locationTitle}>A Leading Global Full Service Digital Marketing Agency</h2>
              <p className={styles.locationDesc}>
                Brandspire is a premier Digital Marketing Agency with a global presence, known for delivering top-tier digital solutions to businesses worldwide. Our dynamic agency stands out for its ability to enhance digital visibility for businesses, using the latest technologies and innovative approaches.
              </p>
            </div>
            <div className={styles.locationVisual}>
              <div className={styles.imageOverlay}>
                <Image
                  src="/images/target-location.png"
                  alt="Target Location Map"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Strip */}
      <LogoStrip />

      {/* Case Studies Section (BIRD-style Sticky Layout) */}
      <section className={styles.casesSection}>
        <div className={styles.fullWidthContainer}>
          <div className={styles.casesGrid}>
            {/* Left: Sticky Branding & Title */}
            <div className={styles.casesSidebar}>
              <div className={styles.stickyContent}>
                <span className={styles.label}>OUR WORKS <span className={styles.dot}>.</span></span>
                <h2 className={styles.casesMainTitle}>
                  Case Studies, a selection of <span className={styles.highlight}>successful projects.</span>
                </h2>
                <p className={styles.casesSubDesc}>
                  We always put our clients first to deliver our best time after time. Below is some of our proudest work.
                </p>
                <Link href="/case-studies" className={styles.viewAllLink}>
                  View all Case Studies
                </Link>
              </div>
            </div>

            {/* Right: Vertical Scrolling Projects */}
            <div className={styles.casesList}>
              {caseStudies && caseStudies.length > 0 ? caseStudies.map((study: any) => (
                <Link href={`/case-studies/${study.slug}`} key={study.id} className={styles.caseEntry}>
                  <div className={styles.caseImgWrapper}>
                    <HoverCursor>
                      {study.images?.[0] ? (
                        <Image 
                          src={study.images[0]} 
                          alt={study.client_name}
                          fill
                          className={styles.caseImg}
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className={styles.caseImg}></div>
                      )}
                    </HoverCursor>
                  </div>
                  <h3 className={styles.caseTitle}>{study.client_name}</h3>
                </Link>
              )) : (
                <p className={styles.placeholder}>Case studies coming soon.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Role of Agency Section */}
      <RoleSection />

      {/* Contact CTA Section */}
      <section className={styles.contactSection}>
        <div className={styles.fullWidthContainer}>
          <div className={styles.contactHeader}>
            <p className={styles.contactLabel}>LET'S WORK TOGETHER <span className={styles.contactDot}>.</span></p>
            <h2 className={styles.contactTitle}>
              Wanna get in touch? <span className={styles.highlightGreen}>Let{"'"}s talk</span>
            </h2>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactLeft}>
              <p>We offer exceptional services tailored to a wide range of businesses that want to improve the effectiveness of their digital marketing activities with discernible returns on investment. We aim to get back to all enquiries rapidly.</p>
              <p className={styles.contactLink}>Interested in working with us? <Link href="/contact">Contact us</Link></p>
            </div>
            <div className={styles.contactRight}>
              <p>Fill in our simple quotation request form for an indication of just how cost-effective we can be. We aim to have pricing available to review within 24 hours.</p>
              <Link href="/contact" className={styles.startProjectLink}>Start a project</Link>
            </div>
          </div>
        </div>

        <div className={styles.contactMarquee}>
          <div className={styles.marqueeInner}>
            <span>START A PROJECT</span>
            <span>START A PROJECT</span>
            <span>START A PROJECT</span>
            <span>START A PROJECT</span>
            <span>START A PROJECT</span>
            <span>START A PROJECT</span>
            <span>START A PROJECT</span>
            <span>START A PROJECT</span>
          </div>
        </div>
      </section>
    </div>
  );
}
