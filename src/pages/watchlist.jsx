import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

const WatchlistPage = () => {
    const router = useRouter();
    const [watchlist, setWatchlist] = useState([]);
    const [filteredWatchlist, setFilteredWatchlist] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [activeFilter, setActiveFilter] = useState('All');

   
    useEffect(() => {
        try {
            const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
            setWatchlist(savedWatchlist);

            const counts = savedWatchlist.reduce((acc, item) => {
                const mediaType = item.media_type;
                if (mediaType in acc) {
                    acc[mediaType]++;
                } else {
                    acc[mediaType] = 1;
                }
                return acc;
            }, {});

            setCategoryCounts({
                All: savedWatchlist.length,
                ...counts
            });

            if (activeFilter === 'All') {
                setFilteredWatchlist(savedWatchlist);
            } else {
                setFilteredWatchlist(savedWatchlist.filter(item => item.media_type === activeFilter));
            }
        } catch (error) {
            console.error("Error loading watchlist from localStorage", error);
            setWatchlist([]);
            setFilteredWatchlist([]);
            setCategoryCounts({ All: 0 });
        }
    }, [activeFilter]); 

    const getTitle = (item) => {
        return item.title || item.name;
    };

    const getPosterUrl = (path, size = 'w200') => {
        if (!path) return 'https://via.placeholder.com/200x300?text=No+Image';
        return `https://image.tmdb.org/t/p/${size}${path}`;
    };

    const getReleaseDate = (item) => {
        const date = item.release_date || item.first_air_date;
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleResultClick = (item) => {
        const { media_type, id } = item;
        router.push(`/${media_type}/${id}`);
    };

    if (watchlist.length === 0) {
        return (
            <div className="min-h-screen bg-tmdbDarkBlue text-white flex items-center justify-center">
                <div className="text-xl p-6 bg-gray-800 rounded-lg shadow-xl text-center">
                    <p>Your watchlist is empty.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-4 px-6 py-2 bg-tmdbLightGreen hover:bg-tmdbLightBlue text-white font-bold rounded-full transition-colors duration-200"
                    >
                        Explore Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-black hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700"
                    >
                        <FaArrowLeft />
                        <span className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-3xl font-bold text-center flex-grow">MY WATCHLIST</h1>
                    <div className="w-10 sm:w-20"></div> 
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1 p-4 bg-gray-600 rounded-lg shadow-lg h-fit">
                        <h2 className="text-2xl font-bold mb-4 text-white">Categories</h2>
                        <ul className="space-y-2">
                            {['All', 'movie', 'tv'].map(filter => ( 
                                <li
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`flex justify-between items-center px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
                                        activeFilter === filter
                                            ? 'bg-tmdbLightBlue font-bold'
                                            : 'hover:bg-gray-700'
                                    }`}
                                >
                                    <span className="capitalize">
                                        {filter === 'All' ? 'All' : filter === 'movie' ? 'Movies' : 'TV Shows'}
                                    </span>
                                    <span className="bg-gray-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                        {categoryCounts[filter] || 0}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        {filteredWatchlist.length === 0 ? (
                            <div className="text-xl text-center mt-8 text-gray-400">
                                No items found in this category in your watchlist.
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredWatchlist.map((item) => (
                                    <div
                                        key={`${item.media_type}-${item.id}`}
                                        className="flex bg-tmdbDarkBlue rounded-lg shadow-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                                        onClick={() => handleResultClick(item)}
                                    > 
                                        <div className="flex-shrink-0 w-24 h-36 relative">
                                            <Image
                                                src={getPosterUrl(item.poster_path || item.profile_path, 'w185')}
                                                alt={getTitle(item)}
                                                layout="fill"
                                                objectFit="cover"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4 flex-1">
                                            <h3 className="text-xl font-bold text-white mb-1">{getTitle(item)}</h3>
                                            <p className="text-sm text-gray-300 mb-2">
                                                {item.media_type === 'movie' ? 'Movie' : 'TV Show'} | {getReleaseDate(item)}
                                            </p>
                                            <p className="text-gray-300 text-sm line-clamp-3">
                                                {item.overview || 'Overview not available.'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchlistPage;
