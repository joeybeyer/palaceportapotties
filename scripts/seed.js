// Run with: node scripts/seed.js
// Seeds initial locations. Re-runnable — uses UPSERT on slug.
import 'dotenv/config';
import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const locations = [
  {
    slug: 'portable-toilet-rental-new-york',
    city: 'New York',
    state: 'New York',
    state_code: 'NY',
    address_line: '251 Water St',
    postal_code: '10038',
    phone: '(332) 241-1073',
    phone_tel: '+13322411073',
    latitude: 40.7080430,
    longitude: -74.0020720,
    gbp_url: 'https://maps.app.goo.gl/Sh2a4pP1mWaHMWvR7',
    gbp_cid: '120878491338782161',
    gbp_place_id: 'ChIJdY-T_3C6KgIR0bU78VhyrQE',
    map_iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4485.48434394785!2d-74.002072!3d40.708042999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x22aba70ff938f75%3A0x1ad7258f13bb5d1!2sPorta%20Potties!5e1!3m2!1sen!2sus!4v1776548030265!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    hours_json: JSON.stringify({
      mon: '7:00 AM – 6:00 PM',
      tue: '7:00 AM – 6:00 PM',
      wed: '7:00 AM – 6:00 PM',
      thu: '7:00 AM – 6:00 PM',
      fri: '7:00 AM – 6:00 PM',
      sat: '8:00 AM – 4:00 PM',
      sun: 'Closed',
    }),

    meta_title: 'Portable Toilet Rental New York: Official Fast Delivery 2026',
    meta_description:
      'Reserve clean restroom units across Manhattan and the five boroughs. Fast dispatch, professional placement, and presentation you can feel good about — call (332) 241-1073 for transparent pricing today.',
    h1: 'Portable Toilet Rental New York',

    intro_html: `<p>Need <strong>portable toilet rental New York</strong> that actually shows up on time and looks presentable when it does? Our official Water Street location delivers clean, serviced units across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. We handle DOT coordination, sidewalk placement, and the logistics most providers get wrong when working a dense urban footprint. That is the Palace Standard.</p>`,

    services_html: `
      <h2>Restroom Units We Deliver Across the Five Boroughs</h2>
      <hr class="gold-rule" />
      <p>Every rental includes scheduled servicing, hand sanitizer, stocked supplies, and lockable, presentation-grade units. Choose from:</p>
      <ul>
        <li><strong>Standard construction units</strong> — built for job-site traffic, weekly service included</li>
        <li><strong>Event-ready flushable units</strong> — preferred for block parties, film shoots, and permitted gatherings</li>
        <li><strong>ADA-accessible units</strong> — required for most NYC permitted events</li>
        <li><strong>Deluxe restroom trailers</strong> — weddings, corporate events, and rooftop venues</li>
        <li><strong>Hand wash stations</strong> — pairs with any standard unit for code compliance</li>
      </ul>
    `,

    local_context_html: `
      <h2>Permits, Placement, and What Trips People Up in NYC</h2>
      <hr class="gold-rule" />
      <p>NYC is its own beast. DOT sidewalk permits, DCA event permits, and FDNY clearances all come into play depending on where the unit sits and what you are running. We work with crews regularly on projects across Lower Manhattan, DUMBO, Long Island City, and Midtown, and we flag the permit path before delivery day instead of after.</p>
      <p>For film and event production, units often need to sit on trailered platforms to meet sidewalk rules. For construction, most general contractors on Water Street, FiDi, and Seaport projects keep us on standing weekly rotation. That is what the Palace Placement Promise™ is built around — reliable scheduling and pickup so you never have to chase anyone down.</p>
      <h3>Common New York Use Cases</h3>
      <ul>
        <li>Seaport District construction and renovation projects</li>
        <li>Central Park permitted 5K, 10K, and marathon support</li>
        <li>Brooklyn and Queens block parties and street fairs</li>
        <li>Rooftop wedding venues requiring trailer-grade units</li>
        <li>Film production and location shoots</li>
        <li>Disaster response and emergency staging</li>
      </ul>
    `,

    faq_json: JSON.stringify([
      {
        q: 'How quickly can you deliver a unit in Manhattan?',
        a: 'Same-day delivery is available for orders placed before 11 AM. Next-day is standard for all five boroughs. Call for a Royal Response Quote™ with immediate availability.',
      },
      {
        q: 'Do I need a permit to place a portable toilet on a NYC sidewalk?',
        a: 'Yes — DOT sidewalk permits are required for public right-of-way placement. We can walk you through which permit applies to your project before you book.',
      },
      {
        q: 'Do you service rooftop and high-floor event spaces?',
        a: 'Yes. Trailer-style restrooms are our standard for wedding and corporate events at rooftop venues across Manhattan and Brooklyn.',
      },
      {
        q: 'What is the minimum rental period?',
        a: 'One day for events and a one-week minimum for construction rotations, with weekly service and restocking included.',
      },
      {
        q: 'Are your units cleaned before every delivery?',
        a: 'Yes. Every unit is inspected, cleaned, and stocked before it leaves our yard — the Palace Clean Check™ is standard on every rental.',
      },
    ]),
  },

  {
    slug: 'portable-toilet-rental-denver',
    city: 'Denver',
    state: 'Colorado',
    state_code: 'CO',
    address_line: '1540 Cleveland Pl',
    postal_code: '80202',
    phone: '(720) 821-7760',
    phone_tel: '+17208217760',
    latitude: 39.7413668,
    longitude: -104.9879058,
    gbp_url: 'https://maps.app.goo.gl/Sh2a4pP1mWaHMWvR7',
    gbp_cid: '15000111183456982789',
    gbp_place_id: 'ChIJo7s2EaUtIasRBVdRuaUZK9A',
    map_iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4545.959721511586!2d-104.9879058!3d39.7413668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xab952da51136bba3%3A0xd02b19a5b9515705!2sPorta%20Potties!5e1!3m2!1sen!2sus!4v1776548070996!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    hours_json: JSON.stringify({
      mon: '7:00 AM – 6:00 PM',
      tue: '7:00 AM – 6:00 PM',
      wed: '7:00 AM – 6:00 PM',
      thu: '7:00 AM – 6:00 PM',
      fri: '7:00 AM – 6:00 PM',
      sat: '8:00 AM – 4:00 PM',
      sun: 'Closed',
    }),

    meta_title: 'Portable Toilet Rental Denver: Official Same-Day Setup 2026',
    meta_description:
      'Book clean restroom units for Denver job sites, weddings, and outdoor events. Fast mountain-region dispatch, dependable service, and transparent pricing — call (720) 821-7760 for a quote right now.',
    h1: 'Portable Toilet Rental Denver',

    intro_html: `<p>Need <strong>portable toilet rental Denver</strong> that handles everything from downtown construction to foothills weddings? Our official Cleveland Place location delivers clean, serviced units across Denver Metro, Boulder, Aurora, and the Front Range. We handle altitude, weather swings, and the logistical quirks of mountain-adjacent event sites that trip up regional suppliers. That is the Palace Standard.</p>`,

    services_html: `
      <h2>Restroom Units We Deliver Across Denver Metro</h2>
      <hr class="gold-rule" />
      <p>Every rental includes scheduled servicing, hand sanitizer, and weather-rated units built for Colorado conditions. Choose from:</p>
      <ul>
        <li><strong>Standard construction units</strong> — weekly service, built for long-term job sites</li>
        <li><strong>Event-ready flushable units</strong> — preferred for weddings, festivals, and race events</li>
        <li><strong>ADA-accessible units</strong> — required for most permitted Denver events</li>
        <li><strong>Deluxe restroom trailers</strong> — Red Rocks adjacent weddings, corporate retreats, and foothills venues</li>
        <li><strong>Hand wash and water stations</strong> — essential for high-altitude summer events</li>
      </ul>
    `,

    local_context_html: `
      <h2>Altitude, Weather, and Events Across the Front Range</h2>
      <hr class="gold-rule" />
      <p>Denver events and job sites face conditions most suppliers underestimate. Mile-high altitude affects hydration, afternoon thunderstorms roll in fast during summer, and winter cold snaps demand units that actually seal. We build delivery routes around the Mile High City, from downtown LoDo high-rises to Boulder campus projects and Red Rocks adjacent weddings in Morrison.</p>
      <p>Our crews service construction rotations in RiNo, the Golden Triangle, and the tech corridor between Denver and Boulder. For event support we have run logistics for Civic Center Park gatherings, 16th Street Mall activations, and foothills ceremony venues that require both trailer-style units and standard event rentals. That is the Jobsite Reliability Plan™ — real scheduling, real service, no drama.</p>
      <h3>Common Denver Metro Use Cases</h3>
      <ul>
        <li>LoDo and RiNo construction and renovation projects</li>
        <li>Civic Center Park and Commons Park permitted events</li>
        <li>Red Rocks adjacent wedding venues in Morrison and Golden</li>
        <li>Colfax Marathon, BolderBoulder, and Front Range race support</li>
        <li>Oil and gas field support across Weld County</li>
      </ul>
    `,

    faq_json: JSON.stringify([
      {
        q: 'How fast can you deliver to a Denver event venue?',
        a: 'Same-day delivery is available across Denver Metro for orders before 11 AM. Foothills and mountain venues typically receive 24-48 hour turnaround with the Royal Response Quote™.',
      },
      {
        q: 'Do your units handle Colorado winters?',
        a: 'Yes — our winter rotation units are insulated and include freeze-resistant solution. We service units weekly through the cold season so nothing freezes up on you.',
      },
      {
        q: 'Can you deliver to foothills venues near Red Rocks or Golden?',
        a: 'Absolutely. We regularly deliver trailer and standard units to wedding and corporate venues throughout Morrison, Golden, Evergreen, and the Front Range foothills.',
      },
      {
        q: 'What is the minimum rental period?',
        a: 'One day for events and a one-week minimum for construction, with weekly service and restocking included.',
      },
      {
        q: 'Are your units actually presentable for weddings?',
        a: 'Yes — our event and trailer units are kept to a separate, wedding-ready standard. Every rental goes through the Palace Clean Check™ before delivery.',
      },
    ]),
  },
];

