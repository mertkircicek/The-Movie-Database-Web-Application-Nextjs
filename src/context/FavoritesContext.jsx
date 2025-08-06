import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Firebase importları kaldırıldı, çünkü artık localStorage kullanıyoruz
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';

const FavoritesContext = createContext();

export const useFavorites = () => {
    return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Favorileri localStorage'dan yükle
    useEffect(() => {
        try {
            const savedFavorites = localStorage.getItem('favorites');
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error("Error loading favorites from localStorage", error);
            setFavorites([]); // Hata durumunda favorileri sıfırla
        }
    }, []); // Sadece bir kez, bileşen yüklendiğinde çalışır

    // Favoriler değiştiğinde localStorage'a kaydet
    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Error saving favorites to localStorage", error);
        }
    }, [favorites]); // favorites state'i her değiştiğinde çalışır

    const toggleFavorite = (item) => {
        const isCurrentlyFavorite = favorites.some(fav => fav.id === item.id);
        let updatedFavorites;

        if (isCurrentlyFavorite) {
            updatedFavorites = favorites.filter(fav => fav.id !== item.id);
            toast.success(`${item.name || item.title} removed from favorites.`);
        } else {
            updatedFavorites = [...favorites, item];
            toast.success(`${item.name || item.title} added to favorites!`);
        }
        setFavorites(updatedFavorites); // State'i güncelle, bu da ikinci useEffect'i tetikleyerek localStorage'a kaydeder
    };

    const isFavorite = (id) => {
        return favorites.some(fav => fav.id === id);
    };

    const value = {
        favorites,
        toggleFavorite,
        isFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};
