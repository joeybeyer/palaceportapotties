export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllLocations } from '@/lib/db';

export const metadata = {
  title: 'Palace Porta Potties Locations: Local Service Areas 2026',
  description:
    'Find Palace Porta Potties locations by city and state. Local dispatch pages include address, phone, maps, hours, and service details.',
  alternates: { canonical: 'https://palaceportapotties.com/locations/' },
};

export default async function LocationsPage() {
  const locations = await getAllLocations();
  const groups = locations.reduce((acc, loc) => {
    const key = loc.state;
    if (!acc[key]) acc[key] = { state: loc.state, state_code: loc.state_code, cities: [] };
    acc[key].cities.push(loc);
    return acc;
  }, {});
  const stateGroups = Object.values(groups).sort((a, b) => a.state.localeCompare(b.state));

  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">Palace Porta Potties Locations</span>
          <h1>Find Your Local Palace Location</h1>
          <p className="lead">
            Choose the city page that matches your job site, event venue, or Google Business Profile market.
          </p>
        </div>
      </section>

      <section className="locations">
        <div className="container">
          <p className="section-eyebrow">Service Areas</p>
          <h2>Location Menu</h2>
          <hr className="gold-rule" />
          {stateGroups.map((group) => (
            <div key={group.state_code} className="location-state-group">
              <h3>{group.state}</h3>
              <div className="location-grid">
                {group.cities.map((loc) => (
                  <Link key={loc.slug} href={`/${loc.slug}/`} className="location-card">
                    <h4>{loc.city}, {loc.state_code}</h4>
                    <p>{loc.address_line}</p>
                    <p className="phone">{loc.phone}</p>
                    <span className="view-link">Open {loc.city} location &rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
