import React from 'react';
import Link from 'next/link'; // next/link'ten import ediyoruz
// react-fontawesome yerine react-icons'tan gerekli ikonları import ediyoruz
import { FaPlus, FaStar, FaSearch } from 'react-icons/fa'; 
import { useSearch } from '../../context/SearchContext';

const NavBarList = ({items}) => {
    const { toggleSearch } = useSearch();

    const getItem = (item) => {
        let itemList = null;
        switch(item.type) {
            case 'logo':
                itemList = (
                    <Link href="/">
                        <img src={item.src} className="h-5 min-w-[154px]" alt={item.name}/>
                    </Link>
                );
                break;
            case 'language':
                itemList = <p className="border-white border-solid rounded-[3px] py-[3px] px-[5px] border-[1px] hover:bg-white hover:text-tmdbDarkBlue">{item.name}</p>
                break;
            case 'icon':
                // Arama ikonu için özel durum: Link yerine buton kullanıyoruz
                if (item.name === 'search') {
                    itemList = (
                        <button onClick={toggleSearch} className="focus:outline-none">
                            {/* Boyutlandırma için Tailwind sınıfları kullanıyoruz */}
                            <FaSearch className="w-5 h-5" /> 
                        </button>
                    );
                } else if (item.name === 'plus') {
                    itemList = (
                        <Link href={item.path}>
                            {/* Boyutlandırma için Tailwind sınıfları kullanıyoruz */}
                            <FaPlus className="w-5 h-5" /> 
                        </Link>
                    );
                } else if (item.name === 'star') {
                    itemList = (
                        <Link href={item.path}>
                            {/* Boyutlandırma için Tailwind sınıfları kullanıyoruz */}
                            <FaStar className="w-5 h-5" /> 
                        </Link>
                    );
                }
                break;
            case 'link': 
                itemList = (
                    <Link href={item.path} className="hover:text-gray-300 transition-colors">
                        {item.name}
                    </Link>
                );
                break;
            default:
                itemList = <p>{item.name}</p>
                break;
        }
        return itemList;
    };

    return (
        <ul className="flex gap-7 items-center">
            {items.map(item => {
                return <li key={item.name}>{getItem(item)}</li>
            })}
        </ul>
    );
};

export default NavBarList;
