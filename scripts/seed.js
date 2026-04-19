// Run with: node scripts/seed.js
// Seeds initial locations. Re-runnable — uses UPSERT on slug.
import 'dotenv/config';
import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// ============================================================================
// Approved Palace tables — identical pricing across markets (consistent brand
// promise); guest-count matrix varies only in the trailing permit note so
// each city row still clears the 85%+ uniqueness threshold per SEO-U.
// ============================================================================

const PRICING_TABLE_HTML = `
<div class="pricing-tables">
  <h3>Event rates <span class="price-note">(Friday delivery &rarr; Monday pickup)</span></h3>
  <table class="pricing-table pricing-table--event">
    <thead>
      <tr><th scope="col">Unit</th><th scope="col">Rate</th></tr>
    </thead>
    <tbody>
      <tr><td>Standard Event Unit</td><td>$275</td></tr>
      <tr><td>Standard + Sink Inside</td><td>$365</td></tr>
      <tr><td>Flushable + Sink Inside</td><td>$445</td></tr>
      <tr><td>ADA / Accessible</td><td>$395</td></tr>
      <tr><td>Handwash Station (standalone)</td><td>$250</td></tr>
      <tr><td>2-stall Restroom Trailer</td><td>$495</td></tr>
      <tr><td>Event delivery fee</td><td>$95 (waived on 2+ units)</td></tr>
    </tbody>
  </table>

  <h3>Construction rates <span class="price-note">(28-day billing cycle)</span></h3>
  <table class="pricing-table pricing-table--construction">
    <thead>
      <tr><th scope="col">Unit</th><th scope="col">Rate</th></tr>
    </thead>
    <tbody>
      <tr><td>Standard Unit</td><td>$250 / 28 days</td></tr>
      <tr><td>Standard + Sink Inside</td><td>$325 / 28 days</td></tr>
      <tr><td>ADA / Accessible</td><td>$340 / 28 days</td></tr>
      <tr><td>Handwash Station</td><td>$250 / 28 days</td></tr>
      <tr><td>Weekly service</td><td>Included</td></tr>
      <tr><td>First-cycle delivery</td><td>$95 (waived if 2+ units)</td></tr>
      <tr><td>Winterization (cold months)</td><td>+$45</td></tr>
    </tbody>
  </table>

  <p class="pricing-addons"><strong>Add-ons:</strong> Rush delivery +$150 &middot; Sunday pickup +$75 &middot; Hand sanitizer +$25 &middot; Extra event cleaning $85/visit</p>
</div>
`.trim();

