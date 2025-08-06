import React from 'react';
import Container from '../Layouts/Container'; // Layouts klasörünüzden Container'ı import edin
import Section from '../Layouts/Section'; // Section bileşenini import ediyoruz
import MovieList from '../components/Movies/MovieList'; // MovieList bileşenini import ediyoruz

const MoviesPage = () => {
  // Bu sayfada tüm filmleri listeleyebilir veya farklı kategoriler sunabilirsiniz.
  // Şimdilik popüler filmleri listeleyelim.
  const [selectedCategory, setSelectedCategory] = React.useState("Streaming"); // Varsayılan kategori
  const categories = ["Streaming", "On TV", "For Rent", "In Theaters"]; // Request.jsx'teki kategoriler

  const handleCategoryChange = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };

  return (
    <Container>
      <div className="min-h-screen pt-8 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">All Movies</h1>
        
        {/* HomePage'deki gibi bir Section ve MovieList kullanabiliriz */}
        <Section
          title="Explore Movies"
          items={categories}
          onToogle={handleCategoryChange} 
          selectedItem={selectedCategory}
        >
          <MovieList fetch={selectedCategory} />
        </Section>
      </div>
    </Container>
  );
};

export default MoviesPage;
