import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa'; 
import tmdb from '../api/tmdb';
import Container from '../Layouts/Container';

const PeoplePage = () => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPopularPeople = async () => {
            try {
                setLoading(true);
                const response = await tmdb.get('/person/popular', {
                    params: {
                        language: 'en-US',
                        page: 1
                    }
                });
                setPeople(response.data.results);
            } catch (err) {
                console.error('Error fetching popular people:', err);
                setError('Could not load popular people.');
            } finally {
                setLoading(false);
            }
        };

        fetchPopularPeople();
    }, []);

    const handlePersonClick = (id) => {
        router.push(`/person/${id}`);
    };

    return (
        <>
            <Head>
                <title>Popular People - Movie App</title>
                <meta name="description" content="Explore popular actors and actresses." />
            </Head>

            <div className="min-h-screen bg-white text-black pt-16 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => router.back()} 
                            className="flex items-center gap-2 text-white hover:text-tmdbLightBlue transition-colors p-2 rounded-full"
                        >
                            <FaArrowLeft />
                            <span className="hidden sm:inline">Back</span>
                        </button>
                        <h1 className="text-3xl font-bold text-center flex-grow">Popular People</h1>
                        <div className="w-10 sm:w-20"></div>
                    </div>
                </div>
            
                <Container>
                    {loading && (
                        <div className="text-white text-center text-xl mt-12">
                            Loading popular people...
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 text-center text-xl mt-12">
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
                            {people.map(person => (
                                <div 
                                    key={person.id} 
                                    className="bg-gray-400 rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
                                    onClick={() => handlePersonClick(person.id)}
                                >
                                    {person.profile_path ? (
                                        <div className="relative w-full aspect-[2/3]">
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w400${person.profile_path}`}
                                                alt={person.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-t-xl"
                                                sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-[2/3] bg-gray-700 flex items-center justify-center text-center rounded-t-xl">
                                            <span className="text-gray-400 p-2 text-sm">No Photo Available</span>
                                        </div>
                                    )}
                                    <div className="p-4 text-center">
                                        <h3 className="font-bold text-lg mb-1 truncate">{person.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Container>
            </div>
        </>
    );
};

export default PeoplePage;