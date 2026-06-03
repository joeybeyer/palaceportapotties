'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { USE_CASES, USE_CASE_COLUMNS } from '@/lib/useCases';

const DEFAULT_PHONE = { display: '(888) 708-5771', tel: '+18887085771' };

export default function Header({ locations }) {
  const pathname = usePathname();
  const currentPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const activeLocation = locations.find((loc) => currentPath === `/${loc.slug}/`);
  const phone = activeLocation
    ? { display: activeLocation.phone, tel: activeLocation.phone_tel }
    : DEFAULT_PHONE;
  const groups = locations.reduce((acc, loc) => {
    const key = loc.state;
    if (!acc[key]) acc[key] = { state: loc.state, state_code: loc.state_code, cities: [] };
    acc[key].cities.push(loc);
    return acc;
  }, {});
  const stateGroups = Object.values(groups).sort((a, b) => a.state.localeCompare(b.state));

  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <Link href="/" className="brand-logo" aria-label="Palace Porta Potties home">
            <img src="/logo.svg" alt="Palace Porta Potties" />
          </Link>
          <nav className="site-nav">
            <Link href="/">Palace Porta Potties</Link>
            <div className="nav-menu">
              <span className="nav-menu-trigger" role="button" tabIndex={0} aria-haspopup="true">
                Solutions
              </span>
              <div className="nav-menu-panel nav-menu-panel--solutions">
                {USE_CASE_COLUMNS.map((col) => (
                  <div key={col} className="nav-menu-group">
                    <p>{col}</p>
                    {USE_CASES.filter((u) => u.column === col).map((u) => (
                      <Link key={u.key} href={`/${u.hubSlug}/`}>
                        <span>{u.navLabel}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="nav-menu">
              <Link href="/locations/" className="nav-menu-trigger" aria-haspopup="true">
                Locations
              </Link>
              <div className="nav-menu-panel">
                {stateGroups.map((group) => (
                  <div key={group.state_code} className="nav-menu-group">
                    <p>{group.state}</p>
                    {group.cities.map((loc) => (
                      <div key={loc.slug} className="nav-city">
                        <Link href={`/${loc.slug}/`} className="nav-city-link">
                          <span>{loc.city}, {loc.state_code}</span>
                          <small>{loc.address_line}</small>
                        </Link>
                        <div className="nav-city-flyout">
                          {USE_CASES.map((u) => (
                            <Link key={u.key} href={`/${u.comboPrefix}-${loc.slug}/`}>
                              {u.navLabel} in {loc.city}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <Link href="/about/">About</Link>
          </nav>
          <a href={`tel:${phone.tel}`} className="cta-phone">
            Call {phone.display}
          </a>
        </div>
      </header>
      <div className="sticky-mobile-cta">
        <a href={`tel:${phone.tel}`} className="sticky-call-btn">
          Call for a Free Quote - {phone.display}
        </a>
      </div>
    </>
  );
}
