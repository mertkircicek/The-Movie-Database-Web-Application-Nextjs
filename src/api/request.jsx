const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; 

export const request = {
    baseURL: 'https://api.themoviedb.org/3',
    apiKey: API_KEY,

    //Movie için API yolları
    moviePopular: '/movie/popular',
    movieNowPlaying: '/movie/now_playing',
    movieUpcoming: '/movie/upcoming',
    movieTopRated: '/movie/top_rated',

    // TV Show için API yolları
    tvPopular: '/tv/popular',
    tvAiringToday: '/tv/airing_today', 
    tvOnTheAir: '/tv/on_the_air',     
    tvTopRated: '/tv/top_rated',

    // Türler için API yolları
    genres: {
        movie: '/genre/movie/list',
        tv: '/genre/tv/list',
    },

    // İzleme sağlayıcıları için API yolları
    watchProvidersRegions: '/watch/providers/regions',
};
