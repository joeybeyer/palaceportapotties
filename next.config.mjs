/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/portable-toilet-rental-new-york/',
        destination: '/porta-potties-new-york/',
        permanent: true,
      },
      {
        source: '/portable-toilet-rental-denver/',
        destination: '/porta-potties-denver/',
        permanent: true,
      },
      {
        source: '/portable-toilet-rental-chicago/',
        destination: '/porta-potties-chicago/',
        permanent: true,
      },
      {
        source: '/portable-toilet-rental-long-beach/',
        destination: '/porta-potties-long-beach/',
        permanent: true,
      },
      {
        source: '/portable-toilet-rental-los-angeles/',
        destination: '/porta-potties-los-angeles/',
        permanent: true,
      },
      {
        source: '/portable-toilet-rental-north-miami/',
        destination: '/porta-potties-north-miami/',
        permanent: true,
      },
      {
        source: '/portable-toilet-rental-plano/',
        destination: '/porta-potties-plano/',
        permanent: true,
      },
      {
        source: '/portable-toilet-rental-doral/',
        destination: '/porta-potties-doral/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
