/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Next.js 13 ve üzeri için önerilen yöntem remotePatterns kullanmaktır.
    // Bu, daha güvenli ve esnektir.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**', // TMDB'nin resim yolları bu paternle eşleşmeli
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**', // Placeholder resimleri için genel bir patern
      },
    ],
  },
};

// CommonJS syntax'ı yerine ES modül syntax'ı kullanıyoruz
export default nextConfig;
