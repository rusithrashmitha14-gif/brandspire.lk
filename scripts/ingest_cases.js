const puppeteer = require('puppeteer-core');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaWxpZ3NrZ2l1cm1nY3V1YmxpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTI1NzAzNSwiZXhwIjoyMDg0ODMzMDM1fQ.k_XmzpN2dPh7g7APnSa9NuCeoERtUifUL5uRpqRZD9E'; 

if (!SUPABASE_URL) {
    console.error('Missing Supabase URL in .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const links = [
    'https://skyrcacademy.lk/',
    'https://www.peelpoolandspa.ca/',
    'https://amodalife.com/',
    'https://bikemart.lk/',
    'http://thequickautocare-com.us.stackstaging.com/',
    'https://www.myanysoft.com/',
    'http://blissfulauraspa-com.us.stackstaging.com/',
    'http://thediningdelights-com.us.stackstaging.com/',
    'https://thebridgeimmigration-ca.us.stackstaging.com/',
    'http://natureslanka-com.us.stackstaging.com/',
    'https://lenovoestore.com/',
    'https://jptechnologies.lk/'
];

async function run() {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ 
        headless: 'new',
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    for (let u of links) {
        console.log(`\n============================`);
        console.log(`Processing: ${u}`);
        try {
            await page.goto(u, { waitUntil: 'load', timeout: 60000 });
            
            // Wait a few seconds for animations to settle
            await new Promise(r => setTimeout(r, 4000));
            
            const title = await page.title();
            
            let desc = await page.evaluate(() => {
                const meta = document.querySelector('meta[name="description"]');
                return meta ? meta.content : '';
            });

            if (!desc || desc.trim() === '') {
                desc = await page.evaluate(() => {
                    const el = document.querySelector('h1, h2, p');
                    return el ? el.innerText.substring(0, 200) : '';
                });
            }

            // Extract client name directly from domain
            const urlObj = new URL(u);
            let domainName = urlObj.hostname.replace('www.', '').split('.')[0];
            let clientName = domainName.charAt(0).toUpperCase() + domainName.slice(1);
            
            const slug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            console.log(`Detected Name: ${clientName} | Slug: ${slug}`);

            const problem = `The client needed a modern, high-performance web presence to elevate their brand and streamline digital operations effectively.`;
            const solution = `We delivered a fully responsive, custom-crafted digital platform tailored specifically for their audience, focusing on speed and intuitive user experience.`;
            const results = desc ? `Empowered their digital footprint with clear, structured communication: "${desc.substring(0, 150)}..." driving increased engagement.` : `Successfully established a robust digital footprint, providing users with intuitive navigation and seamless accessibility.`;
            
            const screenshotPath = path.join(__dirname, `${slug}.jpg`);
            await page.screenshot({ path: screenshotPath, type: 'jpeg', quality: 90 });
            console.log(`Screenshot saved to local disk.`);

            const fileBuffer = fs.readFileSync(screenshotPath);
            const fileName = `${Date.now()}-${slug}.jpg`;
            
            console.log('Uploading screenshot to Supabase Storage...');
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('brandspire')
              .upload(`case-studies/${fileName}`, fileBuffer, {
                  contentType: 'image/jpeg'
              });

            if (uploadError) {
                console.error(`Upload error for ${u}:`, uploadError.message);
                continue;
            }

            const { data: { publicUrl } } = supabase.storage
              .from('brandspire')
              .getPublicUrl(uploadData.path);
            
            console.log('Inserting database record...');
            const dataToInsert = {
                client_name: clientName,
                industry: 'Web & Digital Presence',
                website_url: u,
                problem: problem,
                solution: solution,
                results: results,
                slug: slug,
                tech_stack: ['Next.js', 'React', 'Tailwind', 'Vercel'],
                images: [publicUrl]
            };

            const { error: dbError } = await supabase.from('case_studies').insert([dataToInsert]);
            if (dbError) {
                console.error(`DB Insert error for ${u}:`, dbError.message);
                continue;
            }

            console.log(`Success! Project '${clientName}' inserted.`);
            
            // Clean up local screenshot
            fs.unlinkSync(screenshotPath);

        } catch (err) {
            console.error(`Failed to process ${u}:`, err.message);
        }
    }

    await browser.close();
    console.log('\nAll projects processed successfully!');
}

run();
