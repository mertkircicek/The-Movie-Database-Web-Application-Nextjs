import React from 'react';
import MediaListPage from '../../components/MediaListPage'; 
import { request } from '../../api/request'; 

const UpcomingMoviesPage = () => {
  return (
    <MediaListPage 
      mediaType="movie" 
      categoryTitle="Upcoming" 
      fetchPath={request.movieUpcoming} 
    />
  );
};

export default UpcomingMoviesPage;
