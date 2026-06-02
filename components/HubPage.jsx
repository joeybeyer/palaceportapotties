import Link from 'next/link';
import { USE_CASES } from '@/lib/useCases';

// Renders a use-case hub page (nationwide). Links DOWN to the combo page for each
// city and ACROSS to the other use-case hubs. This is what the Solutions menu targets.
export default function HubPage({ useCase, locations }) {
  const groups = locations.reduce((acc, loc) => {
    const key = loc.state;
    if (!acc[key]) acc[key] = { state: loc.state, state_code: loc.state_code, cities: [] };
    acc[key].cities.push(loc);
    return acc;
  }, {});
  const stateGroups = Object.values(groups).sort((a, b) => a.state.localeCompare(b.state));
  const siblings = USE_CASES.filter((u) => u.key !== useCase.key);

  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">Palace Standard&trade; - {locations.length} markets nationwide</span>
          <h1>{useCase.hubH1}</h1>
          <p className="lead">
            Palace Porta Potties handles <strong>{useCase.hubEmq}</strong> the same disciplined way in
            every market we serve: clean units, confirmed delivery windows, and service that does not
            stop after the drop-off. Choose your city below for local pricing, placement, and dispatch.
          </p>
          <div className="hero-cta">
            <a href="tel:+18887085771" className="btn-primary">Get a Free Quote</a>
            <a href="#cities" className="btn-secondary">Choose Your City</a>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item"><span className="icon">&#10003;</span> {locations.length} Markets Nationwide</div>
            <div className="trust-item"><span className="icon">&#10003;</span> Weekly Service Included</div>
            <div className="trust-item"><span className="icon">&#10003;</span> 24/7 Phone Support</div>
            <div className="trust-item"><span className="icon">&#10003;</span> No Hidden Fees</div>
          </div>
        </div>
      </div>

      <section id="cities" className="locations">
        <div className="container">
          <p className="section-eyebrow">Service Areas</p>
          <h2>Where Palace Provides {useCase.navLabel} Service</h2>
          <hr className="gold-rule" />
          {stateGroups.map((group) => (
            <div key={group.state_code} className="location-state-group">
              <h3>{group.state}</h3>
              <div className="location-grid">
                {group.cities.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/${useCase.comboPrefix}-${loc.slug}/`}
                    className="location-card"
                  >
                    <h4>{loc.city}, {loc.state_code}</h4>
                    <p>{loc.address_line}</p>
                    <p className="phone">{loc.phone}</p>
                    <span className="view-link">{useCase.navLabel} in {loc.city} &rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="local-context">
        <div className="container">
          <p>
            Need a different service? Palace also provides{' '}
            {siblings.map((s, i) => (
              <span key={s.key}>
                {i > 0 && ', '}
                <Link href={`/${s.hubSlug}/`}>{s.navLabel.toLowerCase()}</Link>
              </span>
            ))}{' '}
            in every market.
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Portable Restrooms. Royal Treatment.</h2>
          <a href="tel:+18887085771" className="btn-primary">Call (888) 708-5771 for a Free Quote</a>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: useCase.hubH1,
            serviceType: useCase.navLabel,
            url: `https://palaceportapotties.com/${useCase.hubSlug}/`,
            areaServed: { '@type': 'Country', name: 'United States' },
            provider: {
              '@type': 'Organization',
              '@id': 'https://palaceportapotties.com/#organization',
              name: 'Palace Porta Potties',
              url: 'https://palaceportapotties.com',
            },
          }),
        }}
      />
    </>
  );
}
