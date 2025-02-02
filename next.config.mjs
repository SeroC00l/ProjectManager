/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'gnfxfadpsqdtfctiizbl.supabase.co',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
