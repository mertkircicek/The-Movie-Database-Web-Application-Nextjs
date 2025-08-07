// Bu dosya, TMDB API'sinin farklı endpoint'lerini ve temel yapılandırmasını içerir.

// API anahtarınızı Next.js ortam değişkeni formatına göre güncelliyoruz.
// Client tarafında erişilebilir olması için NEXT_PUBLIC_ öneki kullanılır.
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; 

export const request = {
    baseURL: 'https://api.themoviedb.org/3',
    apiKey: API_KEY,

    // Filmler için API yolları
    moviePopular: '/movie/popular',
    movieNowPlaying: '/movie/now_playing',
    movieUpcoming: '/movie/upcoming',
    movieTopRated: '/movie/top_rated',

    // TV Şovları için API yolları
    tvPopular: '/tv/popular',
    tvAiringToday: '/tv/airing_today', // 'Airing Today' için doğru endpoint
    tvOnTheAir: '/tv/on_the_air',     // 'On TV' için doğru endpoint (TMDB'de 'On The Air' olarak geçer)
    tvTopRated: '/tv/top_rated',

    // Türler için API yolları
    genres: {
        movie: '/genre/movie/list',
        tv: '/genre/tv/list',
    },

    // İzleme sağlayıcıları için API yolları
    watchProvidersRegions: '/watch/providers/regions',
};
