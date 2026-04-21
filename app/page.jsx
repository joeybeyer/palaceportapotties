export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllLocations } from '@/lib/db';

export const metadata = {
  title: 'Portable Toilet Rental: Official Nationwide Delivery Network 2026',
  description:
    'Reserve clean, serviced restroom units for construction, weddings, and events nationwide. Same-day dispatch in supported markets, dependable scheduling, and presentation you can feel good about — call for an instant quote.',
  alternates: { canonical: 'https://palaceportapotties.com/' },
  openGraph: {
    title: 'Portable Toilet Rental With Higher Standards — Palace Porta Potties',
    description:
      'Clean units, fast delivery, and dependable service for events, weddings, and job sites.',
    url: 'https://palaceportapotties.com/',
    type: 'website',
    images: [{ url: 'https://palaceportapotties.com/images/generated/HP-NATIONAL-HERO.webp', width: 1920, height: 1080 }],
  },
};

export default async function HomePage() {
  const locations = await getAllLocations();

  return (
    <>
      <section className="hero hero-split">
        <div className="container hero-split-grid">
          <div className="hero-content">
            <span className="eyebrow">Serving construction, events, and film across 3 markets</span>
            <h1>Portable Toilet Rental That Actually Shows Up Clean</h1>
            <p className="lead">
              Most providers drop off a unit and disappear. Palace delivers serviced, stocked
              restrooms on schedule — so your crew or guests never deal with a filthy
              portable toilet again.
            </p>
            <div className="hero-cta">
              <a href="tel:+18887085771" className="btn-primary">Get a Free Quote</a>
              <a href="#locations" className="btn-secondary">Check Local Availability</a>
            </div>
          </div>
          <picture>
            <source media="(max-width: 768px)" srcSet="/images/generated/HP-HERO-PERSON-MOBILE.webp" />
            <img
              src="/images/generated/HP-HERO-PERSON.webp"
              alt="Palace Porta Potties event coordinator ready to help with your rental"
              className="hero-person-img"
              width="600"
              height="800"
              fetchPriority="high"
            />
          </picture>
        </div>
      </section>

      {/* Trust strip */}
      <div className="trust-strip">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item"><span className="icon">✓</span> 3 Markets Nationwide</div>
            <div className="trust-item"><span className="icon">✓</span> Same-Day Dispatch Available</div>
            <div className="trust-item"><span className="icon">✓</span> 24/7 Phone Support</div>
            <div className="trust-item"><span className="icon">✓</span> No Hidden Fees</div>
          </div>
        </div>
      </div>

      <section id="locations" className="locations">
        <div className="container">
          <p className="section-eyebrow">Service Locations</p>
          <h2>Palace Service Locations</h2>
          <hr className="gold-rule" />
          <p>
            Palace operates from yards in three of the country's toughest rental markets.
            Our <Link href="/portable-toilet-rental-new-york/">New York team</Link> handles
            SAPO permits and freight-elevator deliveries across five boroughs.
            Our <Link href="/portable-toilet-rental-denver/">Denver crew</Link> winterizes
            every long-term rental and delivers up to Front Range mountain venues.
            And our <Link href="/portable-toilet-rental-chicago/">Chicago dispatch</Link> covers
            CDOT permit coordination from the Pilsen yard out to the lakefront.
          </p>
          <div className="location-grid">
            {locations.map((loc) => (
              <Link key={loc.slug} href={`/${loc.slug}/`} className="location-card">
                <h3>{loc.city}, {loc.state_code}</h3>
                <p>{loc.address_line}</p>
                <p className="phone">{loc.phone}</p>
                <span className="view-link">View {loc.city} availability →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <p className="section-eyebrow">What We Rent</p>
          <h2>Units Built for the Job, Ready for the Guests</h2>
          <hr className="gold-rule" />
          <ul className="service-list">
            <li><strong>Construction portable toilets</strong> — weekly service, built for heavy job-site use</li>
            <li><strong>Event-ready restroom units</strong> — preferred for permitted gatherings, festivals, and races</li>
            <li><strong>Wedding restroom trailers</strong> — deluxe, flushable, and presentation-grade</li>
            <li><strong>ADA-accessible units</strong> — required for most permitted events</li>
            <li><strong>Hand wash stations</strong> — pair with any unit for code compliance and guest comfort</li>
            <li><strong>Long-term service plans</strong> — scheduled cleaning, restocking, and placement management</li>
          </ul>
          <div className="service-images">
            <img src="/images/generated/STK-WEDDING.webp" alt="Palace Porta Potties restroom trailer at an outdoor wedding" loading="lazy" width="400" height="400" />
            <img src="/images/generated/STK-CREW.webp" alt="Construction crew using Palace portable restrooms on a job site" loading="lazy" width="400" height="400" />
            <img src="/images/generated/STK-HANDWASH.webp" alt="Palace Porta Potties hand wash station at an event" loading="lazy" width="400" height="400" />
            <img src="/images/generated/STK-SERVICING.webp" alt="Palace technician servicing a portable restroom unit" loading="lazy" width="400" height="400" />
          </div>
        </div>
      </section>

      <section className="why-palace">
        <div className="container">
          <p className="section-eyebrow">Why Palace</p>
          <h2>The Problems Nobody Talks About</h2>
          <hr className="gold-rule" />
          <div className="why-grid">
            <div className="why-card why-problem">
              <h3>The Industry Standard</h3>
              <ul>
                <li>Units arrive dirty from the last job</li>
                <li>Delivery windows are vague or missed</li>
                <li>Service stops after the drop-off</li>
                <li>Pricing has hidden trip fees and surcharges</li>
                <li>You call a 1-800 number and get a voicemail</li>
              </ul>
            </div>
            <div className="why-card why-solution">
              <h3>The Palace Standard™</h3>
              <ul>
                <li>Every unit cleaned and stocked before delivery</li>
                <li>Confirmed delivery window — not a guess</li>
                <li>Scheduled servicing for the life of your rental</li>
                <li>Transparent pricing — the quote is the invoice</li>
                <li>Direct local phone line, answered by a person</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="mid-cta">
        <div className="container">
          <a href="tel:+18887085771" className="btn-primary">Call for a Free Quote</a>
        </div>
      </div>

      <section className="how-it-works">
        <div className="container how-it-works-grid">
          <div>
            <p className="section-eyebrow">How It Works</p>
            <h2>Clean Scheduling. No Drama.</h2>
            <hr className="gold-rule" />
            <ol>
              <li><strong>Call your nearest Palace location</strong> for transparent, no-pressure pricing.</li>
              <li><strong>Confirm delivery window</strong>, unit count, and servicing schedule.</li>
              <li><strong>We deliver, place, and service</strong> units on schedule — every time.</li>
              <li><strong>Pickup coordinated</strong> on your preferred end date, professionally handled.</li>
            </ol>
          </div>
          <img
            src="/images/generated/HP-DELIVERY.webp"
            alt="Palace Porta Potties delivery truck placing a unit at a job site"
            className="how-it-works-img"
            width="560"
            height="560"
            loading="lazy"
          />
        </div>
      </section>

      <section className="guarantee">
        <div className="container guarantee-content">
          <h2>The Palace Clean Check™ Promise</h2>
          <hr className="gold-rule" />
          <p>
            Every Palace unit passes a documented inspection before delivery: interior sanitized,
            paper and sanitizer stocked, hardware tested, and exterior washed. If a unit does not
            meet the Palace Standard™ on arrival, we replace it at no charge. No argument, no delay.
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Portable Restrooms. Royal Treatment.</h2>
          <p>Transparent pricing, confirmed delivery windows, and units that actually show up clean.</p>
          <a href="tel:+18887085771" className="btn-primary">Call (888) 708-5771 for a Free Quote</a>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Palace Porta Potties',
            url: 'https://palaceportapotties.com',
            logo: 'https://palaceportapotties.com/logo.svg',
            description:
              'Palace Porta Potties delivers clean, reliable portable restroom rentals for events, weddings, and construction sites with faster dispatch and higher standards than typical providers.',
            sameAs: [],
          }),
        }}
      />
    </>
  );
}
