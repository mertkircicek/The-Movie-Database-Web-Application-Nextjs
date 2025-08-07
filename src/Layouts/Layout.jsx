import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; 
import NavBar from './NavBar';
import SearchBar from '../components/SearchBar';
import { useSearch } from '../context/SearchContext';

const Layout = ({ children }) => {
    const { isSearchOpen, closeSearch } = useSearch();
    const router = useRouter(); 

    
    const handleSearchSubmit = (query) => {
        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query.trim())}`);
            closeSearch(); 
        }
    };

    useEffect(() => {
        if (router.pathname === '/' && isSearchOpen) {
            closeSearch();
        }
    }, [router.pathname, closeSearch, isSearchOpen]); 

    const shouldShowSearchBarInLayout = isSearchOpen && router.pathname !== '/'; 

    return (
        <div>
            <NavBar />
            <div className={`pt-2 transition-all duration-300 ${shouldShowSearchBarInLayout ? 'block' : 'hidden'}`}>
                <SearchBar onSubmit={handleSearchSubmit} onClose={closeSearch} isDismissible={true} />
            </div>
            <div> 
                {children} 
            </div>
        </div>
    );
};

export default Layout;
