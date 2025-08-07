import React from 'react';
import MediaListPage from '../../components/MediaListPage'; // MediaListPage bileşenini import ediyoruz
import { request } from '../../api/request'; // API yollarını içeren request objesini import ediyoruz

const UpcomingMoviesPage = () => {
  return (
    <MediaListPage 
      mediaType="movie" // Bu sayfanın filmleri listeleyeceğini belirtiyoruz
      categoryTitle="Upcoming" // Sayfanın başlığını belirtiyoruz (UI'da gösterilecek)
      fetchPath={request.movieUpcoming} // Bu kategori için API yolunu request.jsx'ten alıyoruz
    />
  );
};

export default UpcomingMoviesPage;
