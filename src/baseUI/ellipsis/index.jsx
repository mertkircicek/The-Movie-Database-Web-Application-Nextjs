import React from 'react';

const Ellipsis = () => {
    return (
        <div className="w-full h-full bg-white/50 rounded-full flex justify-center items-center hover:cursor-pointer hover:bg-tmdbLightBlue">
            <div className="scale-[0.42] flex gap-[2px] text-[0.8rem] text-gray-700 pl-[2px]">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4" cy="4" r="4"/>
                </svg>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4" cy="4" r="4"/>
                </svg>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4" cy="4" r="4"/>
                </svg>
            </div>
        </div>
    );
}; 

export default Ellipsis;
