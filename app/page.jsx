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
  },
};

export default async function HomePage() {
  const locations = await getAllLocations();

  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">The Palace Standard™</span>
          <h1>Portable Toilet Rental</h1>
          <p className="lead">
            Clean units, fast delivery, and dependable service for events, weddings, job sites,
            and long-term rentals. A higher standard of portable restroom rental — built for crews
            and guests who expect better.
          </p>
          <div className="hero-cta">
            <a href="tel:+13322411073" className="btn-primary">Get a Fast Quote</a>
            <a href="#locations" className="btn-secondary">Check Local Availability</a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="trust-strip">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item"><span className="icon">✓</span> Clean & Stocked Units</div>
            <div className="trust-item"><span className="icon">✓</span> Same-Day Dispatch</div>
            <div className="trust-item"><span className="icon">✓</span> Dependable Service</div>
            <div className="trust-item"><span className="icon">✓</span> Local Phone Support</div>
          </div>
        </div>
      </div>

      <section id="locations" className="locations">
        <div className="container">
          <p className="section-eyebrow">Service Locations</p>
          <h2>Palace Service Locations</h2>
          <hr className="gold-rule" />
          <p>
            Each Palace Porta Potties location runs on the same standard: clean units, rapid
            dispatch, and professional placement. Choose your nearest city for local pricing and
            availability.
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
        </div>
      </section>

      <section>
        <div className="container">
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
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Portable Restrooms. Royal Treatment.</h2>
          <p>Fast dispatch, clean units, and service you can count on — for your next job, wedding, or event.</p>
          <a href="tel:+13322411073" className="btn-primary">Call (332) 241-1073</a>
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
