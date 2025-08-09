import React, { useState, useRef, useEffect } from 'react'; 
import Image from 'next/image'; 
import ProgressCircle from "../../baseUI/progress-circle";
import Ellipsis from "../../baseUI/ellipsis";
import { FaStar, FaRegStar, FaPlusCircle, FaCheckCircle, FaShareAlt, FaMinusCircle, FaEye, FaEyeSlash } from 'react-icons/fa'; 
import toast from 'react-hot-toast'; 

const MovieCard = ({ item, isFavorite, onToggleFavorite, onCardClick }) => { 
    const { poster_path, name, title, release_date, vote_average, first_air_date, id, media_type } = item;
    
    const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'; 

    const [showPopover, setShowPopover] = useState(false);

    const popoverRef = useRef(null);
    
    const ellipsisButtonRef = useRef(null);

    const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
    const [isWatched, setIsWatched] = useState(false);

    useEffect(() => {
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        const watchedList = JSON.parse(localStorage.getItem('watchedList') || '[]');
        
        setIsAddedToWatchlist(watchlist.some(wItem => wItem.id === id && wItem.media_type === media_type));
        setIsWatched(watchedList.some(wItem => wItem.id === id && wItem.media_type === media_type));
    }, [id, media_type]); 

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target) &&
                ellipsisButtonRef.current && !ellipsisButtonRef.current.contains(event.target)) {
                setShowPopover(false); 
            }
        };

        document.addEventListener("mousedown", handleClickOutside); 
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); 
        };
    }, []); 

    const handleEllipsisClick = (e) => {
        e.stopPropagation(); 
        setShowPopover(prev => !prev); 
    };

    const handleOptionClick = (e, option) => {
        e.stopPropagation(); 
        setShowPopover(false); 

        const itemIdentifier = { id, media_type }; 

        if (option === 'toggleWatchlist') {
            let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
            if (isAddedToWatchlist) {
                watchlist = watchlist.filter(wItem => !(wItem.id === id && wItem.media_type === media_type));
                toast.success(`${title || name} removed from watchlist.`);
            } else {
                watchlist.push(item); 
                toast.success(`${title || name} added to watchlist.`);
            }
            localStorage.setItem('watchlist', JSON.stringify(watchlist)); 
            setIsAddedToWatchlist(!isAddedToWatchlist); 
        } else if (option === 'toggleWatched') {
            let watchedList = JSON.parse(localStorage.getItem('watchedList') || '[]');
            if (isWatched) {
                watchedList = watchedList.filter(wItem => !(wItem.id === id && wItem.media_type === media_type));
                toast.success(`${title || name} marked as not watched.`);
            } else {
                watchedList.push(item); 
                toast.success(`${title || name} marked as watched.`);
            }
            localStorage.setItem('watchedList', JSON.stringify(watchedList)); 
            setIsWatched(!isWatched); 
        } else if (option === 'Share') {
            const itemUrl = `${window.location.origin}/${media_type}/${id}`;
            navigator.clipboard.writeText(itemUrl)
                .then(() => toast.success(`Link copied to clipboard: ${itemUrl}`))
                .catch(err => {
                    console.error('Could not copy link: ', err);
                    toast.error('Could not copy link:');
                });
        }
    };

    return (
        <div 
            className="flex flex-col pl-5 gap-2 relative cursor-pointer"
            onClick={() => onCardClick(item)} 
        >
            <div className="relative">
                <Image
                    src={imageUrl}
                    alt={name || title}
                    width={200} 
                    height={300} 
                    className="shadow-sm rounded-md"
                />
                <div className="absolute bottom-[-1.2rem] left-2">
                    <ProgressCircle percent={vote_average * 10}/>
                </div>
            
                <div 
                    ref={ellipsisButtonRef} 
                    className="absolute top-3 right-[10px] w-[1.4rem] h-[1.4rem] z-10" 
                    onClick={handleEllipsisClick} 
                >
                    <Ellipsis />
                </div>
                
                {showPopover && (
                    <div 
                        ref={popoverRef} 
                        className="absolute top-10 right-0 bg-white text-gray-800 rounded-md shadow-lg z-20 w-48 py-2" 
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <div 
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => handleOptionClick(e, 'toggleWatchlist')}
                        >
                            {isAddedToWatchlist ? (
                                <FaMinusCircle className="mr-2 text-red-500" /> 
                            ) : (
                                <FaPlusCircle className="mr-2 text-tmdbLightBlue" /> 
                            )}
                            {isAddedToWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        </div>
                        <div 
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => handleOptionClick(e, 'toggleWatched')}
                        >
                            {isWatched ? (
                                <FaEyeSlash className="mr-2 text-gray-500" /> 
                            ) : (
                                <FaEye className="mr-2 text-tmdbLightGreen" /> 
                            )}
                            {isWatched ? 'Mark as Not Watched' : 'Mark as Watched'}
                        </div>
                        <div 
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => handleOptionClick(e, 'Share')}
                        >
                            <FaShareAlt className="mr-2 text-gray-500" /> Share
                        </div>
                    </div>
                )}
                
                
                <div 
                    className="absolute top-3 left-3 cursor-pointer text-red-500" 
                    onClick={(e) => {
                        e.stopPropagation(); 
                        onToggleFavorite(item);
                    }}
                >
                    {isFavorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
                </div>
            </div>
            
            
            <div className="flex flex-col px-3 pt-5 w-[200px]">
                <h1 className="font-bold hover:cursor-pointer hover:text-tmdbLightBlue">{name || title}</h1>
                <p className="font-normal text-slate-500">{first_air_date || release_date}</p> 
            </div>
        </div>
    );
};

export default MovieCard;
