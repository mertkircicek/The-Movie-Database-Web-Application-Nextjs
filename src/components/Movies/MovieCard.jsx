import React from 'react';
import Image from 'next/image'; // Resim optimizasyonu için next/image import ediyoruz
import ProgressCircle from "../../baseUI/progress-circle";
import Ellipsis from "../../baseUI/ellipsis";
import { FaStar, FaRegStar } from 'react-icons/fa'; 

const MovieCard = ({ item, isFavorite, onToggleFavorite, onCardClick }) => { 
    const { poster_path, name, title, release_date, vote_average, first_air_date } = item;
    
    // getPosterURL fonksiyonu artık Image bileşeni tarafından otomatik olarak işleneceği için
    // doğrudan src prop'unda URL'yi kullanabiliriz.
    // Ancak placeholder URL'si için hala bir fonksiyona veya doğrudan string'e ihtiyacımız var.
    const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'; 

    return (
        <div 
            className="flex flex-col pl-5 gap-2 relative cursor-pointer"
            onClick={() => onCardClick(item)} 
        >
            <div className="relative">
                {/* img etiketini Next.js Image bileşeni ile değiştiriyoruz */}
                <Image
                    src={imageUrl}
                    alt={name || title}
                    width={200} // w-[200px] sınıfına karşılık gelen genişlik
                    height={300} // h-[300px] sınıfına karşılık gelen yükseklik
                    className="shadow-sm rounded-md" // Tailwind sınıfları kalabilir
                    // layout="intrinsic" veya "fixed" burada uygun olabilir,
                    // ancak Next.js 13+ ile width/height prop'ları daha çok tercih edilir.
                    // objectFit="cover" // Eğer resim kapsayıcıyı dolduracaksa
                />
                <div className="absolute bottom-[-1.2rem] left-2">
                    <ProgressCircle percent={vote_average * 10}/>
                </div>
                <div className="absolute top-3 right-[10px] w-[1.4rem] h-[1.4rem]">
                    <Ellipsis />
                </div>
                
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
