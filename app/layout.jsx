export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { getAllLocations } from '@/lib/db';
import Link from 'next/link';
import Header from '@/components/Header';
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
      <head>
        {/* Microsoft Clarity — replace CLARITY_ID with your project ID from clarity.microsoft.com */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`,
            }}
          />
        )}
      </head>
      <body>
        <Header locations={locations} />

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
            <p>
              <a href="tel:+18887085771">(888) 708-5771</a> — Available 24/7
            </p>
            <p className="copyright">
              © {new Date().getFullYear()} Palace Porta Potties. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
