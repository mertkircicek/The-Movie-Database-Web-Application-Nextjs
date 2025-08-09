import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import tmdb from '../../api/tmdb';
import Container from '../../Layouts/Container';
import MovieCard from '../Movies/MovieCard';
import { useFavorites } from '../../context/FavoritesContext';
import { MoonLoader } from 'react-spinners';

const MediaListPage = ({ mediaType, categoryTitle }) => {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { toggleFavorite, isFavorite } = useFavorites();
    const router = useRouter();

    const [sortBy, setSortBy] = useState('popularity.desc');
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');

    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('TR');
    
    const [watchProviders, setWatchProviders] = useState([]);
    const [selectedProviderId, setSelectedProviderId] = useState('');

    const [appliedFilters, setAppliedFilters] = useState({
        sortBy: 'popularity.desc',
        selectedGenres: [],
        releaseYear: '',
        selectedProviderId: '',
        selectedRegion: 'TR'
    });

    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await tmdb.get(`/watch/providers/regions`, {
                    params: { language: 'en-US' }
                });
                const sortedRegions = response.data.results.sort((a, b) => a.english_name.localeCompare(b.english_name));
                setRegions(sortedRegions);
            } catch (err) {
                console.error("Error fetching regions:", err);
            }
        };
        fetchRegions();
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            if (!mediaType) return;
            try {
                const response = await tmdb.get(`/genre/${mediaType}/list`);
                setGenres(response.data.genres);
            } catch (err) {
                console.error("Error fetching genres:", err);
            }
        };
        fetchGenres();
    }, [mediaType]);

    useEffect(() => {
        const fetchWatchProviders = async () => {
            if (!mediaType || (mediaType !== 'movie' && mediaType !== 'tv') || !selectedRegion) {
                console.log("Skipping fetchWatchProviders due to missing mediaType or selectedRegion", { mediaType, selectedRegion });
                return;
            }
            
            try {
                const response = await tmdb.get(`/watch/providers/${mediaType}`, {
                    params: {
                        language: 'en-US',
                        watch_region: selectedRegion
                    }
                });
                setWatchProviders(response.data.results);
            } catch (err) {
                console.error("Error fetching watch providers:", err);
                setWatchProviders([]);
            }
        };
        fetchWatchProviders();
    }, [mediaType, selectedRegion]);

    useEffect(() => {
        if (!router.isReady || !mediaType) {
            return;
        }

        const fetchMedia = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = {
                    language: 'en-US',
                    page: currentPage,
                    sort_by: appliedFilters.sortBy, 
                    watch_region: appliedFilters.selectedRegion 
                };

                if (appliedFilters.selectedGenres.length > 0) {
                    params.with_genres = appliedFilters.selectedGenres.join(','); 
                }

                if (appliedFilters.releaseYear && appliedFilters.releaseYear.length === 4) { 
                    if (mediaType === 'movie') {
                        params.primary_release_year = appliedFilters.releaseYear;
                    } else if (mediaType === 'tv') {
                        params.first_air_date_year = appliedFilters.releaseYear;
                    }
                }
                
                if (appliedFilters.selectedProviderId) {
                    params.with_watch_providers = appliedFilters.selectedProviderId; 
                }
                
                console.log("Fetching media with params:", params);
                const response = await tmdb.get(`/discover/${mediaType}`, { params });
                
                if (response.data && Array.isArray(response.data.results)) {
                    setMediaItems(response.data.results);
                    setTotalPages(response.data.total_pages > 500 ? 500 : response.data.total_pages);
                } else {
                    setMediaItems([]);
                }
            } catch (err) {
                console.error(`Error fetching ${mediaType} ${categoryTitle}:`, err);
                setError(`Failed to load ${categoryTitle} ${mediaType}s. Please check your API key and network connection.`);
            } finally {
                setLoading(false);
            }
        };

        fetchMedia();
    }, [router.isReady, mediaType, categoryTitle, currentPage, appliedFilters]); 

    const handleApplyFilters = () => {
        setAppliedFilters({
            sortBy,
            selectedGenres,
            releaseYear,
            selectedProviderId,
            selectedRegion
        });
        setCurrentPage(1); 
    };

    const handleClearFilters = () => {
        setSortBy('popularity.desc');
        setSelectedGenres([]);
        setReleaseYear('');
        setSelectedProviderId('');
        setSelectedRegion('TR'); 
        setAppliedFilters({
            sortBy: 'popularity.desc',
            selectedGenres: [],
            releaseYear: '',
            selectedProviderId: '',
            selectedRegion: 'TR'
        });
        setCurrentPage(1);
    };

    const handleGenreChange = (genreId) => {
        setSelectedGenres(prev => 
            prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]
        );
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleYearChange = (e) => {
        const year = e.target.value;
        setReleaseYear(year); 
    };
    
    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedProviderId(''); 
    };

    const handleProviderChange = (e) => {
        setSelectedProviderId(e.target.value);
    };

    const handleCardClick = (item) => {
        const type = item.media_type === 'movie' || item.media_type === 'tv' || item.media_type === 'person' ? item.media_type : mediaType;
        router.push(`/${type}/${item.id}`);
    };

    if (loading) {
        return (
            <Container>
                <div className="min-h-screen flex items-center justify-center">
                    <MoonLoader color="#032541" />
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-xl text-red-500">{error}</div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="min-h-screen py-8 px-4 text-gray-800 bg-gray-100">
                <h1 className="text-4xl font-bold text-center mb-8">{categoryTitle} {mediaType === 'movie' ? 'Movies' : 'TV Shows'}</h1>
                
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/4 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>

                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-2 text-gray-700">Region</h3>
                            <select
                                value={selectedRegion}
                                onChange={handleRegionChange}
                                className="w-full p-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue"
                            >
                                {regions.map((region) => (
                                    <option key={region.iso_3166_1} value={region.iso_3166_1}>
                                        {region.english_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-2 text-gray-700">Where to Watch</h3>
                            <select
                                value={selectedProviderId}
                                onChange={handleProviderChange} 
                                className="w-full p-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue"
                            >
                                <option value="">All Providers</option>
                                {watchProviders.map((provider) => (
                                    <option key={provider.provider_id} value={provider.provider_id}>
                                        {provider.provider_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-2 text-gray-700">Sort Results By</h3>
                            <select 
                                value={sortBy} 
                                onChange={handleSortChange}
                                className="w-full p-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue"
                            >
                                <option value="popularity.desc">Popularity Descending</option>
                                <option value="popularity.asc">Popularity Ascending</option>
                                <option value="vote_average.desc">Vote Average Descending</option>
                                <option value="vote_average.asc">Vote Average Ascending</option>
                                {mediaType === 'movie' ? (
                                    <>
                                        <option value="primary_release_date.desc">Release Date Descending</option>
                                        <option value="primary_release_date.asc">Release Date Ascending</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="first_air_date.desc">First Air Date Descending</option>
                                        <option value="first_air_date.asc">First Air Date Ascending</option>
                                    </>
                                )}
                            </select>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-2 text-gray-700">Genres</h3>
                            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2">
                                {genres.map(genre => (
                                    <button
                                        key={genre.id}
                                        onClick={() => handleGenreChange(genre.id)}
                                        className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 
                                            ${selectedGenres.includes(genre.id) 
                                                ? 'bg-tmdbLightBlue text-white' 
                                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                            }`}
                                    >
                                        {genre.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-2 text-gray-700">{mediaType === 'movie' ? 'Release Year' : 'First Air Year'}</h3>
                            <input
                                type="number"
                                value={releaseYear}
                                onChange={handleYearChange}
                                placeholder="e.g. 2023"
                                className="w-full p-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tmdbLightBlue"
                            />
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={handleApplyFilters}
                                className="w-full px-4 py-2 bg-tmdbLightBlue text-white rounded-md font-semibold hover:bg-tmdbDarkBlue transition-colors"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={handleClearFilters}
                                className="w-full px-4 py-2 bg-gray-400 text-white rounded-md font-semibold hover:bg-gray-500 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-3/4">
                        {mediaItems.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {mediaItems.map((item) => (
                                    <MovieCard
                                        key={item.id}
                                        item={{ ...item, media_type: mediaType }}
                                        isFavorite={isFavorite(item.id)} 
                                        onToggleFavorite={toggleFavorite}
                                        onCardClick={() => handleCardClick(item)} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-600 text-xl mt-8">
                                No {categoryTitle} {mediaType === 'movie' ? 'movies' : 'TV shows'} found with the selected filters.
                            </div>
                        )}
                        
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 space-x-4">
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-tmdbLightBlue text-white rounded-md disabled:opacity-50 hover:bg-tmdbDarkBlue transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-gray-700">Page {currentPage} of {totalPages}</span>
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-tmdbLightBlue text-white rounded-md disabled:opacity-50 hover:bg-tmdbDarkBlue transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MediaListPage;
