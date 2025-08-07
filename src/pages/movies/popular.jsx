import React from 'react';
import MediaListPage from '../../components/MediaListPage'; // MediaListPage bileşenini import ediyoruz
import { request } from '../../api/request'; // API yollarını içeren request objesini import ediyoruz

const PopularMoviesPage = () => {
  return (
    <MediaListPage 
      mediaType="movie" // Bu sayfanın filmleri listeleyeceğini belirtiyoruz
      categoryTitle="Popular" // Sayfanın başlığını belirtiyoruz (UI'da gösterilecek)
      fetchPath={request.moviePopular} // Bu kategori için API yolunu request.jsx'ten alıyoruz
    />
  );
};

export default PopularMoviesPage;
