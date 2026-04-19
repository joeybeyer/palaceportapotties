export const dynamic = 'force-dynamic';

import { getAllLocations } from '@/lib/db';
import Link from 'next/link';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://palaceportapotties.com'),
  alternates: { canonical: '/' },
  icons: {
    icon: '/mark.svg',
  },
};

export default async function RootLayout({ children }) {
  const locations = await getAllLocations();

  return (
    <html lang="en">
      <body>
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
            <a href="tel:+13322411073" className="cta-phone">
              Call (332) 241-1073
            </a>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <p>
              <strong>Palace Porta Potties</strong> — Portable restroom rental with higher standards.
              Clean units, fast dispatch, and dependable service for events, weddings, and job sites.
            </p>
            <nav className="footer-nav">
              <Link href="/">Home</Link>
              {locations.map((loc) => (
                <Link key={loc.slug} href={`/${loc.slug}/`}>
                  {loc.city}, {loc.state_code}
                </Link>
              ))}
            </nav>
            <p className="copyright">
              © {new Date().getFullYear()} Palace Porta Potties. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
