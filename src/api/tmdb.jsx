// Bu dosyayı yeni Next.js projenizin src/api/ klasörüne yerleştirin.

import axios from 'axios';

// API anahtarınızı Next.js ortam değişkeni formatına göre güncelliyoruz.
// Client tarafında erişilebilir olması için NEXT_PUBLIC_ öneki kullanılır.
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
