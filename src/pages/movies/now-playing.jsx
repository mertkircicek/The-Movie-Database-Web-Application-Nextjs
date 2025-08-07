import React from 'react';
import MediaListPage from '../../components/MediaListPage'; 
import { request } from '../../api/request'; 

const NowPlayingMoviesPage = () => {
  return (
    <MediaListPage 
      mediaType="movie" 
      categoryTitle="Now Playing"
      fetchPath={request.movieNowPlaying} 
    />
  );
};

export default NowPlayingMoviesPage;
