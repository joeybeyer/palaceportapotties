import Link from 'next/link';
import { siblingUseCases } from '@/lib/useCases';
import { getComboDecisionFit } from '@/lib/comboContent';

// Renders a use-case x city combo page (e.g. Construction x Chicago).
// City-unique content (NAP, map, local context, pricing) is reused verbatim from
// the DB location row; use-case content comes from the useCase definition.
export default function ComboPage({ useCase, loc }) {
  const hours = JSON.parse(loc.hours_json);
  const siblings = siblingUseCases(useCase.key);
  const showGuestTable = ['event', 'wedding', 'ada', 'handwash'].includes(useCase.key);
  const hasVerifiedMapListing = Boolean(loc.gbp_cid || loc.gbp_place_id);
  const decisionFitHtml = getComboDecisionFit(loc.slug, useCase.key) || useCase.decisionFit(loc.city);

  return (
    <>
      <section className="hero location-hero">
        <div className="container">
          <span className="eyebrow">Palace Standard&trade; - serving {loc.city} 24/7</span>
          <h1>{useCase.comboH1(loc.city)}</h1>
          <div className="intro" dangerouslySetInnerHTML={{ __html: useCase.intro(loc.city) }} />
          <div className="hero-cta">
            <a href={`tel:${loc.phone_tel}`} className="btn-primary">Call for a Free Quote</a>
            <a href={loc.gbp_url} target="_blank" rel="noopener" className="btn-secondary">
              {hasVerifiedMapListing ? 'View Google Business Profile' : 'View Address on Maps'}
            </a>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container" dangerouslySetInnerHTML={{ __html: decisionFitHtml }} />
      </section>

      <section className="local-context">
        <div className="container" dangerouslySetInnerHTML={{ __html: useCase.bindings(loc.city) }} />
      </section>

      <div className="mid-cta">
        <div className="container">
          <a href={`tel:${loc.phone_tel}`} className="btn-primary">Call for a Free Quote</a>
        </div>
      </div>

      {/* NAP block - exact match to GBP */}
      <section className="nap-block" itemScope itemType="https://schema.org/LocalBusiness">
        <meta itemProp="url" content={`https://palaceportapotties.com/${loc.slug}/`} />
        {hasVerifiedMapListing && <link itemProp="hasMap" href={loc.gbp_url} />}
        <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
          <meta itemProp="latitude" content={String(loc.latitude)} />
          <meta itemProp="longitude" content={String(loc.longitude)} />
        </div>
        <div className="container nap-grid">
          <div>
            <h2>Contact Our {loc.city} Location</h2>
            <p className="nap">
              <strong itemProp="name">Palace Porta Potties</strong><br />
              <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">{loc.address_line}</span><br />
                <span itemProp="addressLocality">{loc.city}</span>,{' '}
                <span itemProp="addressRegion">{loc.state_code}</span>{' '}
                <span itemProp="postalCode">{loc.postal_code}</span>
                <meta itemProp="addressCountry" content="US" />
              </span><br />
              <a itemProp="telephone" href={`tel:${loc.phone_tel}`}>{loc.phone}</a>
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

      {/* City-unique local content reused from the DB - the 85%+ uniqueness anchor */}
      <section className="local-context">
        <div className="container" dangerouslySetInnerHTML={{ __html: loc.local_context_html }} />
      </section>

      <section className="palace-tables">
        <div className="container">
          {showGuestTable && loc.guest_count_table_html && (
            <>
              <h2>How Many Units Does Your {loc.city} Event Need?</h2>
              <hr className="gold-rule" />
              <div dangerouslySetInnerHTML={{ __html: loc.guest_count_table_html }} />
            </>
          )}
          <h2>Palace Porta Potties {loc.city} Rental Pricing</h2>
          <hr className="gold-rule" />
          <p>
            Transparent rates - no buried fees, no delivery-window surprises. These {loc.city} rates
            apply whether you are booking a one-day event or a multi-month rotation.
          </p>
          <div dangerouslySetInnerHTML={{ __html: loc.pricing_table_html }} />
        </div>
      </section>

      <section className="faqs">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          {useCase.faqs(loc.city).map((faq, i) => (
            <details key={i}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* In-situ internal links: up to city hub + use-case hub, across to sibling use-cases */}
      <section className="local-context">
        <div className="container">
          <p>
            This is part of Palace Porta Potties in{' '}
            <Link href={`/${loc.slug}/`}>{loc.city}</Link> - see our full{' '}
            <Link href={`/${useCase.hubSlug}/`}>{useCase.navLabel.toLowerCase()} rental options</Link>{' '}
            nationwide, or pick another service in {loc.city}:{' '}
            {siblings.map((s, i) => (
              <span key={s.key}>
                {i > 0 && ', '}
                <Link href={`/${s.comboPrefix}-${loc.slug}/`}>{s.navLabel}</Link>
              </span>
            ))}.
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Ready to Reserve in {loc.city}?</h2>
          <a href={`tel:${loc.phone_tel}`} className="btn-primary">Call {loc.phone}</a>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: useCase.comboH1(loc.city),
            serviceType: useCase.navLabel,
            url: `https://palaceportapotties.com/${useCase.comboPrefix}-${loc.slug}/`,
            areaServed: { '@type': 'City', name: loc.city },
            provider: {
              '@type': 'LocalBusiness',
              '@id': `https://palaceportapotties.com/${loc.slug}/#business`,
              name: 'Palace Porta Potties',
              telephone: loc.phone_tel,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: useCase.faqs(loc.city).map((f) => ({
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
