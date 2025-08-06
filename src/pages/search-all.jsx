import React from 'react';
import Container from '../Layouts/Container';
import SearchBar from '../components/SearchBar'; // SearchBar'ı import ediyoruz

const SearchAllPage = () => {
  // Bu sayfa, NavBar'daki "search" ikonuna tıklandığında açılan
  // genel arama çubuğunun veya daha kapsamlı bir arama sonuçları sayfasının
  // hedefi olabilir.
  // Burada isDismissible'ı false bırakıyoruz çünkü bu, bir sayfa olarak açılıyor.
  const handleSearchSubmit = (query) => {
    // Burada arama sorgusunu işleyebilirsiniz, örneğin başka bir arama sonuçları sayfasına yönlendirme
    console.log("Full page search for:", query);
    // router.push(`/search?query=${encodeURIComponent(query)}`); gibi bir yönlendirme eklenebilir
  };

  return (
    <Container>
      <div className="min-h-screen pt-8 text-white flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold text-center">Comprehensive Search</h1>
        <p className="text-center text-gray-400 mt-4 mb-8">Search across all movies, TV shows, and people.</p>
        {/* Bu sayfada da bir arama çubuğu gösterebiliriz */}
        <div className="w-full max-w-2xl">
          <SearchBar onSubmit={handleSearchSubmit} isDismissible={false} />
        </div>
      </div>
    </Container>
  );
};

export default SearchAllPage;
