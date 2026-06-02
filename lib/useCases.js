// Use-case definitions for the Solutions menu + the use-case hub and
// use-case x city combo pages. Use-cases are NOT GBP locations, so they live
// here in code (one source of truth) rather than in the Turso locations table.
//
// Slug scheme (all flat, no subfolders):
//   hub   = useCase.hubSlug                       e.g. construction-porta-potty-rental
//   combo = `${useCase.comboPrefix}-${citySlug}`  e.g. construction-porta-potties-chicago
// City slugs use "porta-potties" (plural); hub slugs use "porta-potty" (singular),
// so a hub slug never parses as a combo. Parsing strips the prefix and checks the
// remainder against the real city slugs from the DB.
//
// Voice note: content is written first-person and opinionated on purpose (Ultra-Human
// brief) and threads the city name for local relevance. The genuinely city-unique
// block on every combo page is the DB-driven local_context_html, which the combo
// template reuses verbatim from the existing city row.

export const USE_CASES = [
  {
    key: 'construction',
    navLabel: 'Construction',
    column: 'Industries',
    comboPrefix: 'construction',
    hubSlug: 'construction-porta-potty-rental',
    hubEmq: 'construction porta potty rental',
    hubH1: 'Construction Porta Potty Rental',
    hubTitle: 'Construction Porta Potty Rental: Official Job Site Units 2026',
    hubMeta:
      'Keep your crew working with weekly-serviced job-site restrooms, winterized units, and 28-day billing. Reserve dependable site sanitation nationwide and call (888) 708-5771 for a same-week delivery window.',
    comboEmq: (city) => `construction porta potties ${city}`,
    comboH1: (city) => `Construction Porta Potties ${city}`,
    comboTitle: (city) => `Construction Porta Potties ${city}: Official Job Site 2026`,
    comboMeta: (city, phone) =>
      `Equip your ${city} job site with weekly-serviced crew restrooms, winterized tanks, and predictable 28-day billing. Book site sanitation that shows up on schedule and call ${phone} for a delivery window today.`,
    intro: (city) =>
      `<p>If you have ever lost an hour of crew time because the <strong>construction porta potties ${city}</strong> rental never got serviced, you already know why I am picky about this. A job-site unit is not event decor. It takes a beating, it sits there for months, and the only thing that matters is whether it is clean and stocked when your guys need it at 6:45am. We built our ${city} construction program around that single test.</p>`,
    decisionFit: (city) =>
      `<h2>Which Construction Unit Actually Fits Your ${city} Site?</h2>
       <hr class="gold-rule" />
       <p>Here is how I size it, and it is honestly not complicated. If you are running a standard ground-level build with a crew under 10, choose the standard unit on a 28-day cycle &mdash; it is the cheapest path that still gets weekly service, and most of our ${city} sites never need more. If your crew is 10 to 25 or you are pouring through the cold months, choose the standard-plus-sink unit and add winterization; the trade-off is roughly +$45 a cycle against the very real cost of a frozen tank in January. And if you are stacking floors on a high-rise, the narrow-profile unit is the only one that fits a freight elevator without a fight. Pick on access and headcount first, price second. Get that order backward and you will pay for it in downtime.</p>`,
    bindings: (city) =>
      `<h2>Why These Specs Matter on a ${city} Job</h2>
       <hr class="gold-rule" />
       <ul>
         <li><strong>Weekly service, included.</strong> It matters because an unserviced unit becomes an OSHA problem and a morale problem in about ten days &mdash; and on a ${city} site, word travels.</li>
         <li><strong>Winterization (+$45/cycle).</strong> It matters when your site runs December through March; a non-winterized tank can freeze solid and crack, and then you are buying a unit, not renting one.</li>
         <li><strong>Narrow-profile high-rise units.</strong> It matters the second your only vertical access is a freight elevator. Standard units do not fit, and a crane lift you did not plan for is a bad afternoon.</li>
         <li><strong>28-day billing, not "monthly."</strong> It matters because it lines up with how you actually budget a phase, with no surprise prorations.</li>
       </ul>`,
    faqs: (city) => [
      {
        q: `How often are construction units serviced in ${city}?`,
        a: `Weekly, and it is included in the rate &mdash; not an upsell. Service covers pump-out, sanitizing, and restocking paper and sanitizer. If your ${city} crew size jumps mid-project, call us and we will bump the frequency.`,
      },
      {
        q: `What does a construction porta potty cost per month in ${city}?`,
        a: `Our standard unit runs $250 per 28-day cycle in ${city} with weekly service included. A unit with an interior sink is $325. First-cycle delivery is $95 and waived on two or more units.`,
      },
      {
        q: `Do you winterize units for ${city} winters?`,
        a: `Yes &mdash; winterization is +$45 per cycle in the cold months and it is worth every penny. It keeps the tank and dispensers from freezing so your crew is not stuck in January.`,
      },
    ],
  },
  {
    key: 'event',
    navLabel: 'Festivals & Events',
    column: 'Events',
    comboPrefix: 'event',
    hubSlug: 'event-porta-potty-rental',
    hubEmq: 'event porta potty rental',
    hubH1: 'Event Porta Potty Rental',
    hubTitle: 'Event Porta Potty Rental: Official Festival Restrooms 2026',
    hubMeta:
      'Plan a festival, race, or street fair with clean event restrooms, ADA units, and a guest-count matrix that actually works. Reserve presentation-grade units nationwide and call (888) 708-5771 for transparent pricing.',
    comboEmq: (city) => `event porta potties ${city}`,
    comboH1: (city) => `Event Porta Potties ${city}`,
    comboTitle: (city) => `Event Porta Potties ${city}: Official Festival Units 2026`,
    comboMeta: (city, phone) =>
      `Throw a clean ${city} festival, race, or block party with presentation-grade restrooms, ADA units, and a guest-count plan that holds up. Lock your delivery window and call ${phone} for a transparent quote today.`,
    intro: (city) =>
      `<p>The fastest way to ruin a great ${city} event is a restroom line that wraps around the block. I have watched it happen, and nobody remembers the band &mdash; they remember the wait. Booking <strong>event porta potties ${city}</strong> is really a math problem dressed up as a logistics problem, and most providers get the math wrong on purpose so they can upsell you later. We do not.</p>`,
    decisionFit: (city) =>
      `<h2>How Many Units Does Your ${city} Event Really Need?</h2>
       <hr class="gold-rule" />
       <p>Start with the guest-count matrix below, then adjust for two things. If you are serving alcohol, choose to add 20% more units &mdash; people drink, people go, the trade-off of skimping here is the dreaded line. If your event runs eight hours or longer, choose the higher tier even at the same headcount, because a unit serviced once at hour zero is not the same as one fresh all day. And if any part of your ${city} event is permitted, you almost certainly need at least one ADA unit on site &mdash; that is not a suggestion from me, that is the permit office talking.</p>`,
    bindings: (city) =>
      `<h2>Why These Choices Matter for a ${city} Event</h2>
       <hr class="gold-rule" />
       <ul>
         <li><strong>Flushable + interior sink units.</strong> They matter when presentation counts &mdash; a ${city} wedding-adjacent festival or a corporate activation is judged on details like this.</li>
         <li><strong>One handwash station per two units.</strong> It matters for code compliance at most permitted ${city} gatherings, and frankly for guest comfort. Cheap to add, expensive to skip.</li>
         <li><strong>+20% units when alcohol is served.</strong> It matters because consumption roughly tracks with restroom trips, and the line forms fast once it starts.</li>
         <li><strong>ADA-accessible units.</strong> They matter the moment your event is permitted and over about 20 attendees &mdash; required, not optional.</li>
       </ul>`,
    faqs: (city) => [
      {
        q: `How many porta potties do I need for a ${city} event?`,
        a: `Use the guest-count matrix on this page as your baseline, then add 20% if alcohol is served and one ADA unit for any permitted ${city} gathering. When in doubt, call and we will spec it with you in five minutes.`,
      },
      {
        q: `What is event delivery like in ${city}?`,
        a: `We deliver Friday and pick up Monday on the standard event window, and the $95 delivery fee is waived on two or more units. Rush and Sunday pickups are available for ${city} events that need them.`,
      },
      {
        q: `Do you have nicer units for upscale ${city} events?`,
        a: `Yes &mdash; flushable units with interior sinks and two-stall restroom trailers. They photograph well and they hold up across a long ${city} event day.`,
      },
    ],
  },
  {
    key: 'wedding',
    navLabel: 'Weddings',
    column: 'Events',
    comboPrefix: 'wedding',
    hubSlug: 'wedding-restroom-trailer-rental',
    hubEmq: 'wedding restroom trailer rental',
    hubH1: 'Wedding Restroom Trailer Rental',
    hubTitle: 'Wedding Restroom Trailer Rental: Official Luxury Units 2026',
    hubMeta:
      'Give guests a restroom they will actually compliment with climate-controlled, flushable wedding trailers. Reserve presentation-grade units nationwide and call (888) 708-5771 to check your date.',
    comboEmq: (city) => `wedding porta potties ${city}`,
    comboH1: (city) => `Wedding Porta Potties ${city}`,
    comboTitle: (city) => `Wedding Porta Potties ${city}: Official Luxury Trailers 2026`,
    comboMeta: (city, phone) =>
      `Treat your ${city} wedding guests to climate-controlled, flushable restroom trailers that match the day. Check date availability, lock your placement, and call ${phone} for a transparent quote now.`,
    intro: (city) =>
      `<p>Nobody dreams about the restrooms at their wedding &mdash; until the only option is a beat-up plastic box next to the dance floor. If you are planning an outdoor or venue wedding and weighing <strong>wedding porta potties ${city}</strong>, do yourself a favor and look at a real restroom trailer instead. I will be blunt: it is the single upgrade guests notice and mention, and it costs less than your second tier of flowers.</p>`,
    decisionFit: (city) =>
      `<h2>Trailer or Standard Units for Your ${city} Wedding?</h2>
       <hr class="gold-rule" />
       <p>It comes down to guest count and how the photos need to look. If you are under about 100 guests and the budget is tight, choose flushable single units with interior sinks &mdash; they are clean and presentable and they get the job done. If you are over 100, or the venue is upscale, or grandma is coming, choose the two-stall restroom trailer; the trade-off is a higher rate against a genuinely nicer experience with running water, climate control, and real lighting. One more thing for ${city} couples: book the trailer early. We have a limited number and Saturdays in season go first.</p>`,
    bindings: (city) =>
      `<h2>Why These Details Matter at a ${city} Wedding</h2>
       <hr class="gold-rule" />
       <ul>
         <li><strong>Climate control.</strong> It matters when your ${city} date lands in peak summer or a cold snap &mdash; a comfortable trailer keeps guests at the reception instead of in their cars.</li>
         <li><strong>Flushable with running water.</strong> It matters because formalwear and a basic chemical toilet do not mix; guests notice the difference instantly.</li>
         <li><strong>Interior lighting and vanity.</strong> It matters for evening receptions and for anyone touching up &mdash; small thing, big impression.</li>
         <li><strong>Early booking.</strong> It matters because trailer inventory is limited; a ${city} Saturday in season is the first thing to sell out.</li>
       </ul>`,
    faqs: (city) => [
      {
        q: `Are restroom trailers worth it for a ${city} wedding?`,
        a: `Honestly, yes, for most outdoor or venue weddings in ${city}. Running water, climate control, and proper lighting are the difference between guests tolerating the restroom and complimenting it. It is the cheapest "wow" on the whole budget.`,
      },
      {
        q: `How early should I book a ${city} wedding trailer?`,
        a: `As early as you have a date. Trailer inventory is limited and ${city} Saturdays in season book out first &mdash; do not leave it to the final month.`,
      },
      {
        q: `What if my ${city} guest count is small?`,
        a: `Then flushable single units with interior sinks are a perfectly good call and easier on the budget. We will tell you honestly when a trailer is overkill for your ${city} headcount.`,
      },
    ],
  },
  {
    key: 'ada',
    navLabel: 'ADA-Accessible',
    column: 'Unit Types',
    comboPrefix: 'ada',
    hubSlug: 'ada-portable-restroom-rental',
    hubEmq: 'ada portable restroom rental',
    hubH1: 'ADA Portable Restroom Rental',
    hubTitle: 'ADA Portable Restroom Rental: Official Accessible Units 2026',
    hubMeta:
      'Meet permit requirements with ground-level, grab-bar-equipped accessible restrooms for events and job sites. Reserve compliant units nationwide and call (888) 708-5771 for placement guidance.',
    comboEmq: (city) => `ada porta potties ${city}`,
    comboH1: (city) => `ADA Porta Potties ${city}`,
    comboTitle: (city) => `ADA Porta Potties ${city}: Official Accessible Units 2026`,
    comboMeta: (city, phone) =>
      `Stay compliant at your ${city} event or site with ground-level, grab-bar accessible restrooms placed on firm, level ground. Get permit-ready guidance and call ${phone} for a quote today.`,
    intro: (city) =>
      `<p>Here is the thing most planners learn the hard way: the permit office in ${city} cares about accessibility, and "we ran out of room" is not an answer they accept. If you are sorting out <strong>ada porta potties ${city}</strong> for a permitted event or a public-facing job site, get the count and the placement right the first time. It is genuinely simple once someone explains it &mdash; so let me.</p>`,
    decisionFit: (city) =>
      `<h2>How Many ADA Units Does Your ${city} Event Need?</h2>
       <hr class="gold-rule" />
       <p>The rule of thumb I give every ${city} client: at least one ADA-accessible unit for any permitted event, then add one more per ten standard units after that. If you are running a small gathering, choose the single ADA unit and place it on firm, level ground near the main path &mdash; the trade-off of tucking it in a far corner is that it technically is not accessible and a permit inspector will say so. For larger ${city} events, choose to distribute ADA units across the site rather than clustering them, so no guest has to cross the whole venue. Placement matters as much as count here.</p>`,
    bindings: (city) =>
      `<h2>Why ADA Placement Matters in ${city}</h2>
       <hr class="gold-rule" />
       <ul>
         <li><strong>Ground-level entry, no step.</strong> It matters because a single step makes the unit non-compliant &mdash; ${city} inspectors check this specifically.</li>
         <li><strong>Grab bars and turning radius.</strong> They matter for actual usability by wheelchair users, which is the entire point, not just the checkbox.</li>
         <li><strong>Firm, level placement.</strong> It matters when your ${city} venue is grass or gravel; a tilted unit on soft ground fails both safety and compliance.</li>
         <li><strong>One ADA per 10 standard units.</strong> It matters for clearing permit review without a last-minute scramble.</li>
       </ul>`,
    faqs: (city) => [
      {
        q: `Are ADA porta potties required for ${city} events?`,
        a: `For permitted events, effectively yes &mdash; plan on at least one ADA unit, then one per ten standard units. ${city} permit reviewers look for this, so build it in from the start.`,
      },
      {
        q: `How much does an ADA unit cost in ${city}?`,
        a: `An accessible event unit is $395 in ${city}; on a construction cycle it is $340 per 28 days. It is a small premium over a standard unit for a meaningful difference in access.`,
      },
      {
        q: `Where should ADA units go at my ${city} site?`,
        a: `On firm, level ground near the main path of travel, distributed rather than clustered. We will help you map placement so your ${city} layout passes inspection.`,
      },
    ],
  },
  {
    key: 'handwash',
    navLabel: 'Hand-Wash Stations',
    column: 'Unit Types',
    comboPrefix: 'handwash',
    hubSlug: 'handwash-station-rental',
    hubEmq: 'handwash station rental',
    hubH1: 'Handwash Station Rental',
    hubTitle: 'Handwash Station Rental: Official Portable Sinks 2026',
    hubMeta:
      'Pair clean portable sinks with any restroom for code compliance and guest comfort at events and job sites. Reserve fresh-water handwash stations nationwide and call (888) 708-5771 for pricing.',
    comboEmq: (city) => `handwash stations ${city}`,
    comboH1: (city) => `Handwash Stations ${city}`,
    comboTitle: (city) => `Handwash Stations ${city}: Official Portable Sinks 2026`,
    comboMeta: (city, phone) =>
      `Add fresh-water portable sinks to your ${city} event or job site for compliance and basic decency. Pair one per two units and call ${phone} for a quick quote on handwash stations today.`,
    intro: (city) =>
      `<p>Handwashing is the part everybody forgets until the health inspector or the permit checklist brings it up. If you are adding <strong>handwash stations ${city}</strong> to an event or a job site, the good news is it is cheap and easy &mdash; the bad news is skipping it can stall a permit or get a food vendor shut down. Let me save you that headache.</p>`,
    decisionFit: (city) =>
      `<h2>How Many Handwash Stations for Your ${city} Setup?</h2>
       <hr class="gold-rule" />
       <p>The baseline is one handwash station per two restroom units, and you adjust from there. If your ${city} event has food vendors, choose to add dedicated stations near the food &mdash; most health departments require it, and the trade-off of "they can use the restroom sink" is a failed inspection. If it is a straightforward construction site, choose one station near the unit cluster and you are compliant. Simple, but the count is the part people lowball, so do not.</p>`,
    bindings: (city) =>
      `<h2>Why Handwash Stations Matter in ${city}</h2>
       <hr class="gold-rule" />
       <ul>
         <li><strong>Fresh-water, foot-pump operation.</strong> It matters for real hygiene and for satisfying ${city} health requirements at any event with food.</li>
         <li><strong>One per two units.</strong> It matters because that is the ratio most permits and inspectors expect &mdash; under-count and you are non-compliant.</li>
         <li><strong>Placement near food vendors.</strong> It matters when your ${city} event serves food; a station by the restrooms alone often is not enough.</li>
         <li><strong>Standalone or paired.</strong> It matters for flexibility &mdash; a $250 standalone station is cheap insurance against a stalled ${city} permit.</li>
       </ul>`,
    faqs: (city) => [
      {
        q: `Do I need handwash stations at my ${city} event?`,
        a: `If you have food vendors in ${city}, almost certainly yes &mdash; health departments require accessible handwashing. Even without food, one per two restroom units is the expected ratio.`,
      },
      {
        q: `How much is a handwash station in ${city}?`,
        a: `A standalone fresh-water station is $250 in ${city}. It is one of the cheapest line items on the order and one of the easiest ways to keep a permit on track.`,
      },
      {
        q: `Can I add stations to a restroom order in ${city}?`,
        a: `Absolutely &mdash; we pair them with any ${city} restroom rental and place them where your layout or health inspector needs them.`,
      },
    ],
  },
  {
    key: 'longterm',
    navLabel: 'Long-Term Service',
    column: 'Industries',
    comboPrefix: 'long-term',
    hubSlug: 'long-term-portable-toilet-service',
    hubEmq: 'long term portable toilet service',
    hubH1: 'Long-Term Portable Toilet Service',
    hubTitle: 'Long Term Portable Toilet Service: Official Site Plans 2026',
    hubMeta:
      'Set and forget your site sanitation with scheduled cleaning, restocking, and placement management on a steady cycle. Reserve a long-term plan nationwide and call (888) 708-5771 to build a schedule.',
    comboEmq: (city) => `long term porta potty service ${city}`,
    comboH1: (city) => `Long Term Porta Potty Service ${city}`,
    comboTitle: (city) => `Long Term Porta Potty Service ${city}: Official Plans 2026`,
    comboMeta: (city, phone) =>
      `Keep your ${city} site covered for months with scheduled cleaning, restocking, and placement management on a steady 28-day cycle. Build a hands-off plan and call ${phone} today.`,
    intro: (city) =>
      `<p>Short rentals are easy. The thing that actually separates providers is the boring part &mdash; showing up every single week for months without being chased. If you need <strong>long term porta potty service ${city}</strong> for a multi-month build or an ongoing facility, what you are really buying is reliability, not a plastic box. That is the whole pitch, and I am fine being boring about it.</p>`,
    decisionFit: (city) =>
      `<h2>Which Long-Term Plan Fits Your ${city} Site?</h2>
       <hr class="gold-rule" />
       <p>It depends on traffic and season. If your ${city} site has a steady small crew, choose the standard 28-day cycle with weekly service &mdash; predictable billing, no surprises. If headcount swings or you have heavy use, choose a plan with twice-weekly service; the trade-off is a higher rate against units that never get ahead of you. And if the project crosses into winter, choose to fold winterization into the plan up front rather than scrambling when the first freeze hits ${city}. Set the schedule once and stop thinking about it &mdash; that is the entire goal.</p>`,
    bindings: (city) =>
      `<h2>Why a Managed Plan Matters in ${city}</h2>
       <hr class="gold-rule" />
       <ul>
         <li><strong>Scheduled weekly service.</strong> It matters because consistency is the one thing cut-rate providers fail at &mdash; and on a long ${city} job, one missed week is all it takes.</li>
         <li><strong>Placement management.</strong> It matters when your ${city} site phases change; we relocate units as the work moves instead of leaving them stranded.</li>
         <li><strong>Predictable 28-day billing.</strong> It matters for budgeting a months-long project without proration headaches.</li>
         <li><strong>Built-in winterization.</strong> It matters when the project runs through a ${city} winter; planning it up front beats an emergency call.</li>
       </ul>`,
    faqs: (city) => [
      {
        q: `What does long-term service include in ${city}?`,
        a: `Scheduled weekly cleaning, pump-out, restocking, and placement management on a 28-day cycle in ${city}. You set the schedule once and we just keep it.`,
      },
      {
        q: `Can you handle multi-month ${city} projects?`,
        a: `That is exactly what this is built for. We run units for the full length of ${city} builds, adjust service frequency to crew size, and relocate units as phases shift.`,
      },
      {
        q: `Is billing predictable on a long ${city} rental?`,
        a: `Yes &mdash; flat 28-day cycles, weekly service included, no surprise prorations. Winterization is the only seasonal add in ${city}, and we plan it with you in advance.`,
      },
    ],
  },
  {
    key: 'film',
    navLabel: 'Film & Production',
    column: 'Industries',
    comboPrefix: 'film',
    hubSlug: 'film-production-restroom-rental',
    hubEmq: 'film production restroom rental',
    hubH1: 'Film Production Restroom Rental',
    hubTitle: 'Film Production Restroom Rental: Official Base Camp 2026',
    hubMeta:
      'Outfit base camp with climate-controlled restroom trailers crews actually want, on call seven days a week. Reserve production-grade units nationwide and call (888) 708-5771 to scout placement.',
    comboEmq: (city) => `film production restrooms ${city}`,
    comboH1: (city) => `Film Production Restrooms ${city}`,
    comboTitle: (city) => `Film Production Restrooms ${city}: Official Base Camp 2026`,
    comboMeta: (city, phone) =>
      `Keep your ${city} base camp running with climate-controlled restroom trailers, flexible call times, and seven-day service. Scout placement and call ${phone} for production-grade units today.`,
    intro: (city) =>
      `<p>On a set, the restroom trailer is talent-facing whether you planned it that way or not. If you are coordinating <strong>film production restrooms ${city}</strong> for a shoot, you already know base camp lives or dies on the details nobody credits. I have outfitted enough ${city} location days to know what a line producer actually needs &mdash; and it is not the cheapest trailer.</p>`,
    decisionFit: (city) =>
      `<h2>What Does Your ${city} Base Camp Actually Need?</h2>
       <hr class="gold-rule" />
       <p>Match the unit to the call. If it is a quick ${city} day shoot with a lean crew, choose standard event-grade units placed at base camp &mdash; clean, fast, done. If it is a multi-day shoot or you have talent and department heads on site, choose the climate-controlled restroom trailer; the trade-off is cost against keeping the people who matter comfortable and on schedule. And whatever the size, choose a provider who answers the phone seven days a week, because ${city} shoots do not run banker's hours and a base-camp problem at 5am is a real problem.</p>`,
    bindings: (city) =>
      `<h2>Why These Specs Matter on a ${city} Shoot</h2>
       <hr class="gold-rule" />
       <ul>
         <li><strong>Climate-controlled trailers.</strong> They matter for talent comfort and wardrobe on long ${city} location days &mdash; this is a morale and schedule issue, not a luxury.</li>
         <li><strong>Seven-day, off-hours dispatch.</strong> It matters because ${city} production schedules ignore weekends; you need someone reachable when the day starts before sunrise.</li>
         <li><strong>Flexible placement.</strong> It matters when base camp moves with the shoot; units have to land where the location manager needs them.</li>
         <li><strong>Presentation-grade interiors.</strong> They matter because on a set, anything talent touches reflects on the production.</li>
       </ul>`,
    faqs: (city) => [
      {
        q: `Do you service film shoots in ${city}?`,
        a: `Yes &mdash; we outfit base camps for ${city} location work with restroom trailers and standard units, and we dispatch seven days a week because production schedules demand it.`,
      },
      {
        q: `Can you deliver off-hours for a ${city} shoot?`,
        a: `We can. ${city} call times start before sunrise, so we work around the schedule for delivery, placement, and servicing rather than the other way around.`,
      },
      {
        q: `What units work best for ${city} base camp?`,
        a: `Climate-controlled restroom trailers for any multi-day or talent-facing ${city} shoot; standard event-grade units for lean day shoots. We will scout placement with your location manager.`,
      },
    ],
  },
];

// Menu column order
export const USE_CASE_COLUMNS = ['Industries', 'Events', 'Unit Types'];

const HUB_BY_SLUG = new Map(USE_CASES.map((u) => [u.hubSlug, u]));
const UC_BY_PREFIX = USE_CASES.map((u) => ({ prefix: `${u.comboPrefix}-`, useCase: u }));

// Returns the use-case for a hub slug, or null.
export function getHubUseCase(slug) {
  return HUB_BY_SLUG.get(slug) || null;
}

// Parses a combo slug into { useCase, citySlug } or null. Does not validate the
// city against the DB (caller does that) — only splits the known use-case prefix.
export function parseComboSlug(slug) {
  for (const { prefix, useCase } of UC_BY_PREFIX) {
    if (slug.startsWith(prefix)) {
      const citySlug = slug.slice(prefix.length);
      if (citySlug.startsWith('porta-potties-')) {
        return { useCase, citySlug };
      }
    }
  }
  return null;
}

// Sibling use-cases for in-page "across" links (everything except the current one).
export function siblingUseCases(key) {
  return USE_CASES.filter((u) => u.key !== key);
}
