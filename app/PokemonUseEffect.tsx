'use client';
import PokemonCard from './PokemonList';
import { useEffect, useState } from 'react';


function PokemonUseEffect() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3001/pokemon');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const pokemon = await response.json();
        setData(pokemon);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if(isLoading) {
    return <>Pending...</>
  }

  if(error) {
    return <>Error: {error}</>
  }

  return (
    <div className='container mx-auto'>
      <p className="text-2xl">Pokedex</p>
      <PokemonCard pokemonData={data} />
    </div>
  )
}

export default PokemonUseEffect;
