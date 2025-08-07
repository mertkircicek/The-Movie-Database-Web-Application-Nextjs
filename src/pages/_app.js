import React from 'react';
// React Router DOM importları Next.js'in sayfa tabanlı routing'i için kullanılmaz.
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Sayfa bileşenleriniz (Bunlar doğrudan _app.jsx'te import edilmez, Next.js bunları otomatik olarak pages klasöründen yükler)
// import HomePage from './components/HomePage';
// import MovieDetail from './components/MovieDetail';
// import TVDetail from './components/TVDetail';
// import PersonDetail from './components/PersonDetail';
// import SearchResultsPage from './components/SearchResultsPage'; 
// import FavoritesPage from './components/FavoritesPage';
// import WatchlistPage from './pages/watchlist'; 
// import WatchedPage from './pages/watched';     

// Layout ve Context'leri import ediyoruz
import Layout from '../Layouts/Layout'; // Layout bileşeninizin yolu düzeltildi
import { SearchProvider } from '../context/SearchContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { Toaster } from 'react-hot-toast';

// Global CSS dosyanızı import etmeyi unutmayın
import '../styles/globals.css'; 

// Next.js'te _app.js bileşeni, tüm sayfaları sarmalar
function App({ Component, pageProps }) { // Next.js, mevcut sayfa bileşenini Component prop'u olarak sağlar
    return (
        // BrowserRouter, Routes, Route artık kullanılmayacak
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

export default App;
