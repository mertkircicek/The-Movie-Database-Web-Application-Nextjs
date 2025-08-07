import React from 'react';
import MediaListPage from '../../components/MediaListPage';
import { request } from '../../api/request';

const OnTvShowsPage = () => {
  return (
    <MediaListPage 
      mediaType="tv"
      categoryTitle="On TV" 
      fetchPath={request.tvOnTheAir} 
    />
  );
};

export default OnTvShowsPage;
