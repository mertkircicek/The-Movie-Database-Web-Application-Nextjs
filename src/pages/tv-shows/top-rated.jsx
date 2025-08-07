import React from 'react';
import MediaListPage from '../../components/MediaListPage'; // MediaListPage bileşenini import ediyoruz
import { request } from '../../api/request'; // API yollarını içeren request objesini import ediyoruz

const TopRatedTvShowsPage = () => {
  return (
    <MediaListPage 
      mediaType="tv" // Bu sayfanın TV şovlarını listeleyeceğini belirtiyoruz
      categoryTitle="Top Rated" // Sayfanın başlığını belirtiyoruz (UI'da gösterilecek)
      fetchPath={request.tvTopRated} // Bu kategori için API yolunu request.jsx'ten alıyoruz
    />
  );
};

export default TopRatedTvShowsPage;
