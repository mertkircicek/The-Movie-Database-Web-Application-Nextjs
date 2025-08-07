import React from 'react';
import MediaListPage from '../../components/MediaListPage'; 
import { request } from '../../api/request'; 

const TopRatedTvShowsPage = () => {
  return (
    <MediaListPage 
      mediaType="tv" 
      categoryTitle="Top Rated" 
      fetchPath={request.tvTopRated} 
    />
  );
};

export default TopRatedTvShowsPage;
