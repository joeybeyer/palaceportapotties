import { notFound } from 'next/navigation';
import { getLocationBySlug, getAllSlugs } from '@/lib/db';

export const runtime = 'edge';

// Return empty so all routes render on-demand at runtime (env vars unavailable at build on CF Pages)
export async function generateStaticParams() {
  return [];
}

// Per-page dynamic metadata driven by DB
export async function generateMetadata({ params }) {
  const loc = await getLocationBySlug(params.slug);
  if (!loc) return {};
  return {
    title: loc.meta_title,
    description: loc.meta_description,
    alternates: {
      canonical: `https://palaceportapotties.com/${loc.slug}/`,
    },
    openGraph: {
      title: loc.meta_title,
      description: loc.meta_description,
      url: `https://palaceportapotties.com/${loc.slug}/`,
      type: 'website',
    },
  };
}

export default async function LocationPage({ params }) {
  const loc = await getLocationBySlug(params.slug);
  if (!loc) notFound();

  const hours = JSON.parse(loc.hours_json);
  const faqs = JSON.parse(loc.faq_json);

  return (
    <>
      <section className="hero location-hero">
        <div className="container">
          <h1>{loc.h1}</h1>
          <div className="intro" dangerouslySetInnerHTML={{ __html: loc.intro_html }} />
          <div className="hero-cta">
            <a href={`tel:${loc.phone_tel}`} className="btn-primary">
              Call {loc.phone}
            </a>
            <a href={loc.gbp_url} target="_blank" rel="noopener" className="btn-secondary">
              View on Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* NAP block — exact match to GBP */}
      <section className="nap-block">
        <div className="container nap-grid">
          <div>
            <h2>Visit or Contact Our {loc.city} Location</h2>
            <p className="nap">
              <strong>Palace Porta Potties</strong><br />
              {loc.address_line}<br />
              {loc.city}, {loc.state_code} {loc.postal_code}<br />
              <a href={`tel:${loc.phone_tel}`}>{loc.phone}</a>
            </p>
            <h3>Hours</h3>
            <dl className="hours">
              <dt>Mon</dt><dd>{hours.mon}</dd>
              <dt>Tue</dt><dd>{hours.tue}</dd>
              <dt>Wed</dt><dd>{hours.wed}</dd>
              <dt>Thu</dt><dd>{hours.thu}</dd>
              <dt>Fri</dt><dd>{hours.fri}</dd>
              <dt>Sat</dt><dd>{hours.sat}</dd>
              <dt>Sun</dt><dd>{hours.sun}</dd>
            </dl>
          </div>
          <div className="map-embed" dangerouslySetInnerHTML={{ __html: loc.map_iframe }} />
        </div>
      </section>

      <section className="services">
        <div className="container" dangerouslySetInnerHTML={{ __html: loc.services_html }} />
      </section>

      <section className="local-context">
        <div className="container" dangerouslySetInnerHTML={{ __html: loc.local_context_html }} />
      </section>

      {/*
        Approved Palace tables — SEO-U signal: tables in the lower-half of the
        page are a confirmed ranking booster. Guest-count matrix covers
        informational intent; pricing table covers commercial intent.
        Intros live here (not in DB) so the wording stays consistent across
        markets while the city name still threads through for local relevance.
      */}
      <section className="palace-tables">
        <div className="container">
          <h2>How Many Units Does Your {loc.city} Event Need?</h2>
          <hr className="gold-rule" />
          <p>
            Sizing an event is where most providers let clients down. Below is the official
            Palace planning matrix our dispatch team uses to spec every {loc.city} booking — built
            from EPA event guidance, years of on-the-ground data, and the real-world throughput of
            a clean, serviced unit.
          </p>
          <div dangerouslySetInnerHTML={{ __html: loc.guest_count_table_html }} />

          <h2>Palace Porta Potties {loc.city} Rental Pricing</h2>
          <hr className="gold-rule" />
          <p>
            Transparent rates — no buried fees, no delivery-window surprises. The pricing below
            applies to every {loc.city} rental, whether you are booking a one-day event or a
            multi-month construction rotation.
          </p>
          <div dangerouslySetInnerHTML={{ __html: loc.pricing_table_html }} />
        </div>
      </section>

      <section className="faqs">
        <div className="container">
          <h2>Frequently Asked Questions About Rentals in {loc.city}</h2>
          {faqs.map((faq, i) => (
            <details key={i}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Ready to Reserve Your Unit?</h2>
          <a href={`tel:${loc.phone_tel}`} className="btn-primary">
            Call {loc.phone}
          </a>
        </div>
      </section>

      {/*
        HomeAndConstructionBusiness is a niche sub-type of LocalBusiness —
        SEO-U recommended niche schema types for the relevant industry.
        Portable toilet rental primarily serves construction + events, so
        HomeAndConstructionBusiness is the closest semantic fit.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HomeAndConstructionBusiness',
            '@id': `https://palaceportapotties.com/${loc.slug}/#business`,
            name: 'Palace Porta Potties',
            url: `https://palaceportapotties.com/${loc.slug}/`,
            telephone: loc.phone_tel,
            image: 'https://palaceportapotties.com/mark.svg',
            address: {
              '@type': 'PostalAddress',
              streetAddress: loc.address_line,
              addressLocality: loc.city,
              addressRegion: loc.state_code,
              postalCode: loc.postal_code,
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: loc.latitude,
              longitude: loc.longitude,
            },
            hasMap: loc.gbp_url,
            parentOrganization: {
              '@id': 'https://palaceportapotties.com/#organization',
            },
            openingHoursSpecification: [
              { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
