import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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

  if (loading) {
    return (
      <Container>
        <div className="min-h-screen pt-8 text-white flex items-center justify-center">
          <div className="text-xl">Loading people...</div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="min-h-screen pt-8 text-red-500 flex items-center justify-center">
          <div className="text-xl">{error}</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="min-h-screen pt-8 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">Popular People</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
          {people.map(person => (
            <div 
              key={person.id} 
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => handlePersonClick(person.id)}
            >
              {person.profile_path ? (
                <div className="relative w-full h-auto pb-[150%]"> 
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                    alt={person.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              ) : (
                <div className="w-full h-auto pb-[150%] bg-gray-700 flex items-center justify-center text-center rounded-t-lg">
                  <span className="text-gray-400 p-2">No Photo</span>
                </div>
              )}
              <div className="p-3 text-center">
                <h3 className="font-semibold text-lg truncate">{person.name}</h3>
                {person.known_for_department && (
                  <p className="text-sm text-gray-400">{person.known_for_department}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PeoplePage;
