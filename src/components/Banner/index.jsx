import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'; // useNavigate yerine useRouter kullanıyoruz
import Container from '../../Layouts/Container';
import SearchInput from '../../baseUI/Input/SearchInput';
import SearchButton from '../../baseUI/Button/SearchButton';

// API anahtarınızı Next.js ortam değişkeni formatına göre güncelliyoruz.
// Client tarafında erişilebilir olması için NEXT_PUBLIC_ öneki kullanılır.
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

const Banner = () => {
    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchInputRef = useRef();
    const router = useRouter(); // useNavigate yerine useRouter kullanıyoruz

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        const query = searchInputRef.current.value;
        if (query.trim()) {
            // navigate yerine router.push kullanıyoruz
            router.push(`/search?query=${encodeURIComponent(query.trim())}`);
            searchInputRef.current.value = ''; 
        }
    };

    useEffect(() => {
        async function fetchBannerImage() {
            try {
                const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR`);
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    const randomMovieIndex = Math.floor(Math.random() * data.results.length);
                    const backdropPath = data.results[randomMovieIndex].backdrop_path;

                    if (backdropPath) {
                        const fullImageUrl = `${IMAGE_BASE_URL}${backdropPath}`;
                        setBackgroundImageUrl(fullImageUrl);
                    } else {
                        setError("Background image for selected movie not found");
                    }
                } else {
                    setError("No popular movies found.");
                }
            } catch (err) {
                console.error("An error occurred while capturing the banner image:", err);
                setError("The background image could not be loaded.");
            } finally {
                setLoading(false);
            }
        }

        fetchBannerImage();
    }, []);

    if (loading) {
        return (
            <div className="h-[300px] bg-gray-700 flex items-center justify-center text-white text-xl">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-[300px] bg-red-700 flex items-center justify-center text-white text-xl">
                {error}
            </div>
        );
    }

    return (
        <div
            className="relative h-[250px] md:h-[300px] lg:h-[400px] bg-cover bg-center text-white"
            style={{
                // TMDB'nin kendi sitesindeki gibi arka plan resminin üzerinde sadece mavi tonlarının görünmesini sağlıyoruz.
                // Arka plan rengini belirgin mavi tonu olarak ayarladık.
                backgroundColor: 'rgb(3, 37, 65)', 
                // Arka plan resmini ekledik.
                backgroundImage: `url('${backgroundImageUrl}')`,
                // Resim ile arka plan rengini karıştırmak için 'multiply' blend modunu kullandık.
                // Bu, resmin dokusunu korurken sadece mavi tonlarının görünmesini sağlar.
                backgroundBlendMode: 'multiply', 
            }}
        >
            <Container>
                <div className="relative z-10 h-full flex flex-col justify-center px-4 pt-6 md:pt-10 lg:pt-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        WELCOME !
                    </h1>
                    <h2 className="mt-4 text-base md:text-lg lg:text-xl font-semibold max-w-2xl text-white/90">
                        Millions of movies, TV shows, and people to discover. Explore now.
                    </h2>

                    <div className="relative mt-20 max-w-8xl">
                        <SearchInput ref={searchInputRef} onKeyDown={handleKeyDown} />
                        <div className="absolute top-0 right-0">
                            <SearchButton onClick={handleSearch} />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Banner;
