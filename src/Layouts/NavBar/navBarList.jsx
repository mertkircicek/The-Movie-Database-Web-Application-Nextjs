import React, { useState, useRef } from 'react'; // useRef'i import ettik
import Link from 'next/link';
import { FaPlus, FaStar, FaSearch } from 'react-icons/fa'; 
import { useSearch } from '../../context/SearchContext';

const NavBarList = ({items}) => {
    const { toggleSearch } = useSearch();
    const [activePopover, setActivePopover] = useState(null); // State to manage which popover is open
    const leaveTimeoutRef = useRef(null); // Timeout ID'sini saklamak için useRef kullanıyoruz

    const handleMouseEnter = (itemName) => {
        // Eğer bir önceki kapanma gecikmesi varsa iptal et
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
        }
        setActivePopover(itemName);
    };

    const handleMouseLeave = () => {
        // Popover'ı hemen kapatmak yerine 200ms gecikme ekle
        // Bu gecikme, farenin ana öğeden popover'a veya popover içindeki öğelere geçerken
        // menünün aniden kapanmasını engeller.
        leaveTimeoutRef.current = setTimeout(() => {
            setActivePopover(null);
        }, 200); // 200 milisaniye gecikme
    };

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
                if (item.name === 'search') {
                    itemList = (
                        <button onClick={toggleSearch} className="focus:outline-none">
                            <FaSearch className="w-5 h-5" /> 
                        </button>
                    );
                } else if (item.name === 'plus') {
                    itemList = (
                        <Link href={item.path}>
                            <FaPlus className="w-5 h-5" /> 
                        </Link>
                    );
                } else if (item.name === 'star') {
                    itemList = (
                        <Link href={item.path}>
                            <FaStar className="w-5 h-5" /> 
                        </Link>
                    );
                }
                break;
            case 'link': 
                itemList = (
                    <div
                        // **Önemli:** Hem ana öğeye hem de popover'ın kendisine mouseEnter/Leave olaylarını ekliyoruz.
                        // Böylece fare popover'ın üzerine geçtiğinde kapanma gecikmesi iptal edilir ve menü açık kalır.
                        onMouseEnter={() => item.subItems && handleMouseEnter(item.name)}
                        onMouseLeave={handleMouseLeave}
                        className="relative"
                    >
                        {item.subItems ? (
                            <span className="hover:text-gray-300 transition-colors cursor-pointer">
                                {item.name}
                            </span>
                        ) : (
                            <Link href={item.path} className="hover:text-gray-300 transition-colors">
                                {item.name}
                            </Link>
                        )}
                        
                        {item.subItems && activePopover === item.name && (
                            <div 
                                className="absolute top-full left-0 mt-2 bg-white text-tmdbDarkBlue rounded-md shadow-lg py-1 z-50 whitespace-nowrap"
                                // **Önemli:** Popover'ın kendi üzerine gelindiğinde de kapanma gecikmesini iptal et
                                onMouseEnter={() => handleMouseEnter(item.name)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {item.subItems.map(subItem => (
                                    <Link key={subItem.name} href={subItem.path}>
                                        <div className="block px-4 py-2 hover:bg-gray-200">
                                            {subItem.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
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
