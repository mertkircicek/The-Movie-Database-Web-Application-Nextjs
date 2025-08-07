import React from 'react';
import Container from '../Layouts/Container';
import SearchBar from '../components/SearchBar'; 

const SearchAllPage = () => {
  const handleSearchSubmit = (query) => {
    console.log("Full page search for:", query);
  };

  return (
    <Container>
      <div className="min-h-screen pt-8 text-white flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold text-center">Comprehensive Search</h1>
        <p className="text-center text-gray-400 mt-4 mb-8">Search across all movies, TV shows, and people.</p>
        <div className="w-full max-w-2xl">
          <SearchBar onSubmit={handleSearchSubmit} isDismissible={false} />
        </div>
      </div>
    </Container>
  );
};

export default SearchAllPage;
