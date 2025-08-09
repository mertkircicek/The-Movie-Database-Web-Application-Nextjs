import React from 'react';
import Layout from '../Layouts/Layout'; 
import { SearchProvider } from '../context/SearchContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css'; 

function App({ Component, pageProps }) { 
    return (
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
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </FavoritesProvider>
        </SearchProvider>
    );
}

export default App;
