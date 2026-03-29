import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local 
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE URL or KEY. Please make sure .env.local is set up with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const SERVICES = [
    {
        title: 'Web Design',
        slug: 'web-design',
        description: 'We create visually stunning, user-centric designs that not only look great but also drive engagement and conversions for local businesses.',
        icon: 'design'
    },
    {
        title: 'Web Development',
        slug: 'web-development',
        description: 'Our development team builds high-performance, scalable websites using the latest technologies to ensure your business stays ahead.',
        icon: 'code'
    },
    {
        title: 'SEO',
        slug: 'seo',
        description: 'We optimize your digital presence to ensure your business ranks at the top of local search results and attracts more customers.',
        icon: 'search'
    }
];

const CASE_STUDIES = [
    {
        client_name: 'EcoGoods Sri Lanka',
        industry: 'Retail & E-commerce',
        problem: 'Low online visibility and poor conversion rates on their existing online store.',
        solution: 'A comprehensive branding and ecommerce expansion plan including a new Next.js storefront and targeted local SEO.',
        results: '150% increase in online inquiries in the first 3 months.',
        tech_stack: ['Next.js', 'Supabase', 'Stripe'],
        images: ['/images/case-study-1.jpg'],
        live_url: 'https://ecogoods.example.com',
        slug: 'eco-goods-lanka'
    },
    {
        client_name: 'TravelLanka Tours',
        industry: 'Tourism & Travel',
        problem: 'Outdated website failing to attract international tourists and poor mobile experience.',
        solution: 'Complete digital presence overhaul with modern web design, booking engine integration, and brand strategy.',
        results: 'Redefined digital presence for global reach with 200% increase in direct bookings.',
        tech_stack: ['React', 'Node.js', 'PostgreSQL'],
        images: ['/images/case-study-2.jpg'],
        live_url: 'https://travellanka.example.com',
        slug: 'travellanka-tours'
    }
];


const BLOG_POSTS = [
    {
        title: '5 Tips for Local SEO in Sri Lanka',
        slug: 'local-seo-tips-sri-lanka',
        content: 'Discover how to dominate local search results and attract more customers in your area with these actionable SEO tips. Ensure your Google Business profile is updated. Use localized keywords...',
        meta_description: 'Discover how to dominate local search results and attract more customers in your area with these actionable SEO tips.',
        featured_image: ''
    },
    {
        title: 'Why Premium Design Matters for Small Businesses',
        slug: 'premium-design-small-business',
        content: 'Investing in high-end design is not just for corporations. Learn how premium visuals can transform your local brand and build instant trust with potential customers.',
        meta_description: 'Investing in high-end design is not just for corporations. Learn how premium visuals can transform your local brand.',
        featured_image: ''
    }
];

const TEAM = [
    {
        name: 'Kasun Jayawardena',
        role: 'Creative Director',
        photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop'
    },
    {
        name: 'Dilini Perera',
        role: 'Senior UI/UX Designer',
        photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop'
    },
    {
        name: 'Nuwan Perera',
        role: 'Lead Developer',
        photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop'
    }
];

async function seed() {
    console.log("Seeding data to Supabase...");

    // Insert Services
    const { error: serviceError } = await supabase.from('services').upsert(SERVICES, { onConflict: 'slug' });
    if (serviceError) console.error("Error inserting services:", serviceError);
    else console.log("✅ Services seeded");

    // Insert Case Studies
    const { error: caseStudyError } = await supabase.from('case_studies').upsert(CASE_STUDIES, { onConflict: 'slug' });
    if (caseStudyError) console.error("Error inserting case studies:", caseStudyError);
    else console.log("✅ Case studies seeded");

    // Insert Blog Posts
    const { error: blogError } = await supabase.from('blog_posts').upsert(BLOG_POSTS, { onConflict: 'slug' });
    if (blogError) console.error("Error inserting blog posts:", blogError);
    else console.log("✅ Blog posts seeded");

    // Insert Team Members
    const { error: teamError } = await supabase.from('team_members').upsert(TEAM, { onConflict: 'name' });
    if (teamError) console.error("Error inserting team members:", teamError);
    else console.log("✅ Team members seeded");

    console.log("Seeding complete!");
}

seed();
