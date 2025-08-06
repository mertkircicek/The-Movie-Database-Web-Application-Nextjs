import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // useLocation ve useNavigate yerine useRouter kullanıyoruz
import NavBar from './NavBar';
import SearchBar from '../components/SearchBar';
import { useSearch } from '../context/SearchContext';

// Layout bileşeni, sayfa içeriğini children prop'u olarak alacak.
const Layout = ({ children }) => {
    const { isSearchOpen, closeSearch } = useSearch();
    const router = useRouter(); // useRouter hook'unu kullanıyoruz

    // Arama yapıldığında veya kapatıldığında çağrılacak fonksiyon
    const handleSearchSubmit = (query) => {
        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query.trim())}`);
            closeSearch(); // Arama yapıldıktan sonra arama çubuğunu kapat
        }
    };

    // Sayfa değiştiğinde, eğer ana sayfaya dönülürse arama çubuğunu gizle
    useEffect(() => {
        // router.pathname kullanarak mevcut sayfanın yolunu alıyoruz
        if (router.pathname === '/' && isSearchOpen) {
            // Eğer ana sayfadaysak ve arama çubuğu açıksa, kapat.
            // Bu, diğer sayfalardan ana sayfaya dönüldüğünde Layout'taki SearchBar'ın gizlenmesini sağlar.
            closeSearch();
        }
    }, [router.pathname, closeSearch, isSearchOpen]); // router.pathname bağımlılık olarak eklendi

    // Layout içinde gösterilecek SearchBar (ana sayfa dışındaki sayfalar için)
    // isSearchOpen true ise VE ana sayfada değilsek görünür olacak
    const shouldShowSearchBarInLayout = isSearchOpen && router.pathname !== '/'; // router.pathname kullanıldı

    return (
        <div>
            <NavBar />
            
            {/* Layout içinde gösterilecek SearchBar (ana sayfa dışındaki sayfalar için) */}
            <div className={`pt-2 transition-all duration-300 ${shouldShowSearchBarInLayout ? 'block' : 'hidden'}`}>
                {/* isDismissible={true} prop'unu ekliyoruz ki dışarı tıklayınca kapansın */}
                <SearchBar onSubmit={handleSearchSubmit} onClose={closeSearch} isDismissible={true} />
            </div>

            {/* Sayfa içeriği burada render edilecek. NavBar'ın yüksekliği (h-20) kadar üstten boşluk bırakıyoruz ki içerik NavBar'ın altında kalmasın. */}
            <div className="pt-20"> 
                {children} {/* Outlet yerine children prop'unu render ediyoruz */}
            </div>
        </div>
    );
};

export default Layout;
