import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; 

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Accept: "application/json",
    },
    params: {
        api_key: API_KEY 
    }
});
