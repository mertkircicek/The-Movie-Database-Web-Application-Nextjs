import React from 'react';
import MediaListPage from '../../components/MediaListPage';
import { request } from '../../api/request';

const OnTvShowsPage = () => {
  return (
    <MediaListPage 
      mediaType="tv"
      categoryTitle="On TV" // Sayfa başlığı
      fetchPath={request.tvOnTheAir} // 'On TV' için doğru API yolu
    />
  );
};

export default OnTvShowsPage;
