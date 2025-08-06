import React from 'react';
import Container from '../Layouts/Container'; // Layouts klasörünüzden Container'ı import edin
import Section from '../Layouts/Section'; // Section bileşenini import ediyoruz
import MovieList from '../components/Movies/MovieList'; // MovieList bileşenini import ediyoruz (TV show'lar için de kullanılabiliyor)

const TvShowsPage = () => {
  // Bu sayfada tüm TV şovlarını listeleyebilir veya farklı kategoriler sunabilirsiniz.
  // Şimdilik popüler TV şovlarını listeleyelim.
  const [selectedCategory, setSelectedCategory] = React.useState("On TV"); // Varsayılan kategori
  const categories = ["Streaming", "On TV", "For Rent", "In Theaters"]; // Request.jsx'teki kategoriler

  const handleCategoryChange = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };

  return (
    <Container>
      <div className="min-h-screen pt-8 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">All TV Shows</h1>
        
        <Section
          title="Explore TV Shows"
          items={categories}
          onToogle={handleCategoryChange} 
          selectedItem={selectedCategory}
        >
          {/* MovieList fetch prop'u ile TV şovlarını getirebilir */}
          <MovieList fetch={selectedCategory} />
        </Section>
      </div>
    </Container>
  );
};

export default TvShowsPage;