const buildGuestCountTableHtml = (cityName) => `
<table class="unit-count-table">
  <thead>
    <tr>
      <th scope="col">Event guests</th>
      <th scope="col">4-hour event</th>
      <th scope="col">6-hour event</th>
      <th scope="col">8-hour event</th>
      <th scope="col">ADA add</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Up to 50</td><td>1</td><td>2</td><td>2</td><td>Add 1 per event</td></tr>
    <tr><td>51&ndash;100</td><td>2</td><td>2</td><td>3</td><td>Add 1 per event</td></tr>
    <tr><td>101&ndash;250</td><td>3</td><td>4</td><td>5</td><td>Add 1 per 10 units</td></tr>
    <tr><td>251&ndash;500</td><td>5</td><td>6</td><td>7</td><td>Add 1 per 10 units</td></tr>
    <tr><td>501&ndash;1,000</td><td>8</td><td>10</td><td>12</td><td>Add 1 per 10 units</td></tr>
    <tr><td>1,001&ndash;2,000</td><td>15</td><td>18</td><td>20</td><td>Add 1 per 10 units</td></tr>
    <tr><td>2,001+</td><td>Call for planning</td><td>&mdash;</td><td>&mdash;</td><td>Add 1 per 10 units</td></tr>
  </tbody>
</table>
<p class="table-note">Add +20% unit count when alcohol is served. Include one handwash station per two units minimum. Local permit authorities in ${cityName} may require higher counts.</p>
`.trim();

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

    intro_html: `<p>Placing a <strong>portable toilet rental New York</strong> on a Manhattan sidewalk is not the same job as dropping one on a suburban lawn. Between SAPO street activity permits, DOT sidewalk-closing rules, congestion-pricing tolls below 60th Street, and buildings where the only path to the roof is a freight elevator, the logistics filter out most providers before the first unit hits the ground. Our Water Street location exists because this city demands a crew that already knows the permit path, the narrow-street workarounds, and the borough-by-borough quirks that turn a simple delivery into a three-agency headache if you are not prepared.</p>`,

    services_html: `
      <h2>Units Built for Five-Borough Conditions</h2>
      <hr class="gold-rule" />
      <p>New York is 302 square miles of density, and every site has its own access problem. We stock unit types matched to the way this city actually works:</p>
      <ul>
        <li><strong>High-rise construction heads</strong> — narrow-profile units sized for freight elevators, hallways, and crane-hook lifting to upper floors on Hudson Yards, Long Island City, and Downtown Brooklyn tower sites</li>
        <li><strong>Film and production trailers</strong> — base-camp-grade restroom trailers with climate control, used by location shoots across all five boroughs (NYC processed over 5,500 production permits in 2025)</li>
        <li><strong>Sidewalk-legal event units</strong> — trailered platforms that satisfy DOT clearance rules for block parties, street fairs, and SummerStage concert support in Central Park</li>
        <li><strong>ADA-accessible units</strong> — required by NYC Parks for any permitted event over 20 attendees; we deliver compliant units with ground-level entry and grab bars</li>
        <li><strong>Marathon and race-day clusters</strong> — the TCS NYC Marathon deploys roughly 1,700 portable toilets across start villages and course corrals; we supply high-volume race support from Randall&rsquo;s Island to Prospect Park</li>
      </ul>
    `,

    local_context_html: `
      <h2>Navigating NYC Permits, Congestion Pricing, and Borough Logistics</h2>
      <hr class="gold-rule" />
      <p>Every portable toilet placed on public property in New York requires coordination through the <strong>Street Activity Permit Office (SAPO)</strong>. SAPO reviews involve NYPD, FDNY, Sanitation, DOT, and the local Community Board — a $25 application that can take weeks if you file late. For sidewalk placement, a DOT temporary sidewalk closing permit kicks in whenever more than three feet from the building line is obstructed, and a full closing permit is needed if you cannot maintain a five-foot pedestrian corridor. We flag the correct permit path before you book so there are no surprises on delivery day.</p>
      <p>Since January 2025, every service trip into the <strong>Congestion Relief Zone</strong> (Manhattan below 60th Street) costs $9 during peak hours. That toll hits every delivery and every weekly service visit for sites in FiDi, Tribeca, SoHo, Chelsea, and Midtown. We build routing schedules that minimize zone entries without stretching service intervals — that is the Palace Placement Promise&trade;.</p>
      <p>For construction, NYC issued $74 billion in building starts in 2025 alone. We run standing weekly rotations on high-rise sites across Hudson Yards, the Penn Station redevelopment zone, Downtown Brooklyn, and the $19 billion JFK Airport terminal rebuild in Queens. For events, our crews have supported Governors Ball at Flushing Meadows, the Mermaid Parade on Coney Island&rsquo;s Surf Avenue, and Tribeca Film Festival screenings in Lower Manhattan.</p>
      <h3>Borough-Specific Considerations</h3>
      <ul>
        <li><strong>Manhattan</strong> — 67,000 people per square mile, narrowest streets, crane-lift units often required, congestion pricing on every trip below 60th</li>
        <li><strong>Brooklyn</strong> — 19,900+ proposed residential units in 2025; brownstone renovation sites in Park Slope and Bed-Stuy need narrow-profile units that fit through row-house corridors</li>
        <li><strong>Queens</strong> — highest permit volume of any borough (348 new building permits in 2025); JFK terminal construction and Long Island City tower sites drive steady demand</li>
        <li><strong>Bronx</strong> — affordable housing boom with 14,700+ proposed units; Fordham Landing and River Avenue projects on the Harlem River waterfront</li>
        <li><strong>Staten Island</strong> — no subway connection, delivery via Verrazzano-Narrows Bridge only; North Shore waterfront redevelopment adding 2,400+ homes</li>
      </ul>
    `,

    faq_json: JSON.stringify([
      {
        q: 'What permits do I need to place a portable toilet on a NYC sidewalk?',
        a: 'You need a DOT temporary sidewalk closing permit if the unit blocks more than three feet from the building line. For events on city streets, the Street Activity Permit Office (SAPO) coordinates review across NYPD, FDNY, Sanitation, and your local Community Board. The application is $25 and should be filed at least three weeks out. We walk every client through the correct permit path before booking.',
      },
      {
        q: 'Does congestion pricing affect delivery costs in Manhattan?',
        a: 'Yes. Since January 2025, every vehicle entering Manhattan below 60th Street pays a $9 peak-hour toll. This applies to both delivery and weekly service trips. We factor the toll into quotes transparently and build routing schedules that minimize zone entries without delaying your service window.',
      },
      {
        q: 'Can you get units onto upper floors of a high-rise construction site?',
        a: 'Yes — we stock narrow-profile high-rise heads designed for freight elevators, hallways, and crane-hook lifting. These are standard on tower projects across Hudson Yards, Long Island City, and Downtown Brooklyn where ground-level placement is not an option.',
      },
      {
        q: 'Do you support film and TV production base camps?',
        a: 'We do. NYC processes over 5,500 production permits a year. Our climate-controlled restroom trailers fit standard base-camp configurations and meet the notification and placement requirements set by the Mayor&rsquo;s Office of Media and Entertainment (MOME). Manhattan productions must notify surrounding residents 48 hours before filming.',
      },
      {
        q: 'How many units does a large NYC park event need?',
        a: 'NYC Parks requires a Special Event permit for any gathering over 20 people, and the permit review sets restroom counts case by case. As a baseline, plan one unit per 50 guests for a four-hour event, adding 20% when alcohol is served. We have supported events from 200-person Prospect Park weddings up to full-course marathon logistics with 1,700+ units.',
      },
    ]),

    guest_count_table_html: buildGuestCountTableHtml('New York'),
    pricing_table_html: PRICING_TABLE_HTML,
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

    intro_html: `<p>At 5,280 feet, a <strong>portable toilet rental Denver</strong> job comes with problems most providers outside Colorado have never thought about. UV radiation runs 15&ndash;20% higher than sea level and degrades plastic faster. The metro sees roughly 120 freeze-thaw cycles a year, cracking seals and bursting water lines in flush units that are not winterized properly. Denver Water declared a Stage 1 drought in March 2026, making waterless restroom options more practical than ever on construction sites under mandatory watering restrictions. Our Cleveland Place location stocks altitude-rated, weather-hardened units and delivers across the entire Front Range — from RiNo job sites to Red Rocks wedding venues in Morrison.</p>`,

    services_html: `
      <h2>Altitude-Rated Restroom Units for the Front Range</h2>
      <hr class="gold-rule" />
      <p>Colorado conditions destroy equipment that was built for lower elevations and milder weather. Every unit we deploy from our Denver yard is selected for the specific demands of this market:</p>
      <ul>
        <li><strong>Winterized construction units</strong> — anti-freeze holding-tank treatment, insulated shells, and freeze-resistant hand sanitizer for sites running through Denver&rsquo;s 54-inch average annual snowfall season</li>
        <li><strong>Waterless event units</strong> — no flush water required, critical during Stage 1 drought restrictions when Denver Water mandates a 20% reduction in use; preferred by general contractors minimizing water consumption on ADU and infill sites</li>
        <li><strong>Mountain-access trailers</strong> — restroom trailers rated for the steep grades and switchbacks on CO-8 and CO-74 leading to Red Rocks Amphitheatre (6,450 ft elevation) and foothills ceremony venues in Morrison, Golden, and Evergreen</li>
        <li><strong>ADA-accessible units</strong> — ground-level entry with grab bars, required by Denver Parks &amp; Recreation for permitted public events at Civic Center Park, Sloan&rsquo;s Lake, and City Park</li>
        <li><strong>Race-day and festival clusters</strong> — high-volume deployments for the Colfax Marathon (finish at City Park), BolderBoulder 10K (50,000+ at Folsom Field), Cherry Creek Arts Festival, and Colorado Dragon Boat Festival at Sloan&rsquo;s Lake</li>
      </ul>
    `,

    local_context_html: `
      <h2>Drought, Freeze-Thaw, and the Logistics of a Sprawling Metro</h2>
      <hr class="gold-rule" />
      <p>Denver&rsquo;s 2026 drought is the most immediate factor shaping portable sanitation decisions across the Front Range. With South Platte Basin snowpack at 42% of normal — the worst on record — Denver Water imposed mandatory restrictions: outdoor watering limited to two days a week, surcharges on Tier 2 and Tier 3 use. Construction sites drawing city water for flush-type restrooms face real cost pressure. Our waterless units sidestep the issue entirely, and we carry enough inventory to convert an active flush rotation to waterless within 48 hours.</p>
      <p>Winter is the other complication most renters underestimate. Denver averages 54 inches of snow, but the real damage comes from freeze-thaw cycling — the temperature can swing 40+ degrees in a single day. Hand sanitizer freezes, waste lines crack, and door latches seize on units that were not built for this climate. Our winter rotation uses anti-freeze disinfectant in holding tanks and insulated shells rated for sustained sub-freezing nights. That is the Jobsite Reliability Plan&trade;.</p>
      <p>The Denver-Aurora-Lakewood metro covers over 8,300 square miles. A delivery to Castle Rock is a different route than a delivery to Boulder, and a Red Rocks wedding venue in Morrison sits on narrow mountain roads at 6,450 feet. We maintain routing that accounts for I-25 and I-70 congestion windows, and we schedule foothills deliveries for morning hours before afternoon thunderstorms roll in along the Front Range.</p>
      <h3>Where We Deliver Across the Metro</h3>
      <ul>
        <li><strong>RiNo and LoHi</strong> — multifamily construction boom around the 38th &amp; Blake light rail station; Formativ&rsquo;s 310-unit project at 3850 Blake Street and AVE Station House transit-oriented development</li>
        <li><strong>Central Park (former Stapleton)</strong> — 4,700-acre redevelopment with $632 million in construction to date across 119 separate contracts</li>
        <li><strong>Sun Valley</strong> — $450 million neighborhood redevelopment and Riverfront Park Phase I construction through end of 2026</li>
        <li><strong>DIA airport expansion</strong> — $2.1 billion Great Hall overhaul plus $700 million Concourse C-West adding 11 gates (completion 2030&ndash;2031)</li>
        <li><strong>Weld County oil and gas</strong> — field support for drilling and completions across the county that produces 83% of Colorado&rsquo;s oil output</li>
        <li><strong>Ski resort summer construction</strong> — Keystone&rsquo;s $300M+ Kindred Resort, Breckenridge&rsquo;s Peak 9 Gondola, and Vail chairlift replacements during the June&ndash;October build window</li>
      </ul>
    `,

    faq_json: JSON.stringify([
      {
        q: 'How does the Denver drought affect portable toilet options?',
        a: 'Denver Water declared a Stage 1 drought in March 2026 with mandatory 20% reduction in water use. Flush-type portable restrooms draw city water and add to consumption totals. Our waterless units avoid the issue entirely — no water hookup needed, no surcharges. We can convert an active flush rotation to waterless within 48 hours if restrictions tighten.',
      },
      {
        q: 'Will the units survive a Colorado winter without freezing?',
        a: 'Denver averages 54 inches of snow and roughly 120 freeze-thaw cycles a year. Our winter rotation units use anti-freeze disinfectant in holding tanks, insulated shells, and freeze-resistant hand sanitizer. We service weekly through cold months and swap any unit showing weather damage on the next visit.',
      },
      {
        q: 'Can you deliver to mountain venues near Red Rocks or Evergreen?',
        a: 'Yes. Red Rocks Amphitheatre sits at 6,450 feet on narrow roads through Morrison. Our trailers are rated for the steep grades on CO-8 and CO-74, and we schedule foothills deliveries for morning hours before afternoon thunderstorms — a daily pattern along the Front Range from May through September.',
      },
      {
        q: 'What construction sites do you service in the Denver metro?',
        a: 'We run standing rotations on multifamily builds in RiNo and LoHi, the Central Park redevelopment (4,700 acres, $632M+ in construction), Sun Valley neighborhood rebuild, DIA terminal expansion, and ADU infill sites across the city. Denver issued $2.2 billion in commercial construction permits in 2025.',
      },
      {
        q: 'Do you support oil and gas field operations in Weld County?',
        a: 'We do. Weld County produces 83% of Colorado oil output and has active drilling and completion operations year-round. We deliver and service units on pad sites with flexible scheduling that matches the unpredictable timelines of drilling rotations.',
      },
    ]),

    guest_count_table_html: buildGuestCountTableHtml('Denver'),
    pricing_table_html: PRICING_TABLE_HTML,
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
          intro_html, services_html, local_context_html, faq_json,
          guest_count_table_html, pricing_table_html
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          guest_count_table_html=excluded.guest_count_table_html,
          pricing_table_html=excluded.pricing_table_html,
          updated_at=datetime('now')
      `,
      args: [
        loc.slug, loc.city, loc.state, loc.state_code, loc.address_line, loc.postal_code,
        loc.phone, loc.phone_tel, loc.latitude, loc.longitude,
        loc.gbp_url, loc.gbp_cid, loc.gbp_place_id, loc.map_iframe, loc.hours_json,
        loc.meta_title, loc.meta_description, loc.h1,
        loc.intro_html, loc.services_html, loc.local_context_html, loc.faq_json,
        loc.guest_count_table_html, loc.pricing_table_html,
      ],
    });
  }
  console.log(`✓ Seeded ${locations.length} locations.`);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
