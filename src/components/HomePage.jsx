import React, { useState } from 'react';
import { useRouter } from 'next/router'; // useNavigate yerine useRouter kullanıyoruz
import SearchBar from './SearchBar'; 
import Banner from './Banner';
import Container from '../Layouts/Container';
import Section from '../Layouts/Section'; 
import MovieList from './Movies/MovieList';
// useSearch hook'u bu bileşende doğrudan kullanılmıyor çünkü SearchBar'ın ana sayfadaki
// görünürlüğü Layout tarafından değil, doğrudan render edilmesiyle sağlanıyor.
// import { useSearch } from '../context/SearchContext'; 

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Streaming");
    const router = useRouter(); // useNavigate yerine useRouter kullanıyoruz

    const categories = ["Streaming", "On TV", "For Rent", "In Theaters"];

    const handleCategoryChange = (selectedValue) => {
        setSelectedCategory(selectedValue);
    };

    // Ana sayfadaki SearchBar için arama gönderme işlevi
    const handleHomePageSearchSubmit = (query) => {
        if (query.trim()) {
            // navigate yerine router.push kullanıyoruz
            router.push(`/search?query=${encodeURIComponent(query.trim())}`);
            // Ana sayfadaki SearchBar'ın kapanmasına gerek yok, çünkü o her zaman görünür
        }
    };

    return (
        <>
            {/* HomePage'deki SearchBar her zaman görünür olacak ve dışarı tıklamayla kapanmayacak.
                isDismissible prop'unu geçmiyoruz (varsayılan false). */}
            <SearchBar onSubmit={handleHomePageSearchSubmit} /> 

            <Container>
                <Banner />
                <Section
                    title="What's Popular"
                    items={categories}
                    onToogle={handleCategoryChange} 
                    selectedItem={selectedCategory}
                >
                    <MovieList fetch={selectedCategory} />
                </Section>
            </Container>
        </>
    );
};

export default HomePage;