async function seed() {
  for (const loc of locations) {
    console.log(`> Seeding ${loc.city}, ${loc.state_code}`);
    await db.execute({
      sql: `
        INSERT INTO locations (
          slug, city, state, state_code, address_line, postal_code,
          phone, phone_tel, latitude, longitude,
          gbp_url, gbp_cid, gbp_place_id, map_iframe, hours_json,
          meta_title, meta_description, h1,
          intro_html, services_html, local_context_html, faq_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(slug) DO UPDATE SET
          city=excluded.city, state=excluded.state, state_code=excluded.state_code,
          address_line=excluded.address_line, postal_code=excluded.postal_code,
          phone=excluded.phone, phone_tel=excluded.phone_tel,
          latitude=excluded.latitude, longitude=excluded.longitude,
          gbp_url=excluded.gbp_url, gbp_cid=excluded.gbp_cid, gbp_place_id=excluded.gbp_place_id,
          map_iframe=excluded.map_iframe, hours_json=excluded.hours_json,
          meta_title=excluded.meta_title, meta_description=excluded.meta_description, h1=excluded.h1,
          intro_html=excluded.intro_html, services_html=excluded.services_html,
          local_context_html=excluded.local_context_html, faq_json=excluded.faq_json,
          updated_at=datetime('now')
      `,
      args: [
        loc.slug, loc.city, loc.state, loc.state_code, loc.address_line, loc.postal_code,
        loc.phone, loc.phone_tel, loc.latitude, loc.longitude,
        loc.gbp_url, loc.gbp_cid, loc.gbp_place_id, loc.map_iframe, loc.hours_json,
        loc.meta_title, loc.meta_description, loc.h1,
        loc.intro_html, loc.services_html, loc.local_context_html, loc.faq_json,
      ],
    });
  }
  console.log(`✓ Seeded ${locations.length} locations.`);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
