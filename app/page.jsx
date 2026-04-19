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
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(11,31,58,0.82) 0%, rgba(23,59,122,0.75) 100%), url(/images/generated/HP-NATIONAL-HERO.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <span className="eyebrow">The Palace Standard™</span>
          <h1>Portable Toilet Rental</h1>
          <p className="lead">
            Clean units, fast delivery, and dependable service for events, weddings, job sites,
            and long-term rentals. A higher standard of portable restroom rental — built for crews
            and guests who expect better.
          </p>
          <div className="hero-cta">
            <a href="tel:+18887085771" className="btn-primary">Get a Fast Quote</a>
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
          <div className="service-images">
            <img src="/images/generated/STK-WEDDING.webp" alt="Palace Porta Potties restroom trailer at an outdoor wedding" loading="lazy" width="400" height="400" />
            <img src="/images/generated/STK-CREW.webp" alt="Construction crew using Palace portable restrooms on a job site" loading="lazy" width="400" height="400" />
            <img src="/images/generated/STK-HANDWASH.webp" alt="Palace Porta Potties hand wash station at an event" loading="lazy" width="400" height="400" />
            <img src="/images/generated/STK-SERVICING.webp" alt="Palace technician servicing a portable restroom unit" loading="lazy" width="400" height="400" />
          </div>
        </div>
      </section>

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

      <section className="cta-band">
        <div className="container">
          <h2>Portable Restrooms. Royal Treatment.</h2>
          <p>Fast dispatch, clean units, and service you can count on — for your next job, wedding, or event.</p>
          <a href="tel:+18887085771" className="btn-primary">Call (888) 708-5771</a>
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
