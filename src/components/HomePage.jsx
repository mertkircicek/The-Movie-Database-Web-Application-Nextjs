import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import SearchBar from './SearchBar'; 
import Banner from './Banner';
import Container from '../Layouts/Container';
import Section from '../Layouts/Section'; 
import MovieList from './Movies/MovieList';
import { request } from '../api/request'; 

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Streaming");
    const router = useRouter(); 

    
    const categoryMap = {
        "Streaming": "moviePopular", 
        "On TV": "tvOnTheAir",      
        "For Rent": "movieUpcoming", 
        "In Theaters": "movieNowPlaying" 
    };

    const categories = ["Streaming", "On TV", "For Rent", "In Theaters"];

    const handleCategoryChange = (selectedValue) => {
        setSelectedCategory(selectedValue);
    };

    const handleHomePageSearchSubmit = (query) => {
        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <>
            <SearchBar onSubmit={handleHomePageSearchSubmit} /> 

            <Container>
                <div> 
                    <Banner />
                    <Section
                        title="What's Popular"
                        items={categories}
                        onToogle={handleCategoryChange} 
                        selectedItem={selectedCategory}
                    >
                        <MovieList fetch={categoryMap[selectedCategory]} />
                    </Section>
                </div>
            </Container>
        </>
    );
};

export default HomePage;
