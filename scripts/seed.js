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
      mon: 'Open 24 hours',
      tue: 'Open 24 hours',
      wed: 'Open 24 hours',
      thu: 'Open 24 hours',
      fri: 'Open 24 hours',
      sat: 'Open 24 hours',
      sun: 'Open 24 hours',
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

      <h2>Palace New York Coverage Area</h2>
      <hr class="gold-rule" />
      <p>Palace dispatches from our Water Street yard in Lower Manhattan and delivers across all five boroughs. Same-day delivery is standard on most orders; longer-lead coordination is reserved for high-rise crane-lift jobs and large event buildouts.</p>
      <div class="palace-tables">
        <table>
          <thead>
            <tr><th scope="col">Borough / District</th><th scope="col">Typical delivery window</th><th scope="col">Common use cases</th></tr>
          </thead>
          <tbody>
            <tr><td>Lower Manhattan / FiDi</td><td>Same-day (local yard)</td><td>Corporate events, construction sites, Seaport District programming</td></tr>
            <tr><td>Midtown / Times Square</td><td>Same-day</td><td>High-rise construction, Broadway production support, street fairs</td></tr>
            <tr><td>Hudson Yards / Chelsea</td><td>Same-day</td><td>Mega-project construction, gallery events, High Line programming</td></tr>
            <tr><td>SoHo / Tribeca</td><td>Same-day</td><td>Film shoots, Tribeca Film Festival, cast-iron district events</td></tr>
            <tr><td>Upper West / Upper East Side</td><td>Same-day</td><td>Central Park events, museum galas, residential construction</td></tr>
            <tr><td>Harlem / Washington Heights</td><td>Same-day</td><td>Community events, residential construction, cultural festivals</td></tr>
            <tr><td>Downtown Brooklyn / DUMBO</td><td>Same-day</td><td>Tower construction, Brooklyn Bridge Park events, tech campus builds</td></tr>
            <tr><td>Williamsburg / Greenpoint</td><td>Same-day</td><td>Waterfront events, multifamily construction, weekend markets</td></tr>
            <tr><td>Park Slope / Bed-Stuy</td><td>Same-day</td><td>Brownstone renovations, street fairs, Prospect Park events</td></tr>
            <tr><td>Long Island City / Astoria</td><td>Same-day</td><td>High-rise construction, Astoria Park events, film production</td></tr>
            <tr><td>Flushing Meadows / Jamaica</td><td>Same-day</td><td>Governors Ball, US Open, JFK terminal construction</td></tr>
            <tr><td>South Bronx / Fordham</td><td>Same-day</td><td>Affordable housing construction, Yankee Stadium overflow, community events</td></tr>
            <tr><td>Coney Island / Brighton Beach</td><td>Same-day</td><td>Mermaid Parade, boardwalk events, seasonal programming</td></tr>
            <tr><td>Staten Island</td><td>Next-day standard</td><td>North Shore redevelopment, community events, residential construction</td></tr>
          </tbody>
        </table>
        <p class="table-note">Emergency deliveries outside standard windows are handled case-by-case &mdash; call the dispatch line for rush availability.</p>
      </div>

      <h2>What Separates Palace from Other NYC Portable Toilet Providers</h2>
      <hr class="gold-rule" />
      <h3>What Palace does differently</h3>
      <ul>
        <li><strong>Water Street yard in Lower Manhattan</strong> &mdash; inside the five-borough grid, not stationed across the Hudson. NYC deliveries happen in NYC hours, not after a truck fights tunnel traffic from New Jersey.</li>
        <li><strong>Congestion-pricing routing built in</strong> &mdash; we schedule deliveries and service visits to minimize Congestion Relief Zone entries at $9 per trip, saving clients money on long-term rotations without stretching service intervals.</li>
        <li><strong>SAPO and DOT permit coordination handled in-house</strong> &mdash; Street Activity permits and sidewalk-closing permits are filed by the Palace dispatch team, not left to the client to navigate the multi-agency review.</li>
        <li><strong>High-rise-ready from day one</strong> &mdash; narrow-profile units, crane-hook rigging, and freight elevator delivery are standard capabilities, not special requests. Hudson Yards, LIC, and Downtown Brooklyn tower sites are routine.</li>
        <li><strong>Five-borough equipment matching</strong> &mdash; Manhattan high-rise gets a crane-lift head. Central Park event gets a cluster with handwash stations. Brownstone renovation in Park Slope gets a unit that fits through a row-house corridor.</li>
      </ul>
      <h3>Common mistakes NYC event planners make</h3>
      <ul>
        <li><strong>Filing SAPO permits late</strong> &mdash; SAPO reviews involve NYPD, FDNY, Sanitation, DOT, and the local Community Board. Filing less than three weeks out risks delays or denial. Start the permit conversation before booking the provider.</li>
        <li><strong>Ignoring congestion-pricing costs</strong> &mdash; every delivery and service visit below 60th Street incurs a $9 toll. On a 12-week construction rotation with weekly service, that is $117 in tolls alone. Budget for it or choose a provider who routes efficiently.</li>
        <li><strong>Underestimating unit count for alcohol events</strong> &mdash; the +20% rule when serving alcohol and the NYC Parks ADA requirement (compliant units for any permitted event over 20 attendees) are commonly missed in initial planning.</li>
        <li><strong>Assuming ground-level delivery on tower sites</strong> &mdash; many Manhattan and Brooklyn construction sites have zero ground-level space. If the only access is a freight elevator or crane hook, you need a provider with high-rise units, not standard ground-drop equipment.</li>
        <li><strong>Forgetting handwash stations</strong> &mdash; NYC Health Code requires handwashing facilities at food-serving events. Planners who forget until a week out pay rush delivery fees.</li>
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

    // Entity Vector Signal 2 — populated when Joey provides external profile URLs
    same_as_urls: null,
    rating_value: null,
    review_count: null,
    services_json: JSON.stringify([
      'Portable toilet rental for construction sites',
      'Wedding portable toilet rental',
      'ADA-accessible portable toilet rental',
      'Luxury restroom trailer rental',
      'Festival and event portable toilet rental',
      'Handwash station rental',
      'Emergency same-day portable toilet delivery',
      'Film and TV production portable toilet rental',
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
      mon: 'Open 24 hours',
      tue: 'Open 24 hours',
      wed: 'Open 24 hours',
      thu: 'Open 24 hours',
      fri: 'Open 24 hours',
      sat: 'Open 24 hours',
      sun: 'Open 24 hours',
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

      <h2>Palace Denver Coverage Area</h2>
      <hr class="gold-rule" />
      <p>Palace dispatches from our Cleveland Place yard in central Denver and delivers across the entire Front Range metro. Same-day delivery is standard on most orders; foothills and mountain venues require morning-window coordination.</p>
      <div class="palace-tables">
        <table>
          <thead>
            <tr><th scope="col">Area / Corridor</th><th scope="col">Typical delivery window</th><th scope="col">Common use cases</th></tr>
          </thead>
          <tbody>
            <tr><td>Downtown / LoDo</td><td>Same-day (local yard)</td><td>Corporate events, Coors Field overflow, construction sites</td></tr>
            <tr><td>RiNo / LoHi</td><td>Same-day</td><td>Multifamily construction, brewery events, gallery openings</td></tr>
            <tr><td>Capitol Hill / Cheesman</td><td>Same-day</td><td>Pride events, residential construction, park programming</td></tr>
            <tr><td>Cherry Creek</td><td>Same-day</td><td>Cherry Creek Arts Festival, luxury residential construction, shopping district events</td></tr>
            <tr><td>Central Park (Stapleton)</td><td>Same-day</td><td>Large-scale redevelopment construction, community events, school builds</td></tr>
            <tr><td>Sun Valley / Barnum</td><td>Same-day</td><td>Neighborhood redevelopment, Riverfront Park construction, community events</td></tr>
            <tr><td>City Park / Sloan&rsquo;s Lake</td><td>Same-day</td><td>Colfax Marathon finish, Dragon Boat Festival, permitted park events</td></tr>
            <tr><td>Highlands / Berkeley</td><td>Same-day</td><td>Residential infill, Tennyson Street events, ADU construction</td></tr>
            <tr><td>Wash Park / Platt Park</td><td>Same-day</td><td>Neighborhood events, residential construction, South Pearl Street festivals</td></tr>
            <tr><td>Aurora / Centennial</td><td>Same-day</td><td>Suburban construction, community events, industrial sites</td></tr>
            <tr><td>Lakewood / Wheat Ridge</td><td>Same-day</td><td>Suburban construction, community events, I-70 corridor sites</td></tr>
            <tr><td>Morrison / Red Rocks</td><td>Morning window (before 12 PM)</td><td>Concert events, wedding venues, amphitheatre support</td></tr>
            <tr><td>Golden / Evergreen</td><td>Morning window (before 12 PM)</td><td>Foothills weddings, construction, community events</td></tr>
            <tr><td>Boulder / Longmont</td><td>Next-day standard</td><td>BolderBoulder 10K, University events, construction</td></tr>
            <tr><td>Castle Rock / Parker</td><td>Next-day standard</td><td>Suburban development, community events, I-25 corridor sites</td></tr>
            <tr><td>Weld County (Greeley, Brighton)</td><td>Next-day standard</td><td>Oil and gas field support, agricultural events, construction</td></tr>
            <tr><td>Ski resorts (Keystone, Breck, Vail)</td><td>Scheduled (48-hr lead)</td><td>Summer construction, resort events, chairlift replacement projects</td></tr>
          </tbody>
        </table>
        <p class="table-note">Emergency deliveries outside standard windows are handled case-by-case &mdash; call the dispatch line for rush availability.</p>
      </div>

      <h2>What Separates Palace from Other Denver Portable Toilet Providers</h2>
      <hr class="gold-rule" />
      <h3>What Palace does differently</h3>
      <ul>
        <li><strong>Central Denver yard location</strong> &mdash; inside the metro grid, not stationed in a warehouse park off E-470. Denver deliveries happen in Denver hours, not after a truck fights I-25 traffic from the south suburbs.</li>
        <li><strong>Altitude-rated equipment</strong> &mdash; every unit we deploy is selected for 5,280+ feet. UV-resistant shells, freeze-thaw-rated seals, and hand sanitizer that does not gel at sub-zero temperatures. Equipment built for sea-level climates fails here.</li>
        <li><strong>Drought-ready waterless units</strong> &mdash; with Denver Water on Stage 1 restrictions, waterless units sidestep the consumption issue entirely. We carry enough inventory to convert a flush rotation to waterless within 48 hours.</li>
        <li><strong>Mountain-access capability</strong> &mdash; trailers rated for the steep grades on CO-8 and CO-74 to Red Rocks, Morrison, Golden, and Evergreen. Morning delivery windows before afternoon thunderstorms are standard on foothills jobs.</li>
        <li><strong>Front Range equipment matching</strong> &mdash; RiNo multifamily build gets a winterized construction head. Red Rocks wedding gets a mountain-access trailer. Weld County drilling pad gets a unit rated for field conditions.</li>
      </ul>
      <h3>Common mistakes Denver event planners make</h3>
      <ul>
        <li><strong>Ignoring the altitude factor</strong> &mdash; UV radiation at 5,280 feet is 15&ndash;20% higher than sea level, and units built for lower elevations degrade faster. Cheap plastic shells crack within one season. Ask about UV-rated equipment.</li>
        <li><strong>Skipping winterization on fall bookings</strong> &mdash; Denver&rsquo;s first snow can hit in October. A long-term construction rental booked in September without winterization specified will fail when the first freeze-thaw cycle arrives.</li>
        <li><strong>Booking flush units during drought restrictions</strong> &mdash; Denver Water&rsquo;s 2026 Stage 1 restrictions add surcharges for excess water use. Flush-type portable restrooms draw city water and add to your consumption total. Waterless units avoid the issue.</li>
        <li><strong>Underestimating foothills delivery logistics</strong> &mdash; Red Rocks, Morrison, and Evergreen venues sit on narrow mountain roads. Afternoon thunderstorms roll in daily from May through September. Providers who schedule afternoon deliveries regularly miss windows.</li>
        <li><strong>Forgetting ADA requirements</strong> &mdash; Denver Parks &amp; Recreation requires ADA-accessible units for any permitted public event. Planners who skip this in initial orders scramble for rush delivery at premium rates.</li>
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

    same_as_urls: null,
    rating_value: null,
    review_count: null,
    services_json: JSON.stringify([
      'Portable toilet rental for construction sites',
      'Wedding portable toilet rental',
      'ADA-accessible portable toilet rental',
      'Luxury restroom trailer rental',
      'Festival and event portable toilet rental',
      'Handwash station rental',
      'Emergency same-day portable toilet delivery',
      'Film and TV production portable toilet rental',
      'Mountain venue portable toilet rental',
    ]),
  },

  {
    slug: 'portable-toilet-rental-chicago',
    city: 'Chicago',
    state: 'Illinois',
    state_code: 'IL',
    address_line: '1311 W 18th Pl',
    postal_code: '60608',
    phone: '(872) 366-7440',
    phone_tel: '+18723667440',
    latitude: 41.8568781,
    longitude: -87.6593354,
    gbp_url: 'https://maps.app.goo.gl/Sh2a4pP1mWaHMWvR7',
    gbp_cid: '',
    gbp_place_id: '',
    map_iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2971.5!2d-87.6593354!3d41.8568781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDUxJzI0LjgiTiA4N8KwMzknMzMuNiJX!5e0!3m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    hours_json: JSON.stringify({
      mon: 'Open 24 hours',
      tue: 'Open 24 hours',
      wed: 'Open 24 hours',
      thu: 'Open 24 hours',
      fri: 'Open 24 hours',
      sat: 'Open 24 hours',
      sun: 'Open 24 hours',
    }),

    meta_title: 'Portable Toilet Rental Chicago: Official Same-Day Delivery 2026',
    meta_description:
      'Palace delivers clean, professionally serviced portable restrooms across Chicago \u2014 Loop to Lakeview, Pilsen to the North Side. Permit coordination, winterization, and same-week dispatch from our 18th Place yard.',
    h1: 'Portable Toilet Rental Chicago',

    intro_html: `<p>Running a <strong>portable toilet rental Chicago</strong> job means planning around CDOT public-way permits, Chicago Department of Buildings inspections, Streets &amp; Sanitation windows, and the freeze-thaw reality of a city that swings from &minus;15&deg;F polar vortex to 95&deg;F lake-effect humidity within a single year. Between the Loop&rsquo;s loading-zone restrictions, Fulton Market&rsquo;s construction crane density, and Grant Park&rsquo;s festival permitting, Chicago logistics filter out providers who treat every delivery the same. Our Pilsen location on 18th Place was chosen because the yard sits inside the city grid &mdash; close enough to the Loop for same-day dispatch, close enough to the Stevenson for construction runs out to the suburbs, and close enough to Lake Shore Drive to reach every lakefront event without fighting Dan Ryan traffic.</p>`,

    services_html: `
      <h2>Units Built for Chicago Conditions</h2>
      <hr class="gold-rule" />
      <p>Chicago is 234 square miles of dense grid, industrial corridor, and lakefront, and every site has its own access problem. We stock unit types matched to the way this city actually works:</p>
      <ul>
        <li><strong>Winterized construction heads</strong> &mdash; insulated shells and anti-freeze holding-tank treatment for jobsites running through the 38 days per year Chicago averages below freezing, plus polar vortex events that can hold the city at &minus;20&deg;F for a week</li>
        <li><strong>High-rise construction units</strong> &mdash; narrow-profile hoisted units for tower sites in Fulton Market, Streeterville, and the West Loop where crane-lift delivery is the only way to reach upper floors</li>
        <li><strong>Film and TV production trailers</strong> &mdash; base-camp-grade restroom trailers with climate control, deployed regularly on Chicago PD, Chicago Fire, Chicago Med, The Bear, and Power Book IV base camps across Cinespace Chicago Film Studios and neighborhood location shoots</li>
        <li><strong>Sidewalk-legal event units</strong> &mdash; trailered platforms that satisfy CDOT clearance rules for Chicago Park District events, Mexican Independence Day Parade staging along Cermak, and Pilsen street festivals</li>
        <li><strong>ADA-accessible units</strong> &mdash; required by the Chicago Park District for any permitted lakefront event; we deliver compliant units with ground-level entry and grab bars</li>
        <li><strong>Marathon and race-day clusters</strong> &mdash; the Bank of America Chicago Marathon draws 45,000 runners through all 29 neighborhoods and requires roughly 1,400 portable toilets across start corrals in Grant Park and 20+ aid stations along the course; we supply high-volume race support from Grant Park to Washington Park</li>
      </ul>
    `,

    local_context_html: `
      <h2>Navigating Chicago Permits, Weather, and Neighborhood Logistics</h2>
      <hr class="gold-rule" />
      <p>Every portable toilet placed on public property in Chicago requires coordination through the Chicago Department of Transportation&rsquo;s Public Way Use permit system. CDOT reviews involve the Department of Streets &amp; Sanitation, the Chicago Police Department&rsquo;s event permitting desk, and &mdash; for any placement within a historic district or landmark boundary &mdash; the Commission on Chicago Landmarks. Standard public-way applications run $100 for the first 100 square feet with additional fees for extended placements, and Chicago requires a minimum five-foot accessible pedestrian path maintained around any obstruction. Lakefront events inside Grant Park, Millennium Park, or Soldier Field perimeters require Chicago Park District permits, which have separate lead times.</p>
      <p>Winter is a logistics variable that Sun Belt providers never see. From December through March, Chicago averages 38 inches of snowfall, and the city&rsquo;s 2019 polar vortex event held temperatures below &minus;20&deg;F for five consecutive days &mdash; cold enough to crack holding tanks and freeze service trucks. Every Palace winter rental ships with anti-freeze treatment, insulated shells on long-term units, and a servicing schedule built around the freeze-thaw reality of Chicago winter.</p>
      <p>For construction, the City of Chicago issued over 23,000 building permits in 2024 with major concentrations in Fulton Market, the 78 megadevelopment south of Roosevelt, Lincoln Yards along the North Branch Chicago River, and the continuing residential boom in Logan Square and Avondale. For events, our crews have supported Lollapalooza at Grant Park (400,000 attendees across four days), Taste of Chicago, the Chicago Air and Water Show along North Avenue Beach, Pride Parade on Halsted, and the Bud Billiken Parade in Bronzeville.</p>
      <h3>Neighborhood-Specific Considerations</h3>
      <ul>
        <li><strong>The Loop</strong> &mdash; tight loading-zone windows, TIF-district construction density, congestion pricing proposals in discussion for 2026</li>
        <li><strong>Fulton Market / West Loop</strong> &mdash; highest construction volume in the city, crane-lift deliveries common, narrow alleyway access to rear sites</li>
        <li><strong>Pilsen / Little Village</strong> &mdash; historic district overlays, parking-permit requirements for 18th Street and 26th Street corridors, street fair volume during Mexican Independence Day season</li>
        <li><strong>Lincoln Park / Lakeview</strong> &mdash; Chicago Park District permits for any lakefront placement, residential HOA coordination in high-density blocks</li>
        <li><strong>South Loop / Bronzeville</strong> &mdash; active development zone with 78 megaproject rollout, ongoing institutional expansion at IIT</li>
        <li><strong>North Side / Wrigleyville</strong> &mdash; Cubs game-day restrictions on Clark and Addison, 2.6 million annual Wrigley Field visitors plus overflow event deployments</li>
        <li><strong>Hyde Park / South Shore</strong> &mdash; University of Chicago event volume, summer lakefront festival circuit, coordinated deliveries with Chicago Park District</li>
      </ul>

      <h2>Palace Chicago Coverage Area</h2>
      <hr class="gold-rule" />
      <p>Palace dispatches from the 18th Place yard in Pilsen and delivers across every Chicago neighborhood plus near-suburban construction zones. Same-day delivery is standard on most orders; longer-lead coordination is reserved for high-rise crane-lift jobs and large event buildouts.</p>
      <div class="palace-tables">
        <table>
          <thead>
            <tr><th scope="col">Neighborhood / District</th><th scope="col">Typical delivery window</th><th scope="col">Common use cases</th></tr>
          </thead>
          <tbody>
            <tr><td>The Loop</td><td>Same-day (before 11 AM cutoff)</td><td>Corporate events, Millennium Park programming, street fairs</td></tr>
            <tr><td>West Loop / Fulton Market</td><td>Same-day</td><td>High-rise construction, restaurant events, crane-lift rentals</td></tr>
            <tr><td>Pilsen / Little Village</td><td>Same-day (local yard)</td><td>Street festivals, cultural events, mural tours, historic-district programming</td></tr>
            <tr><td>River North</td><td>Same-day</td><td>Gallery openings, high-rise construction, Merchandise Mart events</td></tr>
            <tr><td>Lincoln Park / Lakeview</td><td>Same-day</td><td>Wrigleyville game-day overflow, Lincoln Park Zoo events, residential construction</td></tr>
            <tr><td>Gold Coast / Old Town</td><td>Same-day</td><td>Private events, Oak Street events, historic-district construction</td></tr>
            <tr><td>Wicker Park / Bucktown</td><td>Same-day</td><td>Festival weekends, residential construction, 606 Trail events</td></tr>
            <tr><td>Logan Square / Avondale</td><td>Same-day</td><td>Residential construction boom, Logan Square Farmers Market, Kedzie corridor events</td></tr>
            <tr><td>South Loop / Near South</td><td>Same-day</td><td>Soldier Field events, Museum Campus, McCormick Place conference overflow</td></tr>
            <tr><td>Bronzeville / Kenwood</td><td>Same-day</td><td>IIT events, Bud Billiken Parade, residential construction</td></tr>
            <tr><td>Hyde Park / South Shore</td><td>Same-day</td><td>University of Chicago events, Jackson Park programming, lakefront festivals</td></tr>
            <tr><td>Wrigleyville / North Center</td><td>Same-day</td><td>Cubs game days, Metro concerts, residential construction</td></tr>
            <tr><td>Uptown / Edgewater</td><td>Same-day</td><td>Riviera Theatre events, Foster Beach programming, multifamily construction</td></tr>
            <tr><td>Midway / Garfield Ridge</td><td>Same-day</td><td>Airport-adjacent construction, industrial sites, community events</td></tr>
            <tr><td>Humboldt Park / West Town</td><td>Same-day</td><td>Puerto Rican Parade, 606 Trail, residential development</td></tr>
            <tr><td>North Suburbs (Evanston, Skokie)</td><td>Next-day standard</td><td>University events, residential construction, suburban festivals</td></tr>
            <tr><td>West Suburbs (Oak Park, Cicero)</td><td>Next-day standard</td><td>Frank Lloyd Wright district events, construction</td></tr>
            <tr><td>South Suburbs (Oak Lawn, Blue Island)</td><td>Next-day standard</td><td>Community events, construction sites</td></tr>
          </tbody>
        </table>
        <p class="table-note">Emergency deliveries outside standard windows are handled case-by-case &mdash; call the dispatch line for rush availability.</p>
      </div>

      <h2>What Separates Palace from Other Chicago Portable Toilet Providers</h2>
      <hr class="gold-rule" />
      <h3>What Palace does differently</h3>
      <ul>
        <li><strong>Pilsen yard location</strong> &mdash; inside the city grid, not stationed in the suburbs. Chicago deliveries happen in Chicago hours, not after a truck fights rush-hour traffic down I-55.</li>
        <li><strong>Winterization built in</strong> &mdash; every long-term rental from November through March ships with anti-freeze holding-tank treatment and insulated shells. No upcharge, no cracked tank on the day a polar vortex rolls through.</li>
        <li><strong>CDOT permit coordination handled in-house</strong> &mdash; Public Way Use permits are filed by the Palace dispatch team, not left to the client to figure out three weeks before an event.</li>
        <li><strong>Same-week dispatch as the default</strong> &mdash; event planners who book Monday usually see delivery by Thursday. Construction GCs get same-day on standard units unless the site requires a crane-lift coordination.</li>
        <li><strong>Chicago-grade equipment</strong> &mdash; unit selection is matched to the site, not the default. Fulton Market high-rise gets a narrow-profile head. Grant Park festival gets a cluster with handwash stations. Pilsen historic-district event gets a trailered platform that fits the cleared corridor.</li>
      </ul>
      <h3>Common mistakes Chicago event planners make</h3>
      <ul>
        <li><strong>Booking without a permit conversation first</strong> &mdash; CDOT Public Way Use permits can take 3+ weeks. Events that book a provider before securing the permit frequently delay their delivery or scramble to pay rush fees.</li>
        <li><strong>Underestimating guest count</strong> &mdash; the alcohol adjustment (+20% unit count when serving) and the ADA requirement (Chicago Park District mandates ADA units for any permitted event) are commonly skipped in initial planning. Undersized events mean lines and complaints.</li>
        <li><strong>Picking a provider based only on price</strong> &mdash; the portable toilet rental market has a wide quality gap. The cheapest providers routinely skip servicing, deliver off-window, or show up with equipment that was last cleaned at the previous booking. The $30 price difference costs the event.</li>
        <li><strong>Not accounting for winter</strong> &mdash; booking a long-term construction rental in October without specifying winterization means the first polar vortex day in January becomes a problem the GC has to solve on-site. Ask about winterization on any rental that crosses November.</li>
        <li><strong>Forgetting handwash stations</strong> &mdash; Chicago Park District permits for food-serving events require handwash stations. So does Cook County health code for food truck events. Planners who forget until a week out pay rush rates for a stand-alone unit.</li>
      </ul>
    `,

    faq_json: JSON.stringify([
      {
        q: 'What permits do I need to place a portable toilet on a Chicago sidewalk?',
        a: 'You need a Chicago Department of Transportation Public Way Use permit if the unit is placed on the public right-of-way. Applications run $100 for placements under 100 square feet and should be filed at least three weeks out. CDOT coordinates review with Streets & Sanitation, the Chicago Police Department\u2019s event permitting desk, and, inside a landmark district, the Commission on Chicago Landmarks. We walk every client through the correct permit path before booking.',
      },
      {
        q: 'How do you handle portable toilets during Chicago winter?',
        a: 'Every Palace winter rental from November through March ships with anti-freeze holding-tank treatment and, on construction long-term rentals, insulated exterior shells. Our servicing schedule accounts for sub-zero weeks where standard units risk freezing \u2014 we adjust pump-out frequency so tanks never hold liquid overnight during a cold snap. During polar vortex events we pre-treat units the day before the forecasted low hits.',
      },
      {
        q: 'Can you deliver to high-rise construction sites in Fulton Market or the Loop?',
        a: 'Yes. Our narrow-profile high-rise construction units are sized for crane-hook lifting to upper floors and for freight elevator delivery where the site has one. Fulton Market and the Loop are routine delivery zones \u2014 we coordinate crane windows with the GC\u2019s site superintendent before dispatch and handle the CDOT lane-closure permit if one is required for the lift.',
      },
      {
        q: 'Do you support the Chicago Marathon and other large races?',
        a: 'Yes. The Bank of America Chicago Marathon requires approximately 1,400 portable toilets across start corrals in Grant Park and aid stations at every mile along the 29-neighborhood course. We also supply the BTN Big 10K, the Bank of America Chicago 13.1, the Chicago Half, and the Shamrock Shuffle. Race-day clusters include handwash stations and ADA units scaled to participant count.',
      },
      {
        q: 'Can you deliver to film and TV productions shot in Chicago?',
        a: 'Yes. Chicago\u2019s film production market is the strongest it has been in a decade, and Palace delivers base-camp-grade luxury restroom trailers, ADA units, and handwash stations to sets regularly \u2014 from Cinespace Chicago Film Studios in Douglas Park to neighborhood location shoots across the city. Early-morning delivery windows, mid-shoot servicing, and Chicago Film Office permit coordination are standard on every production booking.',
      },
      {
        q: 'What about Pilsen, Little Village, and historic-district events?',
        a: 'Our yard is in Pilsen, so we know the 18th Street corridor and the 26th Street corridor in Little Village better than any provider outside the neighborhood. For Mexican Independence Day Parade staging, Dia de Muertos programming at the National Museum of Mexican Art, and Pilsen Open Studios weekends, we handle the historic-district permit coordination and deliver before street closures go live.',
      },
    ]),

    guest_count_table_html: buildGuestCountTableHtml('Chicago'),
    pricing_table_html: PRICING_TABLE_HTML,

    same_as_urls: null,
    rating_value: null,
    review_count: null,
    services_json: JSON.stringify([
      'Portable toilet rental for construction sites',
      'Wedding portable toilet rental',
      'ADA-accessible portable toilet rental',
      'Luxury restroom trailer rental',
      'Festival and event portable toilet rental',
      'Handwash station rental',
      'Emergency same-day portable toilet delivery',
      'Film and TV production portable toilet rental',
      'Lakefront event portable toilet rental',
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
          intro_html, services_html, local_context_html, faq_json,
          guest_count_table_html, pricing_table_html,
          same_as_urls, rating_value, review_count, services_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          same_as_urls=excluded.same_as_urls,
          rating_value=excluded.rating_value,
          review_count=excluded.review_count,
          services_json=excluded.services_json,
          updated_at=datetime('now')
      `,
      args: [
        loc.slug, loc.city, loc.state, loc.state_code, loc.address_line, loc.postal_code,
        loc.phone, loc.phone_tel, loc.latitude, loc.longitude,
        loc.gbp_url, loc.gbp_cid, loc.gbp_place_id, loc.map_iframe, loc.hours_json,
        loc.meta_title, loc.meta_description, loc.h1,
        loc.intro_html, loc.services_html, loc.local_context_html, loc.faq_json,
        loc.guest_count_table_html, loc.pricing_table_html,
        loc.same_as_urls, loc.rating_value, loc.review_count, loc.services_json,
      ],
    });
  }
  console.log(`✓ Seeded ${locations.length} locations.`);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
