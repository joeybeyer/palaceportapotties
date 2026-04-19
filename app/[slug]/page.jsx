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
  const ogImage = HERO_IMAGES[loc.slug];
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
      ...(ogImage && { images: [{ url: `https://palaceportapotties.com${ogImage}`, width: 1920, height: 1080 }] }),
    },
  };
}

const HERO_IMAGES = {
  'portable-toilet-rental-new-york': '/images/generated/NY-HERO.webp',
  'portable-toilet-rental-denver': '/images/generated/DV-HERO.webp',
  'portable-toilet-rental-chicago': '/images/generated/CHI-HERO.webp',
};

const HERO_PEOPLE = {
  'portable-toilet-rental-new-york': {
    desktop: '/images/generated/NY-HERO-PERSON.webp',
    mobile: '/images/generated/NY-HERO-PERSON-MOBILE.webp',
    alt: 'Palace Porta Potties site supervisor ready to help with your New York rental',
  },
  'portable-toilet-rental-denver': {
    desktop: '/images/generated/DV-HERO-PERSON.webp',
    mobile: '/images/generated/DV-HERO-PERSON-MOBILE.webp',
    alt: 'Palace Porta Potties event coordinator ready to help with your Denver rental',
  },
  'portable-toilet-rental-chicago': {
    desktop: '/images/generated/CHI-HERO-PERSON.webp',
    mobile: '/images/generated/CHI-HERO-PERSON-MOBILE.webp',
    alt: 'Palace Porta Potties site manager ready to help with your Chicago rental',
  },
};

const UNIT_IMAGES = {
  'portable-toilet-rental-new-york': [
    { src: '/images/generated/NY-UNIT-HIGHRISE.webp', alt: 'Portable toilet at a New York high-rise construction site' },
    { src: '/images/generated/NY-UNIT-FILM.webp', alt: 'Restroom trailer at a New York film production base camp' },
    { src: '/images/generated/NY-UNIT-SIDEWALK.webp', alt: 'Event portable restroom on a New York City sidewalk' },
    { src: '/images/generated/NY-UNIT-ADA.webp', alt: 'ADA-accessible portable restroom in a New York park' },
    { src: '/images/generated/NY-UNIT-MARATHON.webp', alt: 'Portable toilet cluster at a New York marathon start village' },
  ],
  'portable-toilet-rental-denver': [
    { src: '/images/generated/DV-UNIT-WINTER.webp', alt: 'Portable toilet at a Denver construction site in winter' },
    { src: '/images/generated/DV-UNIT-WATERLESS.webp', alt: 'Waterless portable restroom at a dry Denver trail site' },
    { src: '/images/generated/DV-UNIT-MOUNTAIN.webp', alt: 'Portable toilet at a Denver mountain event venue' },
    { src: '/images/generated/DV-UNIT-ADA-PARK.webp', alt: 'ADA-accessible unit at a Denver park event' },
    { src: '/images/generated/DV-UNIT-MARATHON.webp', alt: 'Portable toilet bank at a Denver race start line' },
  ],
  'portable-toilet-rental-chicago': [
    { src: '/images/generated/CHI-UNIT-LOOP.webp', alt: 'Portable restroom at a Chicago Loop construction site' },
    { src: '/images/generated/CHI-UNIT-FULTON.webp', alt: 'Portable toilet near a Fulton Market event venue in Chicago' },
    { src: '/images/generated/CHI-UNIT-WINTER.webp', alt: 'Portable restroom at a Chicago winter construction site' },
    { src: '/images/generated/CHI-UNIT-FILM.webp', alt: 'Restroom trailer at a Chicago film production set' },
    { src: '/images/generated/CHI-UNIT-PILSEN.webp', alt: 'Portable toilet at a Pilsen community festival in Chicago' },
    { src: '/images/generated/CHI-UNIT-ADA.webp', alt: 'ADA-accessible portable restroom at a Chicago park' },
    { src: '/images/generated/CHI-UNIT-MARATHON.webp', alt: 'Portable toilet cluster at the Chicago Marathon' },
    { src: '/images/generated/CHI-UNIT-LAKEFRONT.webp', alt: 'Portable restroom along the Chicago lakefront trail' },
  ],
};

export default async function LocationPage({ params }) {
  const loc = await getLocationBySlug(params.slug);
  if (!loc) notFound();

  const hours = JSON.parse(loc.hours_json);
  const faqs = JSON.parse(loc.faq_json);
  const heroImage = HERO_IMAGES[loc.slug];
  const heroPerson = HERO_PEOPLE[loc.slug];
  const unitImages = UNIT_IMAGES[loc.slug] || [];

  return (
    <>
      <section className={`hero location-hero${heroPerson ? ' hero-split' : ''}`}
        style={!heroPerson && heroImage ? {
          backgroundImage: `linear-gradient(135deg, rgba(11,31,58,0.82) 0%, rgba(23,59,122,0.75) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : undefined}
      >
        <div className={`container${heroPerson ? ' hero-split-grid' : ''}`}>
          <div className={heroPerson ? 'hero-content' : undefined}>
            <span className="eyebrow">Palace Standard™ — 24/7 dispatch in {loc.city}</span>
            <h1>{loc.h1}</h1>
            <div className="intro" dangerouslySetInnerHTML={{ __html: loc.intro_html }} />
            <div className="hero-cta">
              <a href={`tel:${loc.phone_tel}`} className="btn-primary">
                Call for a Free Quote
              </a>
              <a href={loc.gbp_url} target="_blank" rel="noopener" className="btn-secondary">
                View on Google Maps
              </a>
            </div>
          </div>
          {heroPerson && (
            <picture>
              <source media="(max-width: 768px)" srcSet={heroPerson.mobile} />
              <img
                src={heroPerson.desktop}
                alt={heroPerson.alt}
                className="hero-person-img"
                width="600"
                height="800"
              />
            </picture>
          )}
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

      {unitImages.length > 0 && (
        <section className="unit-gallery">
          <div className="container">
            <h2>Our Units in {loc.city}</h2>
            <hr className="gold-rule" />
            <div className="unit-gallery-grid">
              {unitImages.map((img, i) => (
                <img key={i} src={img.src} alt={img.alt} loading="lazy" width="400" height="400" />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mid-cta">
        <div className="container">
          <a href={`tel:${loc.phone_tel}`} className="btn-primary">Call for a Free Quote</a>
        </div>
      </div>

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
            image: heroImage ? `https://palaceportapotties.com${heroImage}` : 'https://palaceportapotties.com/mark.svg',
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
