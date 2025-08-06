import React from 'react';
// React Router DOM import'ları artık kullanılmayacak
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Next.js'te sayfalar dosya tabanlı routing ile yönetilir,
// bu yüzden HomePage, MovieDetail vb. doğrudan burada import edilmez.
// Onlar kendi pages dosyalarında import edilecek.
// import HomePage from './components/HomePage';
// import MovieDetail from './components/MovieDetail';
// import TVDetail from './components/TVDetail';
// import PersonDetail from './components/PersonDetail';
// import SearchResultsPage from './components/SearchResultsPage'; 
// import FavoritesPage from './components/FavoritesPage';

// Layout ve Context'leri import ediyoruz
import Layout from '../Layouts/Layout'; // Layout bileşeninizin yolu
import { SearchProvider } from '../context/SearchContext'; 
import { FavoritesProvider } from '../context/FavoritesContext';
import { Toaster } from 'react-hot-toast';

// Global CSS dosyanızı import etmeyi unutmayın
import '../styles/globals.css'; 

// Next.js'te _app.js bileşeni, tüm sayfaları sarmalar
function MyApp({ Component, pageProps }) {
    return (
        // BrowserRouter artık kullanılmayacak
        <SearchProvider> 
            <FavoritesProvider>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            style: {
                                background: 'green',
                                color: 'white',
                            },
                        },
                    }}
                />
                {/* Layout bileşenini tüm sayfaları sarmalayacak şekilde kullanıyoruz */}
                {/* Next.js'te <Routes> ve <Route> yerine Component prop'u kullanılır */}
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </FavoritesProvider>
        </SearchProvider>
    );
}

export default MyApp;
