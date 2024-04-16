"use client";
import { useMutationState } from "@tanstack/react-query";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ pokemonData }: any) {
  const variables = useMutationState({
    filters: { mutationKey: ["addPokemon"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  const pendingPokemonIds = variables.map((pokemon: any) => pokemon.id);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {pokemonData.map((pokemon: any) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isPending={pendingPokemonIds.includes(pokemon.id)}
        />
      ))}
    </div>
  );
}
