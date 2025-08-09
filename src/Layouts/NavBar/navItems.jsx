export const navItemsLeft = [
    {
        name: 'logo',
        type: 'logo',
        src: "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
    },
    {
        name: 'Movies',
        type: 'link', 
        path: '/movies', 
        subItems: [
            { name: 'Popular', path: '/movies/popular' },
            { name: 'Now Playing', path: '/movies/now-playing' }, 
            { name: 'Upcoming', path: '/movies/upcoming' },
            { name: 'Top Rated', path: '/movies/top-rated' }
        ]
    },
    {
        name: 'TV Shows',
        type: 'link',
        path: '/tv-shows', 
        subItems: [
            { name: 'Popular', path: '/tv-shows/popular' },
            { name: 'Now Playing', path: '/tv-shows/now-playing' }, 
            { name: 'Upcoming', path: '/tv-shows/upcoming' }, 
            { name: 'Top Rated', path: '/tv-shows/top-rated' }
        ]
    },
    {
        name: 'People',
        type: 'link',
        path: '/people'
    },
    {
        name: 'More',
        type: 'link',
        path: '/more', 
        subItems: [
            { name: 'Watchlist', path: '/watchlist' }, 
            { name: 'Watched', path: '/watched' } 
        ]
    }
];

export const navItemsRight = [
    {
        name: 'plus',
        type: 'icon',
        path: '/add' 
    },
    {
        name: 'EN',
        type: 'language'
    },
    {
        name: 'Login',
        type: 'link',
        path: '/login'
    },
    {
        name: 'Join TMDB',
        type: 'link',
        path: '/join'
    },
    {
        name: 'star', 
        type: 'icon',
        path: '/favorites' 
    },
    {
        name: 'search',
        type: 'icon',
        path: '/search-all' 
    }
];
