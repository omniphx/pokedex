'use client';
import { useQuery } from '@tanstack/react-query';
import PokemonCard from './PokemonCard';


function Pokemon() {
  const { isLoading, isError, data: pokemon, error } = useQuery({
    queryKey: ['pokemon'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/pokemon')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })

  if(isLoading) {
    return <>Pending...</>
  }

  if(isError) {
    return <>Error: {error.message}</>
  }

  return (
    <div className='container mx-auto'>
      <p className="text-2xl">Pokedex</p>
      <PokemonCard pokemonData={pokemon} />
    </div>
  )
}

export default Pokemon;
