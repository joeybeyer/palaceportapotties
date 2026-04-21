export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllLocations } from '@/lib/db';

export const metadata = {
  title: 'About Palace Porta Potties: Who We Are and Why We Started. 2026',
  description:
    'Palace Porta Potties delivers clean, serviced portable restrooms across three markets with confirmed scheduling and transparent pricing — call (888) 708-5771 for a quote.',
  alternates: { canonical: 'https://palaceportapotties.com/about/' },
  openGraph: {
    title: 'About Palace Porta Potties — Portable Restrooms With Higher Standards',
    description:
      'Clean units, fast dispatch, and dependable service for events, weddings, and job sites.',
    url: 'https://palaceportapotties.com/about/',
    type: 'website',
  },
};

export default async function AboutPage() {
  const locations = await getAllLocations();

  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">About Palace Porta Potties</span>
          <h1>Portable Restroom Rental Built on Higher Standards</h1>
          <p className="lead">
            Palace was founded to fix a simple problem: the portable toilet industry treats
            "good enough" as the finish line. We decided clean, serviced, and on-time should
            be the starting point — not the exception.
          </p>
          <div className="hero-cta">
            <a href="tel:+18887085771" className="btn-primary">Call for a Free Quote</a>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <h2>Why Palace Exists</h2>
          <hr className="gold-rule" />
          <p>
            Event planners, general contractors, and film production crews told us the same thing:
            units show up dirty, delivery windows are vague, and once the drop-off is done the
            provider disappears. Palace was built to solve each of those complaints with a
            documented process — the Palace Standard™.
          </p>
          <p>
            Every unit we deliver passes the <strong>Palace Clean Check™</strong> before it
            leaves the yard: interior sanitized, paper and sanitizer stocked, hardware tested,
            and exterior washed. If a unit does not meet that standard on arrival, we replace it
            at no charge. No argument, no delay.
          </p>
        </div>
      </section>

      <section className="about-markets">
        <div className="container">
          <h2>Where We Operate</h2>
          <hr className="gold-rule" />
          <p>
            Palace operates from yards in three of the toughest rental markets in the country.
            Each location is staffed by a local dispatch team that understands permits, venue
            access, and seasonal demand in their city.
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

      <section className="about-standards">
        <div className="container">
          <h2>The Palace Standard™</h2>
          <hr className="gold-rule" />
          <ul className="service-list">
            <li><strong>Palace Clean Check™</strong> — documented pre-delivery inspection on every unit</li>
            <li><strong>Confirmed delivery windows</strong> — a scheduled time, not a vague range</li>
            <li><strong>Scheduled servicing</strong> — cleaning and restocking for the life of your rental</li>
            <li><strong>Transparent pricing</strong> — the quote is the invoice, no buried fees</li>
            <li><strong>Direct local phone lines</strong> — answered by a person, not a call center</li>
          </ul>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Ready to Work With a Provider That Shows Up?</h2>
          <p>Transparent pricing, confirmed delivery windows, and units that actually arrive clean.</p>
          <a href="tel:+18887085771" className="btn-primary">Call (888) 708-5771 for a Free Quote</a>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://palaceportapotties.com/#organization',
            name: 'Palace Porta Potties',
            url: 'https://palaceportapotties.com',
            logo: 'https://palaceportapotties.com/logo.svg',
            description:
              'Palace Porta Potties delivers clean, reliable portable restroom rentals for events, weddings, and construction sites with faster dispatch and higher standards than typical providers.',
            telephone: '+18887085771',
            sameAs: [],
            location: locations.map((loc) => ({
              '@type': 'Place',
              name: `Palace Porta Potties — ${loc.city}`,
              address: {
                '@type': 'PostalAddress',
                streetAddress: loc.address_line,
                addressLocality: loc.city,
                addressRegion: loc.state_code,
                postalCode: loc.postal_code,
                addressCountry: 'US',
              },
              telephone: loc.phone_tel,
            })),
          }),
        }}
      />
    </>
  );
}
