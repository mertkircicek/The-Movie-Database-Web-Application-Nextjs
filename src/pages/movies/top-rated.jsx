import React from 'react';
import MediaListPage from '../../components/MediaListPage'; 
import { request } from '../../api/request'; 

const TopRatedMoviesPage = () => {
  return (
    <MediaListPage 
      mediaType="movie" 
      categoryTitle="Top Rated" 
      fetchPath={request.movieTopRated} 
    />
  );
};

export default TopRatedMoviesPage;
