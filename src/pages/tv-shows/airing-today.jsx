import React from 'react';
import MediaListPage from '../../components/MediaListPage';
import { request } from '../../api/request';

const AiringTodayTvShowsPage = () => {
  return (
    <MediaListPage 
      mediaType="tv"
      categoryTitle="Airing Today" // Sayfa başlığı
      fetchPath={request.tvAiringToday} // 'Airing Today' için doğru API yolu
    />
  );
};

export default AiringTodayTvShowsPage;
