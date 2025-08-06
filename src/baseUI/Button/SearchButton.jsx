import React from 'react';

const SearchButton = (props) => { 
    return (
        <button 
            {...props} 
            className="h-[4.5rem] text-white font-bold px-12 py-3 rounded-[8rem] bg-gradient-to-r from-tmdbLightGreen to-tmdbLightBlue hover:text-tmdbDarkBlue inline-flex justify-center items-center"
        >
            Search
        </button>
    );
};

export default SearchButton;
