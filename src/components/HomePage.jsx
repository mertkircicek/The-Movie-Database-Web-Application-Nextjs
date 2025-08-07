import React, { useState } from 'react';
import { useRouter } from 'next/router'; // useRouter kullanıyoruz
import SearchBar from './SearchBar'; 
import Banner from './Banner';
import Container from '../Layouts/Container';
import Section from '../Layouts/Section'; 
import MovieList from './Movies/MovieList';
import { request } from '../api/request'; // request objesini import ediyoruz

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Streaming");
    const router = useRouter(); // useRouter kullanıyoruz

    // Kategori isimlerini API isteklerindeki karşılıklarına eşliyoruz
    // Bu map, request.js'teki API anahtarlarını kullanır.
    const categoryMap = {
        "Streaming": "moviePopular", // Popüler filmler için
        "On TV": "tvOnTheAir",      // TV'de yayınlananlar için
        "For Rent": "movieUpcoming", // Filmler için "Yakında" (TMDB'de "For Rent" için doğrudan bir discover endpoint'i yok)
        "In Theaters": "movieNowPlaying" // Filmler için "Şimdi Oynayanlar"
    };

    const categories = ["Streaming", "On TV", "For Rent", "In Theaters"];

    const handleCategoryChange = (selectedValue) => {
        setSelectedCategory(selectedValue);
    };

    // Ana sayfadaki SearchBar için arama gönderme işlevi
    const handleHomePageSearchSubmit = (query) => {
        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query.trim())}`);
            // Ana sayfadaki SearchBar'ın kapanmasına gerek yok, çünkü o her zaman görünür
        }
    };

    return (
        <>
            {/* HomePage'deki SearchBar NavBar'ın hemen altında olacak.
                isDismissible prop'unu geçmiyoruz (varsayılan false). */}
            <SearchBar onSubmit={handleHomePageSearchSubmit} /> 

            <Container>
                {/* Bu div'e pt-20 ekleyerek Banner ve diğer içeriklerin NavBar ve SearchBar'ın altından başlamasını sağlıyoruz */}
                <div> 
                    <Banner />
                    <Section
                        title="What's Popular"
                        items={categories}
                        onToogle={handleCategoryChange} 
                        selectedItem={selectedCategory}
                    >
                        {/* MovieList'e artık request objesindeki doğru anahtarı gönderiyoruz */}
                        <MovieList fetch={categoryMap[selectedCategory]} />
                    </Section>
                </div>
            </Container>
        </>
    );
};

export default HomePage;
