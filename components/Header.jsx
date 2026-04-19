'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const PHONE_BY_ROUTE = {
  '/portable-toilet-rental-new-york/': { display: '(332) 241-1073', tel: '+13322411073' },
  '/portable-toilet-rental-denver/':   { display: '(720) 821-7760', tel: '+17208217760' },
  '/portable-toilet-rental-chicago/':  { display: '(872) 366-7440', tel: '+18723667440' },
};

const DEFAULT_PHONE = { display: '(888) 708-5771', tel: '+18887085771' };

export default function Header({ locations }) {
  const pathname = usePathname();
  const phone = PHONE_BY_ROUTE[pathname] || DEFAULT_PHONE;

  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <Link href="/" className="brand-logo" aria-label="Palace Porta Potties home">
            <img src="/logo.svg" alt="Palace Porta Potties" />
          </Link>
          <nav className="site-nav">
            <Link href="/">Portable Toilet Rental</Link>
            {locations.map((loc) => (
              <Link key={loc.slug} href={`/${loc.slug}/`}>
                {loc.city}
              </Link>
            ))}
          </nav>
          <a href={`tel:${phone.tel}`} className="cta-phone">
            Call {phone.display}
          </a>
        </div>
      </header>
      <div className="sticky-mobile-cta">
        <a href={`tel:${phone.tel}`} className="sticky-call-btn">
          Call for a Free Quote — {phone.display}
        </a>
      </div>
    </>
  );
}
