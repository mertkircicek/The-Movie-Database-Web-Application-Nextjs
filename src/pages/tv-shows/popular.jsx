import React from 'react';
import MediaListPage from '../../components/MediaListPage'; 
import { request } from '../../api/request'; 

const PopularTvShowsPage = () => {
  return (
    <MediaListPage 
      mediaType="tv" 
      categoryTitle="Popular"
      fetchPath={request.tvPopular} 
    />
  );
};

export default PopularTvShowsPage;
