// Run with: node scripts/seed.js
// Seeds initial locations. Re-runnable - uses UPSERT on slug.
import 'dotenv/config';
import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// ============================================================================
// Approved Palace tables - identical pricing across markets (consistent brand
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
    slug: 'porta-potties-new-york',
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

    meta_title: 'Porta Potties New York: Official Fast Delivery 2026',
    meta_description:
      'Reserve clean restroom units across Manhattan and the five boroughs. Fast dispatch, professional placement, and presentation you can feel good about - call (332) 241-1073 for transparent pricing today.',
    h1: 'Porta Potties New York',

    intro_html: `<p>Placing a <strong>porta potties New York</strong> on a Manhattan sidewalk is not the same job as dropping one on a suburban lawn. Between SAPO street activity permits, DOT sidewalk-closing rules, congestion-pricing tolls below 60th Street, and buildings where the only path to the roof is a freight elevator, the logistics filter out most providers before the first unit hits the ground. Our Water Street location exists because this city demands a crew that already knows the permit path, the narrow-street workarounds, and the borough-by-borough quirks that turn a simple delivery into a three-agency headache if you are not prepared.</p>`,

    services_html: `
      <h2>Units Built for Five-Borough Conditions</h2>
      <hr class="gold-rule" />
      <p>New York is 302 square miles of density, and every site has its own access problem. We stock unit types matched to the way this city actually works:</p>
      <ul>
        <li><strong>High-rise construction heads</strong> - narrow-profile units sized for freight elevators, hallways, and crane-hook lifting to upper floors on Hudson Yards, Long Island City, and Downtown Brooklyn tower sites</li>
        <li><strong>Film and production trailers</strong> - base-camp-grade restroom trailers with climate control, used by location shoots across all five boroughs (NYC processed over 5,500 production permits in 2025)</li>
        <li><strong>Sidewalk-legal event units</strong> - trailered platforms that satisfy DOT clearance rules for block parties, street fairs, and SummerStage concert support in Central Park</li>
        <li><strong>ADA-accessible units</strong> - required by NYC Parks for any permitted event over 20 attendees; we deliver compliant units with ground-level entry and grab bars</li>
        <li><strong>Marathon and race-day clusters</strong> - the TCS NYC Marathon deploys roughly 1,700 portable toilets across start villages and course corrals; we supply high-volume race support from Randall&rsquo;s Island to Prospect Park</li>
      </ul>
    `,

    local_context_html: `
      <h2>Navigating NYC Permits, Congestion Pricing, and Borough Logistics</h2>
      <hr class="gold-rule" />
      <p>Every portable toilet placed on public property in New York requires coordination through the <strong>Street Activity Permit Office (SAPO)</strong>. SAPO reviews involve NYPD, FDNY, Sanitation, DOT, and the local Community Board - a $25 application that can take weeks if you file late. For sidewalk placement, a DOT temporary sidewalk closing permit kicks in whenever more than three feet from the building line is obstructed, and a full closing permit is needed if you cannot maintain a five-foot pedestrian corridor. We flag the correct permit path before you book so there are no surprises on delivery day.</p>
      <p>Since January 2025, every service trip into the <strong>Congestion Relief Zone</strong> (Manhattan below 60th Street) costs $9 during peak hours. That toll hits every delivery and every weekly service visit for sites in FiDi, Tribeca, SoHo, Chelsea, and Midtown. We build routing schedules that minimize zone entries without stretching service intervals - that is the Palace Placement Promise&trade;.</p>
      <p>For construction, NYC issued $74 billion in building starts in 2025 alone. We run standing weekly rotations on high-rise sites across Hudson Yards, the Penn Station redevelopment zone, Downtown Brooklyn, and the $19 billion JFK Airport terminal rebuild in Queens. For events, our crews have supported Governors Ball at Flushing Meadows, the Mermaid Parade on Coney Island&rsquo;s Surf Avenue, and Tribeca Film Festival screenings in Lower Manhattan.</p>
      <h3>Borough-Specific Considerations</h3>
      <ul>
        <li><strong>Manhattan</strong> - 67,000 people per square mile, narrowest streets, crane-lift units often required, congestion pricing on every trip below 60th</li>
        <li><strong>Brooklyn</strong> - 19,900+ proposed residential units in 2025; brownstone renovation sites in Park Slope and Bed-Stuy need narrow-profile units that fit through row-house corridors</li>
        <li><strong>Queens</strong> - highest permit volume of any borough (348 new building permits in 2025); JFK terminal construction and Long Island City tower sites drive steady demand</li>
        <li><strong>Bronx</strong> - affordable housing boom with 14,700+ proposed units; Fordham Landing and River Avenue projects on the Harlem River waterfront</li>
        <li><strong>Staten Island</strong> - no subway connection, delivery via Verrazzano-Narrows Bridge only; North Shore waterfront redevelopment adding 2,400+ homes</li>
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
        a: 'Yes - we stock narrow-profile high-rise heads designed for freight elevators, hallways, and crane-hook lifting. These are standard on tower projects across Hudson Yards, Long Island City, and Downtown Brooklyn where ground-level placement is not an option.',
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

    // Entity Vector Signal 2 - populated when Joey provides external profile URLs
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
    slug: 'porta-potties-denver',
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

    meta_title: 'Porta Potties Denver: Official Same-Day Setup 2026',
    meta_description:
      'Book clean restroom units for Denver job sites, weddings, and outdoor events. Fast mountain-region dispatch, dependable service, and transparent pricing - call (720) 821-7760 for a quote right now.',
    h1: 'Porta Potties Denver',

    intro_html: `<p>At 5,280 feet, a <strong>porta potties Denver</strong> job comes with problems most providers outside Colorado have never thought about. UV radiation runs 15&ndash;20% higher than sea level and degrades plastic faster. The metro sees roughly 120 freeze-thaw cycles a year, cracking seals and bursting water lines in flush units that are not winterized properly. Denver Water declared a Stage 1 drought in March 2026, making waterless restroom options more practical than ever on construction sites under mandatory watering restrictions. Our Cleveland Place location stocks altitude-rated, weather-hardened units and delivers across the entire Front Range - from RiNo job sites to Red Rocks wedding venues in Morrison.</p>`,

    services_html: `
      <h2>Altitude-Rated Restroom Units for the Front Range</h2>
      <hr class="gold-rule" />
      <p>Colorado conditions destroy equipment that was built for lower elevations and milder weather. Every unit we deploy from our Denver yard is selected for the specific demands of this market:</p>
      <ul>
        <li><strong>Winterized construction units</strong> - anti-freeze holding-tank treatment, insulated shells, and freeze-resistant hand sanitizer for sites running through Denver&rsquo;s 54-inch average annual snowfall season</li>
        <li><strong>Waterless event units</strong> - no flush water required, critical during Stage 1 drought restrictions when Denver Water mandates a 20% reduction in use; preferred by general contractors minimizing water consumption on ADU and infill sites</li>
        <li><strong>Mountain-access trailers</strong> - restroom trailers rated for the steep grades and switchbacks on CO-8 and CO-74 leading to Red Rocks Amphitheatre (6,450 ft elevation) and foothills ceremony venues in Morrison, Golden, and Evergreen</li>
        <li><strong>ADA-accessible units</strong> - ground-level entry with grab bars, required by Denver Parks &amp; Recreation for permitted public events at Civic Center Park, Sloan&rsquo;s Lake, and City Park</li>
        <li><strong>Race-day and festival clusters</strong> - high-volume deployments for the Colfax Marathon (finish at City Park), BolderBoulder 10K (50,000+ at Folsom Field), Cherry Creek Arts Festival, and Colorado Dragon Boat Festival at Sloan&rsquo;s Lake</li>
      </ul>
    `,

    local_context_html: `
      <h2>Drought, Freeze-Thaw, and the Logistics of a Sprawling Metro</h2>
      <hr class="gold-rule" />
      <p>Denver&rsquo;s 2026 drought is the most immediate factor shaping portable sanitation decisions across the Front Range. With South Platte Basin snowpack at 42% of normal - the worst on record - Denver Water imposed mandatory restrictions: outdoor watering limited to two days a week, surcharges on Tier 2 and Tier 3 use. Construction sites drawing city water for flush-type restrooms face real cost pressure. Our waterless units sidestep the issue entirely, and we carry enough inventory to convert an active flush rotation to waterless within 48 hours.</p>
      <p>Winter is the other complication most renters underestimate. Denver averages 54 inches of snow, but the real damage comes from freeze-thaw cycling - the temperature can swing 40+ degrees in a single day. Hand sanitizer freezes, waste lines crack, and door latches seize on units that were not built for this climate. Our winter rotation uses anti-freeze disinfectant in holding tanks and insulated shells rated for sustained sub-freezing nights. That is the Jobsite Reliability Plan&trade;.</p>
      <p>The Denver-Aurora-Lakewood metro covers over 8,300 square miles. A delivery to Castle Rock is a different route than a delivery to Boulder, and a Red Rocks wedding venue in Morrison sits on narrow mountain roads at 6,450 feet. We maintain routing that accounts for I-25 and I-70 congestion windows, and we schedule foothills deliveries for morning hours before afternoon thunderstorms roll in along the Front Range.</p>
      <h3>Where We Deliver Across the Metro</h3>
      <ul>
        <li><strong>RiNo and LoHi</strong> - multifamily construction boom around the 38th &amp; Blake light rail station; Formativ&rsquo;s 310-unit project at 3850 Blake Street and AVE Station House transit-oriented development</li>
        <li><strong>Central Park (former Stapleton)</strong> - 4,700-acre redevelopment with $632 million in construction to date across 119 separate contracts</li>
        <li><strong>Sun Valley</strong> - $450 million neighborhood redevelopment and Riverfront Park Phase I construction through end of 2026</li>
        <li><strong>DIA airport expansion</strong> - $2.1 billion Great Hall overhaul plus $700 million Concourse C-West adding 11 gates (completion 2030&ndash;2031)</li>
        <li><strong>Weld County oil and gas</strong> - field support for drilling and completions across the county that produces 83% of Colorado&rsquo;s oil output</li>
        <li><strong>Ski resort summer construction</strong> - Keystone&rsquo;s $300M+ Kindred Resort, Breckenridge&rsquo;s Peak 9 Gondola, and Vail chairlift replacements during the June&ndash;October build window</li>
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
        a: 'Denver Water declared a Stage 1 drought in March 2026 with mandatory 20% reduction in water use. Flush-type portable restrooms draw city water and add to consumption totals. Our waterless units avoid the issue entirely - no water hookup needed, no surcharges. We can convert an active flush rotation to waterless within 48 hours if restrictions tighten.',
      },
      {
        q: 'Will the units survive a Colorado winter without freezing?',
        a: 'Denver averages 54 inches of snow and roughly 120 freeze-thaw cycles a year. Our winter rotation units use anti-freeze disinfectant in holding tanks, insulated shells, and freeze-resistant hand sanitizer. We service weekly through cold months and swap any unit showing weather damage on the next visit.',
      },
      {
        q: 'Can you deliver to mountain venues near Red Rocks or Evergreen?',
        a: 'Yes. Red Rocks Amphitheatre sits at 6,450 feet on narrow roads through Morrison. Our trailers are rated for the steep grades on CO-8 and CO-74, and we schedule foothills deliveries for morning hours before afternoon thunderstorms - a daily pattern along the Front Range from May through September.',
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
    slug: 'porta-potties-long-beach',
    city: 'Long Beach',
    state: 'California',
    state_code: 'CA',
    address_line: '2601 Clark Ave',
    postal_code: '90815',
    phone: '(562) 664-1370',
    phone_tel: '+15626641370',
    latitude: 33.8037611,
    longitude: -118.1345366,
    gbp_url: 'https://www.google.com/maps?cid=3478057969733098480',
    gbp_cid: '3478057969733098480',
    gbp_place_id: 'ChIJH38eVpcx3YAR8Fso4kuLRDA',
    map_iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4916.878142606616!2d-118.13453659999999!3d33.803761099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd3197561e7f1f%3A0x30448b4bc2285bf0!2sPalace%20Porta%20Potties!5e1!3m2!1sen!2sus!4v1780412241806!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    hours_json: JSON.stringify({
      mon: 'Open 24 hours',
      tue: 'Open 24 hours',
      wed: 'Open 24 hours',
      thu: 'Open 24 hours',
      fri: 'Open 24 hours',
      sat: 'Open 24 hours',
      sun: 'Open 24 hours',
    }),

    meta_title: 'Porta Potties Long Beach: Official Fast Service 2026',
    meta_description:
      'Reserve clean, serviced restroom units across Long Beach and southeast Los Angeles County. Fast dispatch, transparent pricing, event-ready placement, and local support - call (562) 664-1370 today.',
    h1: 'Porta Potties Long Beach',

    intro_html: `<p>A <strong>porta potties Long Beach</strong> order has to work around port traffic, coastal event rules, school and park schedules, and job sites where delivery windows can disappear quickly once Clark Avenue, Willow Street, or the 405 backs up. Palace operates from the live GBP listing at 2601 Clark Ave so our dispatch team can cover Belmont Shore events, El Dorado Park gatherings, airport-adjacent work, and Port of Long Beach projects without treating every site like a generic drop-off.</p>`,

    services_html: `
      <h2>Units Built for Long Beach Sites</h2>
      <hr class="gold-rule" />
      <p>Long Beach jobs range from waterfront festivals to industrial construction near the port. We match the unit type and service schedule to the actual site conditions:</p>
      <ul>
        <li><strong>Construction site units</strong> &mdash; weekly-serviced heads for remodels, infill projects, school work, airport-adjacent sites, and port-support contractors</li>
        <li><strong>Waterfront event units</strong> &mdash; clean, presentation-ready restrooms for Shoreline Aquatic Park, Rainbow Lagoon, Marine Stadium, and Belmont Shore event layouts</li>
        <li><strong>ADA-accessible units</strong> &mdash; wider compliant units with ground-level access and grab bars for permitted public gatherings and accessible guest paths</li>
        <li><strong>Handwash stations</strong> &mdash; paired with food vendors, athletic events, school functions, and outdoor markets where hygiene planning matters</li>
        <li><strong>Restroom trailers</strong> &mdash; upgraded options for weddings, production base camps, VIP areas, and longer coastal events where appearance matters</li>
        <li><strong>Emergency rentals</strong> &mdash; fast dispatch for utility work, facility outages, storm cleanup, and last-minute event corrections across southeast LA County</li>
      </ul>
    `,

    local_context_html: `
      <h2>Long Beach Permits, Port Traffic, and Venue Logistics</h2>
      <hr class="gold-rule" />
      <p>Long Beach event and construction placements often need more planning than the address suggests. Public park events may require coordination with Long Beach Parks, Recreation and Marine. Street events can involve Public Works traffic controls, clear pedestrian paths, and access windows for setup crews. Waterfront venues add wind exposure, salt air, and guest-flow issues that change both placement and service timing.</p>
      <p>Port and industrial work is a different problem. Trucks moving between the Port of Long Beach, the 710, the 405, Lakewood Boulevard, and Willow Street can turn a short delivery into a missed window if the route is not planned. We schedule construction and port-adjacent service around known traffic pressure, gate access, and the need to keep units away from forklift lanes, staging areas, and storm drains.</p>
      <p>For events, Long Beach has recurring demand from waterfront festivals, school athletics, rowing and boating events, beach-adjacent gatherings, and neighborhood markets. The practical choice is rarely just unit count. It is where units sit, how handwash stations pair with food service, whether ADA access is maintained, and whether the service truck can reach the units once guests, fencing, and vendor tents are in place.</p>
      <h3>Area-Specific Considerations</h3>
      <ul>
        <li><strong>Los Altos / Clark Avenue</strong> &mdash; local dispatch zone, residential projects, school events, and quick access to Willow Street and the 405</li>
        <li><strong>Belmont Shore / Naples</strong> &mdash; tighter streets, coastal event timing, and placement that keeps guest paths clear</li>
        <li><strong>Downtown / Shoreline</strong> &mdash; event fencing, parking controls, and delivery windows near Rainbow Lagoon, Shoreline Village, and the convention corridor</li>
        <li><strong>Port of Long Beach</strong> &mdash; industrial access, gate coordination, safety setbacks, and service routes that avoid active equipment lanes</li>
        <li><strong>El Dorado Park / East Long Beach</strong> &mdash; park event layouts, sports fields, and high-traffic weekend schedules</li>
        <li><strong>Signal Hill / Lakewood edge</strong> &mdash; mixed commercial, residential, and contractor support where fast service access matters</li>
      </ul>

      <h2>Palace Long Beach Coverage Area</h2>
      <hr class="gold-rule" />
      <p>Palace dispatches from the live Clark Avenue listing and covers Long Beach plus nearby southeast Los Angeles County cities. Same-day delivery is handled when inventory and route timing allow; larger events and restricted-access construction sites should be scheduled earlier.</p>
      <div class="palace-tables">
        <table>
          <thead>
            <tr><th scope="col">Area</th><th scope="col">Typical delivery window</th><th scope="col">Common use cases</th></tr>
          </thead>
          <tbody>
            <tr><td>Los Altos / Clark Avenue</td><td>Same-day when available</td><td>Residential work, school events, local construction</td></tr>
            <tr><td>Belmont Shore / Naples</td><td>Same-day or next-day</td><td>Coastal events, private gatherings, vendor setups</td></tr>
            <tr><td>Downtown / Shoreline</td><td>Same-day or scheduled</td><td>Festivals, corporate events, waterfront activations</td></tr>
            <tr><td>El Dorado Park / East Long Beach</td><td>Same-day or scheduled</td><td>Sports fields, park permits, family events</td></tr>
            <tr><td>Port / Terminal Island edge</td><td>Scheduled access preferred</td><td>Industrial work, logistics support, contractor rotations</td></tr>
            <tr><td>Signal Hill / Lakewood</td><td>Same-day or next-day</td><td>Commercial jobs, neighborhood events, construction</td></tr>
            <tr><td>Seal Beach / Los Alamitos</td><td>Next-day standard</td><td>Events, contractor support, parks and schools</td></tr>
          </tbody>
        </table>
        <p class="table-note">Emergency deliveries outside standard windows are handled case-by-case &mdash; call the dispatch line for rush availability.</p>
      </div>

      <h2>What Separates Palace from Other Long Beach Portable Toilet Providers</h2>
      <hr class="gold-rule" />
      <h3>What Palace does differently</h3>
      <ul>
        <li><strong>Live Clark Avenue GBP</strong> &mdash; the page, schema, map, phone, and NAP point to the reinstated Long Beach listing instead of a suspended market.</li>
        <li><strong>Port-aware dispatch</strong> &mdash; delivery and service routes account for 710, 405, Willow Street, and port-adjacent traffic windows.</li>
        <li><strong>Event placement planning</strong> &mdash; we plan unit banks around guest paths, food vendors, ADA access, and service-truck reach after fencing goes in.</li>
        <li><strong>Clean-check process</strong> &mdash; every unit is cleaned, stocked, and inspected before delivery, then serviced on the schedule your rental requires.</li>
        <li><strong>Local phone support</strong> &mdash; Long Beach callers reach the active location line, not a generic suspended-market number.</li>
      </ul>
      <h3>Common mistakes Long Beach event planners make</h3>
      <ul>
        <li><strong>Ignoring service access</strong> &mdash; a good setup still fails if fencing, vendor tents, or parked vehicles block the service truck after delivery.</li>
        <li><strong>Undercounting alcohol events</strong> &mdash; add 20% capacity when alcohol is served, especially at longer waterfront events where restroom lines build fast.</li>
        <li><strong>Forgetting handwash stations</strong> &mdash; food vendors, school events, and public gatherings often need handwashing planned with the units, not added later.</li>
        <li><strong>Waiting too long on park layouts</strong> &mdash; park and waterfront sites need placement decisions before final vendor maps and traffic controls are locked.</li>
        <li><strong>Using a non-local phone line</strong> &mdash; fast fixes depend on a provider tied to the active Long Beach listing and dispatch area.</li>
      </ul>
    `,

    faq_json: JSON.stringify([
      {
        q: 'What permits do I need for portable toilets at a Long Beach event?',
        a: 'Permit requirements depend on whether the event is on private property, a city park, a public street, or a waterfront venue. Park events often involve Long Beach Parks, Recreation and Marine, while street or right-of-way placements may involve Public Works traffic controls. We help flag the likely path before delivery is scheduled.',
      },
      {
        q: 'Can you deliver to Belmont Shore, Naples, and waterfront venues?',
        a: 'Yes. We deliver to coastal and waterfront layouts across Long Beach, including Belmont Shore, Naples, Shoreline, Rainbow Lagoon, and Marine Stadium-style event sites. Tight streets and waterfront parking controls make early placement planning important.',
      },
      {
        q: 'Do you support Port of Long Beach and industrial work sites?',
        a: 'Yes. Port-adjacent and industrial rentals are scheduled around access windows, truck routes, and safety setbacks. We place units away from forklift lanes, staging zones, and storm drains, then plan service routes so the units remain reachable during the rental.',
      },
      {
        q: 'How many units does my Long Beach event need?',
        a: 'A four-hour event usually starts at one unit per 50 guests, then increases for longer events, alcohol service, food vendors, and ADA requirements. The table on this page gives a planning baseline, but the final count depends on event length, attendance, and whether guests have access to permanent restrooms.',
      },
      {
        q: 'Can I get same-day delivery in Long Beach?',
        a: 'Same-day delivery is available when inventory and routing allow. Calls from the Long Beach GBP line are matched to the active Clark Avenue service area, so dispatch can quote realistic timing instead of giving a generic window.',
      },
      {
        q: 'Do you provide ADA units and handwash stations?',
        a: 'Yes. ADA-accessible units and handwash stations are available for public events, food service layouts, school functions, construction sites, and private gatherings. We plan them with the unit bank so accessible paths and hygiene stations are not treated as an afterthought.',
      },
    ]),

    guest_count_table_html: buildGuestCountTableHtml('Long Beach'),
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
      'Waterfront event portable toilet rental',
      'Port-adjacent construction portable toilet rental',
    ]),
  },

  {
    slug: 'porta-potties-los-angeles',
    city: 'Los Angeles',
    state: 'California',
    state_code: 'CA',
    address_line: '915 S Duncan Ave',
    postal_code: '90022',
    phone: '(424) 557-9030',
    phone_tel: '+14245579030',
    latitude: 34.0229,
    longitude: -118.1663,
    gbp_url: 'https://www.google.com/maps?q=915%20S%20Duncan%20Ave%2C%20Los%20Angeles%2C%20CA%2090022',
    gbp_cid: '',
    gbp_place_id: '',
    map_iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.3705865338216!2d-118.17016039999999!3d34.022980200000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2cfe0464bbbfb%3A0xb92c343f102d6e56!2sPalace%20Porta%20Potties!5e1!3m2!1sen!2sus!4v1780497065167!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    hours_json: JSON.stringify({
      mon: 'Open 24 hours',
      tue: 'Open 24 hours',
      wed: 'Open 24 hours',
      thu: 'Open 24 hours',
      fri: 'Open 24 hours',
      sat: 'Open 24 hours',
      sun: 'Open 24 hours',
    }),

    meta_title: 'Porta Potties Los Angeles: Official Fast Service 2026',
    meta_description:
      'Reserve clean, serviced restroom units across Los Angeles and East LA. Fast dispatch, transparent pricing, event-ready placement, and local support - call (424) 557-9030 today.',
    h1: 'Porta Potties Los Angeles',

    intro_html: `<p>A <strong>porta potties Los Angeles</strong> order near East LA has to account for dense streets, contractor access, event staging, and traffic shifts across the 5, 10, 60, and 710 corridors. Palace is staging the Duncan Avenue location at 915 S Duncan Ave for the renamed GBP so the page, menu, schema, phone line, and future map listing can align before the final CID is dropped in.</p>`,

    services_html: `
      <h2>Units Built for Los Angeles Sites</h2>
      <hr class="gold-rule" />
      <p>Los Angeles jobs change block by block, so unit choice and placement matter as much as delivery speed:</p>
      <ul>
        <li><strong>Construction site units</strong> &mdash; weekly-serviced restrooms for remodels, infill jobs, commercial work, and contractor staging areas</li>
        <li><strong>Event units</strong> &mdash; clean units for outdoor markets, community events, school functions, and private gatherings</li>
        <li><strong>ADA-accessible units</strong> &mdash; wider compliant restrooms for public events and accessible guest routes</li>
        <li><strong>Handwash stations</strong> &mdash; paired with food vendors, job sites, and public gatherings where hygiene planning matters</li>
        <li><strong>Restroom trailers</strong> &mdash; upgraded options for productions, VIP areas, weddings, and longer event schedules</li>
        <li><strong>Emergency rentals</strong> &mdash; fast support for outages, utility work, and last-minute site corrections</li>
      </ul>
    `,

    local_context_html: `
      <h2>Los Angeles Access, Traffic, and Event Logistics</h2>
      <hr class="gold-rule" />
      <p>Los Angeles portable restroom planning starts with access. A site near East LA can be easy at 9 AM and blocked by deliveries, parked vehicles, or freeway spillover by noon. We plan unit placement around service-truck reach, vendor layouts, pedestrian paths, and the traffic corridors that affect pickup and cleaning routes.</p>
      <p>Construction rentals need clear setbacks from work zones, dumpsters, material staging, and storm drains. Event rentals need a different plan: units should sit close enough for guests to find them, far enough from food and seating, and positioned so ADA paths stay open after fencing and tents are installed.</p>
      <p>The Duncan Avenue page is intentionally built as a GBP-aligned location page. Once the business name is updated to Palace Porta Potties in Google Business Profile, the final GBP iframe, CID, and local phone can replace the placeholders without changing the flat URL.</p>
      <h3>Area-Specific Considerations</h3>
      <ul>
        <li><strong>East Los Angeles</strong> &mdash; dense residential and commercial sites where curb access and timing matter</li>
        <li><strong>Boyle Heights</strong> &mdash; community events, school functions, and narrow site access around busy corridors</li>
        <li><strong>Commerce / Vernon edge</strong> &mdash; industrial support, warehouse work, and contractor rotations</li>
        <li><strong>Downtown Los Angeles</strong> &mdash; tighter delivery windows, event staging, and production support</li>
        <li><strong>Monterey Park / Montebello</strong> &mdash; neighborhood events, commercial projects, and school-adjacent work</li>
      </ul>

      <h2>Palace Los Angeles Coverage Area</h2>
      <hr class="gold-rule" />
      <p>Palace will use the Duncan Avenue location page for Los Angeles-area dispatch once the GBP name and map details are finalized. The page is already structured for a multi-location setup, with flat URL linking and LocalBusiness schema ready for the finished listing data.</p>
      <div class="palace-tables">
        <table>
          <thead>
            <tr><th scope="col">Area</th><th scope="col">Typical delivery window</th><th scope="col">Common use cases</th></tr>
          </thead>
          <tbody>
            <tr><td>East Los Angeles</td><td>Same-day when available</td><td>Residential work, community events, commercial projects</td></tr>
            <tr><td>Boyle Heights</td><td>Same-day or scheduled</td><td>Events, school functions, job sites</td></tr>
            <tr><td>Commerce / Vernon edge</td><td>Scheduled access preferred</td><td>Industrial work, warehouses, contractor rotations</td></tr>
            <tr><td>Downtown Los Angeles</td><td>Scheduled access preferred</td><td>Productions, corporate events, urban construction</td></tr>
            <tr><td>Monterey Park / Montebello</td><td>Same-day or next-day</td><td>Neighborhood events, commercial jobs, schools</td></tr>
          </tbody>
        </table>
        <p class="table-note">Emergency deliveries outside standard windows are handled case-by-case &mdash; call the dispatch line for rush availability.</p>
      </div>

      <h2>What Separates Palace from Other Los Angeles Portable Toilet Providers</h2>
      <hr class="gold-rule" />
      <h3>What Palace does differently</h3>
      <ul>
        <li><strong>GBP-aligned page structure</strong> &mdash; the flat URL, NAP block, map, and schema are ready to match the renamed Los Angeles listing.</li>
        <li><strong>Traffic-aware scheduling</strong> &mdash; routes account for freeway pressure, curb access, and service windows.</li>
        <li><strong>Placement planning</strong> &mdash; units are positioned around guest flow, jobsite safety, ADA access, and service reach.</li>
        <li><strong>Clean-check process</strong> &mdash; units are cleaned, stocked, and inspected before delivery.</li>
        <li><strong>Multi-location menu support</strong> &mdash; Los Angeles sits under the California service-area group beside Long Beach.</li>
      </ul>
      <h3>Common mistakes Los Angeles planners make</h3>
      <ul>
        <li><strong>Forgetting curb access</strong> &mdash; a unit cannot be serviced if cars, bins, or materials block the truck path.</li>
        <li><strong>Waiting on event layouts</strong> &mdash; restroom placement should be decided before vendor maps and barricades are final.</li>
        <li><strong>Undercounting longer events</strong> &mdash; guest count, alcohol, food service, and event length all change unit needs.</li>
        <li><strong>Skipping handwash stations</strong> &mdash; hygiene stations should be planned with the unit count, not added as an emergency fix.</li>
        <li><strong>Changing GBP data after launch</strong> &mdash; final phone, map, and business name should be locked before pushing the listing live.</li>
      </ul>
    `,

    faq_json: JSON.stringify([
      {
        q: 'Is the Los Angeles GBP live under Palace Porta Potties yet?',
        a: 'This page is staged for the Los Angeles GBP at 915 S Duncan Ave with the local phone line in place. The business name is expected to be updated to Palace Porta Potties; once the final GBP CID and iframe are available, the map placeholders should be replaced.',
      },
      {
        q: 'Can you deliver to East Los Angeles and nearby cities?',
        a: 'Yes. The Los Angeles page is built around East LA access and nearby service areas including Boyle Heights, Commerce, Vernon-edge industrial sites, Monterey Park, and Montebello.',
      },
      {
        q: 'How many portable toilets does a Los Angeles event need?',
        a: 'Start with one unit per 50 guests for a four-hour event, then increase for alcohol, food service, longer schedules, and ADA requirements. The planning table on this page gives a baseline.',
      },
      {
        q: 'Do you offer handwash stations and ADA units?',
        a: 'Yes. Handwash stations and ADA-accessible units are available for events, food vendor layouts, public gatherings, and job sites.',
      },
      {
        q: 'Can this page be updated after the GBP details are final?',
        a: 'Yes. The safest update is replacing placeholder phone, CID, and iframe data while keeping the flat URL and title/H1 stable.',
      },
    ]),

    guest_count_table_html: buildGuestCountTableHtml('Los Angeles'),
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
      'East Los Angeles event portable toilet rental',
    ]),
  },

  {
    slug: 'porta-potties-north-miami',
    city: 'North Miami',
    state: 'Florida',
    state_code: 'FL',
    address_line: '14781 Biscayne Blvd',
    postal_code: '33181',
    phone: '(786) 404-9130',
    phone_tel: '+17864049130',
    latitude: 25.9110632,
    longitude: -80.1571997,
    gbp_url: 'https://www.google.com/maps?q=14781%20Biscayne%20Blvd%2C%20North%20Miami%2C%20FL%2033181',
    gbp_cid: '',
    gbp_place_id: '',
    map_iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167353.3353703851!2d-80.43263683021684!3d25.778960657431067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9ad6f7f7de2fd%3A0x939de209fb2b8703!2sPalace%20Porta%20Potties!5e0!3m2!1sen!2sus!4v1780496165576!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    hours_json: JSON.stringify({
      mon: 'Open 24 hours',
      tue: 'Open 24 hours',
      wed: 'Open 24 hours',
      thu: 'Open 24 hours',
      fri: 'Open 24 hours',
      sat: 'Open 24 hours',
      sun: 'Open 24 hours',
    }),

    meta_title: 'Porta Potties North Miami: Official Fast Service 2026',
    meta_description:
      'Reserve clean, serviced restroom units across North Miami and northeast Miami-Dade. Fast dispatch, transparent pricing, event-ready placement, and local support - call (786) 404-9130 today.',
    h1: 'Porta Potties North Miami',

    intro_html: `<p>A <strong>porta potties North Miami</strong> order near Biscayne Boulevard has to account for dense commercial traffic, coastal weather, event access, and contractor staging across northeast Miami-Dade. Palace is staging the 14781 Biscayne Blvd location page now so the menu, schema, phone line, and flat URL are ready before the final GBP CID and iframe are added.</p>`,

    services_html: `
      <h2>Units Built for North Miami Sites</h2>
      <hr class="gold-rule" />
      <p>North Miami projects need clean units that can handle humidity, traffic windows, and mixed commercial and residential access:</p>
      <ul>
        <li><strong>Construction site units</strong> &mdash; weekly-serviced restrooms for remodels, commercial work, road projects, and contractor staging areas</li>
        <li><strong>Event units</strong> &mdash; clean units for waterfront gatherings, community events, schools, markets, and private parties</li>
        <li><strong>ADA-accessible units</strong> &mdash; wider compliant restrooms for public events and accessible guest routes</li>
        <li><strong>Handwash stations</strong> &mdash; paired with food vendors, job sites, and public layouts where hygiene planning matters</li>
        <li><strong>Restroom trailers</strong> &mdash; upgraded options for weddings, VIP areas, productions, and longer event schedules</li>
        <li><strong>Emergency rentals</strong> &mdash; fast support for outages, utility work, storm response, and last-minute site corrections</li>
      </ul>
    `,

    local_context_html: `
      <h2>North Miami Access, Weather, and Event Logistics</h2>
      <hr class="gold-rule" />
      <p>North Miami portable restroom planning starts with access. Biscayne Boulevard traffic, nearby retail centers, marina routes, and residential streets can all affect delivery timing. We plan unit placement around service-truck reach, guest flow, vendor layouts, jobsite safety, and routes that stay workable after tents, fencing, or materials are installed.</p>
      <p>Construction rentals need clear setbacks from work zones, dumpsters, material staging, and storm drains. Event rentals need a different plan: units should be easy for guests to find, far enough from food and seating, and positioned so ADA paths stay usable after the event buildout is complete.</p>
      <p>The Biscayne Boulevard page is intentionally built as a GBP-aligned location page. Once the North Miami listing details are final, the real GBP iframe and CID can replace the map placeholders without changing the flat URL.</p>
      <h3>Area-Specific Considerations</h3>
      <ul>
        <li><strong>Biscayne Boulevard corridor</strong> &mdash; commercial sites where delivery timing and curb access matter</li>
        <li><strong>North Miami Beach edge</strong> &mdash; event, retail, and residential support near busy coastal routes</li>
        <li><strong>Aventura / Sunny Isles access</strong> &mdash; guest-facing events, private gatherings, and venue-adjacent staging</li>
        <li><strong>Miami Shores / Biscayne Park</strong> &mdash; neighborhood events, remodels, and school-adjacent work</li>
        <li><strong>Northeast Miami-Dade jobsites</strong> &mdash; contractor rotations, utility work, and longer-term rentals</li>
      </ul>

      <h2>Palace North Miami Coverage Area</h2>
      <hr class="gold-rule" />
      <p>Palace will use the Biscayne Boulevard location page for North Miami-area dispatch once the GBP map details are finalized. The page is already structured for the multi-location setup, with root-level linking and LocalBusiness schema ready for the finished listing data.</p>
      <div class="palace-tables">
        <table>
          <thead>
            <tr><th scope="col">Area</th><th scope="col">Typical delivery window</th><th scope="col">Common use cases</th></tr>
          </thead>
          <tbody>
            <tr><td>North Miami</td><td>Same-day when available</td><td>Commercial sites, residential work, community events</td></tr>
            <tr><td>Biscayne Boulevard corridor</td><td>Scheduled access preferred</td><td>Retail centers, job sites, event staging</td></tr>
            <tr><td>North Miami Beach edge</td><td>Same-day or scheduled</td><td>Private events, construction, schools</td></tr>
            <tr><td>Aventura / Sunny Isles access</td><td>Scheduled access preferred</td><td>Weddings, VIP events, waterfront gatherings</td></tr>
            <tr><td>Miami Shores / Biscayne Park</td><td>Same-day or next-day</td><td>Neighborhood events, remodels, municipal support</td></tr>
          </tbody>
        </table>
        <p class="table-note">Emergency deliveries outside standard windows are handled case-by-case &mdash; call the dispatch line for rush availability.</p>
      </div>

      <h2>What Separates Palace from Other North Miami Portable Toilet Providers</h2>
      <hr class="gold-rule" />
      <h3>What Palace does differently</h3>
      <ul>
        <li><strong>GBP-aligned page structure</strong> &mdash; the flat URL, NAP block, map, and schema are ready to match the North Miami listing.</li>
        <li><strong>Weather-aware planning</strong> &mdash; routes and placements account for humidity, rain, heat, and storm-response needs.</li>
        <li><strong>Placement planning</strong> &mdash; units are positioned around guest flow, jobsite safety, ADA access, and service reach.</li>
        <li><strong>Clean-check process</strong> &mdash; units are cleaned, stocked, and inspected before delivery.</li>
        <li><strong>Multi-location menu support</strong> &mdash; North Miami sits under the Florida service-area group in the site menu.</li>
      </ul>
      <h3>Common mistakes North Miami planners make</h3>
      <ul>
        <li><strong>Forgetting service-truck reach</strong> &mdash; units need enough access for cleaning, restocking, and pickup.</li>
        <li><strong>Ignoring afternoon weather</strong> &mdash; rain and heat change guest flow, placement, and servicing needs.</li>
        <li><strong>Undercounting longer events</strong> &mdash; guest count, alcohol, food service, and event length all change unit needs.</li>
        <li><strong>Skipping handwash stations</strong> &mdash; hygiene stations should be planned with the unit count, not added as an emergency fix.</li>
        <li><strong>Launching before GBP data is final</strong> &mdash; final phone, map, and business name should be locked before pushing the listing live.</li>
      </ul>
    `,

    faq_json: JSON.stringify([
      {
        q: 'Is the North Miami GBP live under Palace Porta Potties yet?',
        a: 'This page is staged for the North Miami GBP at 14781 Biscayne Blvd with the Miami-area phone line in place. Once the final GBP CID and iframe are available, the map placeholders should be replaced.',
      },
      {
        q: 'Can you deliver to North Miami Beach, Aventura, and nearby areas?',
        a: 'Yes. The North Miami page is built around Biscayne Boulevard and northeast Miami-Dade access, including North Miami Beach-edge sites, Aventura access, Sunny Isles access, Miami Shores, and Biscayne Park.',
      },
      {
        q: 'How many portable toilets does a North Miami event need?',
        a: 'Start with one unit per 50 guests for a four-hour event, then increase for alcohol, food service, longer schedules, and ADA requirements. The planning table on this page gives a baseline.',
      },
      {
        q: 'Do you offer handwash stations and ADA units?',
        a: 'Yes. Handwash stations and ADA-accessible units are available for events, food vendor layouts, public gatherings, and job sites.',
      },
      {
        q: 'Can this page be updated after the GBP details are final?',
        a: 'Yes. The safest update is replacing placeholder phone, CID, and iframe data while keeping the flat URL and title/H1 stable.',
      },
    ]),

    guest_count_table_html: buildGuestCountTableHtml('North Miami'),
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
      'Waterfront event portable toilet rental',
      'North Miami event portable toilet rental',
    ]),
  },

  {
    slug: 'porta-potties-plano',
    city: 'Plano',
    state: 'Texas',
    state_code: 'TX',
    address_line: '3237 Independence Pkwy',
    postal_code: '75075',
    phone: '(888) 708-5771',
    phone_tel: '+18887085771',
    latitude: 33.0397903,
    longitude: -96.7534965,
    gbp_url: 'https://www.google.com/maps?q=3237%20Independence%20Pkwy%2C%20Plano%2C%20TX%2075075',
    gbp_cid: '',
    gbp_place_id: '',
    map_iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.636165615114!2d-96.7549404!3d33.039714700000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c23f28160f2f3%3A0x10ee3556835d7018!2sPalace%20Porta%20Potties!5e0!3m2!1sen!2sus!4v1780496250118!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    hours_json: JSON.stringify({
      mon: 'Open 24 hours',
      tue: 'Open 24 hours',
      wed: 'Open 24 hours',
      thu: 'Open 24 hours',
      fri: 'Open 24 hours',
      sat: 'Open 24 hours',
      sun: 'Open 24 hours',
    }),

    meta_title: 'Porta Potties Plano: Official Fast Service 2026',
    meta_description:
      'Reserve clean, serviced restroom units across Plano and Collin County. Fast dispatch, transparent pricing, event-ready placement, and local support - call (888) 708-5771 today.',
    h1: 'Porta Potties Plano',

    intro_html: `<p>A <strong>porta potties Plano</strong> order near Independence Parkway has to account for suburban jobsite access, school events, retail corridors, and North Dallas traffic patterns. Palace is staging the 3237 Independence Pkwy location page now so the menu, schema, and flat URL are ready before the final GBP phone, CID, and iframe are added.</p>`,

    services_html: `
      <h2>Units Built for Plano Sites</h2>
      <hr class="gold-rule" />
      <p>Plano rentals need clean units that work for commercial jobs, neighborhood events, schools, parks, and longer contractor schedules:</p>
      <ul>
        <li><strong>Construction site units</strong> &mdash; weekly-serviced restrooms for remodels, commercial builds, utility work, and contractor staging areas</li>
        <li><strong>Event units</strong> &mdash; clean units for school functions, outdoor markets, parks, races, church events, and private gatherings</li>
        <li><strong>ADA-accessible units</strong> &mdash; wider compliant restrooms for public events and accessible guest routes</li>
        <li><strong>Handwash stations</strong> &mdash; paired with food vendors, job sites, and public layouts where hygiene planning matters</li>
        <li><strong>Restroom trailers</strong> &mdash; upgraded options for weddings, VIP areas, corporate events, and longer event schedules</li>
        <li><strong>Emergency rentals</strong> &mdash; fast support for outages, utility work, and last-minute site corrections</li>
      </ul>
    `,

    local_context_html: `
      <h2>Plano Access, Traffic, and Event Logistics</h2>
      <hr class="gold-rule" />
      <p>Plano portable restroom planning starts with access. Independence Parkway, Parker Road, Spring Creek Parkway, US-75, and Dallas North Tollway traffic can all affect delivery timing. We plan unit placement around service-truck reach, guest flow, vendor layouts, jobsite safety, and routes that stay workable after fencing, tents, or materials are installed.</p>
      <p>Construction rentals need clear setbacks from work zones, dumpsters, material staging, and storm drains. Event rentals need a different plan: units should be easy for guests to find, far enough from food and seating, and positioned so ADA paths stay usable after the event buildout is complete.</p>
      <p>The Independence Parkway page is intentionally built as a GBP-aligned location page. Once the Plano listing details are final, the real GBP iframe, CID, and local phone can replace the placeholders without changing the flat URL.</p>
      <h3>Area-Specific Considerations</h3>
      <ul>
        <li><strong>Central Plano</strong> &mdash; neighborhood events, remodels, schools, and commercial support</li>
        <li><strong>Independence Parkway corridor</strong> &mdash; retail, residential, and contractor access where placement matters</li>
        <li><strong>West Plano</strong> &mdash; corporate events, private gatherings, and higher-end restroom trailer needs</li>
        <li><strong>Richardson / North Dallas edge</strong> &mdash; contractor rotations, utility work, and mixed commercial jobs</li>
        <li><strong>Allen / Frisco access</strong> &mdash; growth-area construction, schools, parks, and event support</li>
      </ul>

      <h2>Palace Plano Coverage Area</h2>
      <hr class="gold-rule" />
      <p>Palace will use the Independence Parkway location page for Plano-area dispatch once the GBP phone and map details are finalized. The page is already structured for the multi-location setup, with root-level linking and LocalBusiness schema ready for the finished listing data.</p>
      <div class="palace-tables">
        <table>
          <thead>
            <tr><th scope="col">Area</th><th scope="col">Typical delivery window</th><th scope="col">Common use cases</th></tr>
          </thead>
          <tbody>
            <tr><td>Central Plano</td><td>Same-day when available</td><td>Residential work, school events, commercial projects</td></tr>
            <tr><td>Independence Parkway corridor</td><td>Same-day or scheduled</td><td>Retail sites, job sites, neighborhood events</td></tr>
            <tr><td>West Plano</td><td>Scheduled access preferred</td><td>Corporate events, weddings, restroom trailers</td></tr>
            <tr><td>Richardson / North Dallas edge</td><td>Scheduled access preferred</td><td>Commercial work, utility jobs, contractor rotations</td></tr>
            <tr><td>Allen / Frisco access</td><td>Same-day or next-day</td><td>Construction, parks, schools, private events</td></tr>
          </tbody>
        </table>
        <p class="table-note">Emergency deliveries outside standard windows are handled case-by-case &mdash; call the dispatch line for rush availability.</p>
      </div>

      <h2>What Separates Palace from Other Plano Portable Toilet Providers</h2>
      <hr class="gold-rule" />
      <h3>What Palace does differently</h3>
      <ul>
        <li><strong>GBP-aligned page structure</strong> &mdash; the flat URL, NAP block, map, and schema are ready to match the Plano listing.</li>
        <li><strong>Traffic-aware scheduling</strong> &mdash; routes account for US-75, Dallas North Tollway, Parker Road, and local access windows.</li>
        <li><strong>Placement planning</strong> &mdash; units are positioned around guest flow, jobsite safety, ADA access, and service reach.</li>
        <li><strong>Clean-check process</strong> &mdash; units are cleaned, stocked, and inspected before delivery.</li>
        <li><strong>Multi-location menu support</strong> &mdash; Plano sits under the Texas service-area group in the site menu.</li>
      </ul>
      <h3>Common mistakes Plano planners make</h3>
      <ul>
        <li><strong>Forgetting service-truck reach</strong> &mdash; units need enough access for cleaning, restocking, and pickup.</li>
        <li><strong>Waiting on event layouts</strong> &mdash; restroom placement should be decided before vendor maps and barricades are final.</li>
        <li><strong>Undercounting longer events</strong> &mdash; guest count, alcohol, food service, and event length all change unit needs.</li>
        <li><strong>Skipping handwash stations</strong> &mdash; hygiene stations should be planned with the unit count, not added as an emergency fix.</li>
        <li><strong>Launching before GBP data is final</strong> &mdash; final phone, map, and business name should be locked before pushing the listing live.</li>
      </ul>
    `,

    faq_json: JSON.stringify([
      {
        q: 'Is the Plano GBP live under Palace Porta Potties yet?',
        a: 'This page is staged for the Plano GBP at 3237 Independence Pkwy. Once the final GBP phone, CID, and iframe are available, the placeholders should be replaced.',
      },
      {
        q: 'Can you deliver to Richardson, Allen, Frisco, and nearby areas?',
        a: 'Yes. The Plano page is built around Independence Parkway and Collin County access, including Richardson-edge sites, Allen, Frisco access, West Plano, and North Dallas-edge work.',
      },
      {
        q: 'How many portable toilets does a Plano event need?',
        a: 'Start with one unit per 50 guests for a four-hour event, then increase for alcohol, food service, longer schedules, and ADA requirements. The planning table on this page gives a baseline.',
      },
      {
        q: 'Do you offer handwash stations and ADA units?',
        a: 'Yes. Handwash stations and ADA-accessible units are available for events, food vendor layouts, public gatherings, and job sites.',
      },
      {
        q: 'Can this page be updated after the GBP details are final?',
        a: 'Yes. The safest update is replacing placeholder phone, CID, and iframe data while keeping the flat URL and title/H1 stable.',
      },
    ]),

    guest_count_table_html: buildGuestCountTableHtml('Plano'),
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
      'Plano event portable toilet rental',
      'Collin County portable toilet rental',
    ]),
  },

  {
    slug: 'porta-potties-doral',
    city: 'Doral',
    state: 'Florida',
    state_code: 'FL',
    address_line: '2416 NW 87th Ave',
    postal_code: '33172',
    phone: '(786) 404-9130',
    phone_tel: '+17864049130',
    latitude: 25.7962326,
    longitude: -80.3370707,
    gbp_url: 'https://www.google.com/maps?q=2416%20NW%2087th%20Ave%2C%20Doral%2C%20FL%2033172',
    gbp_cid: '',
    gbp_place_id: '',
    map_iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.2476949437746!2d-80.3382938!3d25.7954012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b98a1116a22d%3A0xbe752ee1f73d2b0d!2sPalace%20Porta%20Potties!5e0!3m2!1sen!2sus!4v1780496327385!5m2!1sen!2sus" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    hours_json: JSON.stringify({
      mon: 'Open 24 hours',
      tue: 'Open 24 hours',
      wed: 'Open 24 hours',
      thu: 'Open 24 hours',
      fri: 'Open 24 hours',
      sat: 'Open 24 hours',
      sun: 'Open 24 hours',
    }),

    meta_title: 'Porta Potties Doral: Official Fast Service 2026',
    meta_description:
      'Reserve clean, serviced restroom units across Doral and west Miami-Dade. Fast dispatch, transparent pricing, event-ready placement, and local support - call (786) 404-9130 today.',
    h1: 'Porta Potties Doral',

    intro_html: `<p>A <strong>porta potties Doral</strong> order near NW 87th Avenue has to account for warehouse access, airport-area traffic, commercial construction, and west Miami-Dade event logistics. Palace is staging the 2416 NW 87th Ave location page now so the menu, schema, phone line, and flat URL are ready before the final GBP CID and iframe are added.</p>`,

    services_html: `
      <h2>Units Built for Doral Sites</h2>
      <hr class="gold-rule" />
      <p>Doral rentals need clean units that can handle industrial sites, warehouse work, office parks, schools, and outdoor events:</p>
      <ul>
        <li><strong>Construction site units</strong> &mdash; weekly-serviced restrooms for commercial builds, tenant improvements, utility work, and contractor staging areas</li>
        <li><strong>Event units</strong> &mdash; clean units for parks, community events, school functions, corporate gatherings, and private parties</li>
        <li><strong>ADA-accessible units</strong> &mdash; wider compliant restrooms for public events and accessible guest routes</li>
        <li><strong>Handwash stations</strong> &mdash; paired with food vendors, job sites, and public layouts where hygiene planning matters</li>
        <li><strong>Restroom trailers</strong> &mdash; upgraded options for corporate events, weddings, VIP areas, and longer event schedules</li>
        <li><strong>Emergency rentals</strong> &mdash; fast support for outages, utility work, storm response, and last-minute site corrections</li>
      </ul>
    `,

    local_context_html: `
      <h2>Doral Access, Traffic, and Event Logistics</h2>
      <hr class="gold-rule" />
      <p>Doral portable restroom planning starts with access. NW 87th Avenue, NW 36th Street, the Palmetto, Dolphin Expressway, and airport-adjacent traffic can all affect delivery timing. We plan unit placement around service-truck reach, vendor layouts, jobsite safety, guest flow, and routes that stay workable after fencing, tents, or materials are installed.</p>
      <p>Construction rentals need clear setbacks from work zones, dumpsters, material staging, and storm drains. Event rentals need a different plan: units should be easy for guests to find, far enough from food and seating, and positioned so ADA paths stay usable after the event buildout is complete.</p>
      <p>The NW 87th Avenue page is intentionally built as a GBP-aligned location page. Once the Doral listing details are final, the real GBP iframe and CID can replace the map placeholders without changing the flat URL.</p>
      <h3>Area-Specific Considerations</h3>
      <ul>
        <li><strong>Doral warehouse corridor</strong> &mdash; industrial support, logistics yards, and contractor rotations</li>
        <li><strong>Airport-area access</strong> &mdash; commercial jobs and tight service windows near MIA traffic routes</li>
        <li><strong>Downtown Doral</strong> &mdash; corporate events, community gatherings, and office-park support</li>
        <li><strong>Sweetwater / Fontainebleau edge</strong> &mdash; school events, residential work, and mixed commercial sites</li>
        <li><strong>Medley / Hialeah access</strong> &mdash; industrial jobs, utility work, and longer-term rentals</li>
      </ul>

      <h2>Palace Doral Coverage Area</h2>
      <hr class="gold-rule" />
      <p>Palace will use the NW 87th Avenue location page for Doral-area dispatch once the GBP map details are finalized. The page is already structured for the multi-location setup, with root-level linking and LocalBusiness schema ready for the finished listing data.</p>
      <div class="palace-tables">
        <table>
          <thead>
            <tr><th scope="col">Area</th><th scope="col">Typical delivery window</th><th scope="col">Common use cases</th></tr>
          </thead>
          <tbody>
            <tr><td>Doral</td><td>Same-day when available</td><td>Commercial sites, events, contractor rentals</td></tr>
            <tr><td>NW 87th Avenue corridor</td><td>Scheduled access preferred</td><td>Warehouse work, job sites, logistics yards</td></tr>
            <tr><td>Downtown Doral</td><td>Same-day or scheduled</td><td>Corporate events, parks, office support</td></tr>
            <tr><td>Sweetwater / Fontainebleau edge</td><td>Same-day or next-day</td><td>School events, remodels, commercial work</td></tr>
            <tr><td>Medley / Hialeah access</td><td>Scheduled access preferred</td><td>Industrial jobs, utility work, long-term rentals</td></tr>
          </tbody>
        </table>
        <p class="table-note">Emergency deliveries outside standard windows are handled case-by-case &mdash; call the dispatch line for rush availability.</p>
      </div>

      <h2>What Separates Palace from Other Doral Portable Toilet Providers</h2>
      <hr class="gold-rule" />
      <h3>What Palace does differently</h3>
      <ul>
        <li><strong>GBP-aligned page structure</strong> &mdash; the flat URL, NAP block, map, and schema are ready to match the Doral listing.</li>
        <li><strong>Traffic-aware scheduling</strong> &mdash; routes account for airport-area traffic, warehouse access, and west Miami-Dade service windows.</li>
        <li><strong>Placement planning</strong> &mdash; units are positioned around guest flow, jobsite safety, ADA access, and service reach.</li>
        <li><strong>Clean-check process</strong> &mdash; units are cleaned, stocked, and inspected before delivery.</li>
        <li><strong>Multi-location menu support</strong> &mdash; Doral sits under the Florida service-area group beside North Miami.</li>
      </ul>
      <h3>Common mistakes Doral planners make</h3>
      <ul>
        <li><strong>Forgetting service-truck reach</strong> &mdash; units need enough access for cleaning, restocking, and pickup.</li>
        <li><strong>Ignoring freight and warehouse traffic</strong> &mdash; loading zones and truck lanes can block restroom service if placement is rushed.</li>
        <li><strong>Undercounting longer events</strong> &mdash; guest count, alcohol, food service, and event length all change unit needs.</li>
        <li><strong>Skipping handwash stations</strong> &mdash; hygiene stations should be planned with the unit count, not added as an emergency fix.</li>
        <li><strong>Launching before GBP data is final</strong> &mdash; final phone, map, and business name should be locked before pushing the listing live.</li>
      </ul>
    `,

    faq_json: JSON.stringify([
      {
        q: 'Is the Doral GBP live under Palace Porta Potties yet?',
        a: 'This page is staged for the Doral GBP at 2416 NW 87th Ave with the Miami-area phone line in place. Once the final GBP CID and iframe are available, the map placeholders should be replaced.',
      },
      {
        q: 'Can you deliver to Sweetwater, Medley, Hialeah, and nearby areas?',
        a: 'Yes. The Doral page is built around NW 87th Avenue and west Miami-Dade access, including Sweetwater, Fontainebleau-edge sites, Medley, Hialeah access, and airport-area work.',
      },
      {
        q: 'How many portable toilets does a Doral event need?',
        a: 'Start with one unit per 50 guests for a four-hour event, then increase for alcohol, food service, longer schedules, and ADA requirements. The planning table on this page gives a baseline.',
      },
      {
        q: 'Do you offer handwash stations and ADA units?',
        a: 'Yes. Handwash stations and ADA-accessible units are available for events, food vendor layouts, public gatherings, and job sites.',
      },
      {
        q: 'Can this page be updated after the GBP details are final?',
        a: 'Yes. The safest update is replacing placeholder phone, CID, and iframe data while keeping the flat URL and title/H1 stable.',
      },
    ]),

    guest_count_table_html: buildGuestCountTableHtml('Doral'),
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
      'Doral event portable toilet rental',
      'West Miami-Dade portable toilet rental',
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
  console.log(`OK Seeded ${locations.length} locations.`);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
