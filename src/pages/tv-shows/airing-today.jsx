import React from 'react';
import MediaListPage from '../../components/MediaListPage';
import { request } from '../../api/request';

const AiringTodayTvShowsPage = () => {
  return (
    <MediaListPage 
      mediaType="tv"
      categoryTitle="Airing Today" 
      fetchPath={request.tvAiringToday} 
    />
  );
};

export default AiringTodayTvShowsPage;
