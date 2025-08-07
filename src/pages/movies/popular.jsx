import React from 'react';
import MediaListPage from '../../components/MediaListPage'; 
import { request } from '../../api/request'; 

const PopularMoviesPage = () => {
  return (
    <MediaListPage 
      mediaType="movie" 
      categoryTitle="Popular" 
      fetchPath={request.moviePopular} 
    />
  );
};

export default PopularMoviesPage;
