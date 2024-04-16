"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateRandomPokemon } from "../lib/pokemon";
import PokemonCard from "./PokemonList";
import pokeBall from "../assets/images/pokeball.png";
import Image from "next/image";
import { useEffect, useState } from "react";

function Pokemon() {
  const [isWiggling, setIsWiggling] = useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: pokemon,
    error,
  } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/pokemon");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (newPokemon: any) => {
      const response = await fetch(`http://localhost:3001/pokemon`, {
        method: "POST",
        body: JSON.stringify({
          ...newPokemon,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onMutate: async (newPokemon) => {
      await queryClient.cancelQueries({ queryKey: ["pokemon"] });

      const previousPokemon = queryClient.getQueryData(["pokemon"]);

      queryClient.setQueryData(["pokemon"], (old: any) => [...old, newPokemon]);

      return { previousPokemon };
    },
    onError: (err, newPokemon, context) => {
      context && queryClient.setQueryData(["pokemon"], context.previousPokemon);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pokemon"] });
    },
    mutationKey: ["addPokemon"],
  });

  useEffect(() => {
    if (isWiggling) {
      const timer = setTimeout(() => {
        setIsWiggling(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isWiggling]);

  const handleClick = () => {
    setIsWiggling(true);
    mutate(generateRandomPokemon());
  };

  if (isLoading) {
    return <>Pending...</>;
  }

  if (isError) {
    return <>Error: {error.message}</>;
  }

  return (
    <div className="container mx-auto">
      <p className="text-2xl">Pokedex</p>
      <PokemonCard pokemonData={pokemon} />
      <div
        style={{
          position: "fixed",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <button
          type="button"
          className={`${isPending ? "cursor-not-allowed" : "cursor-pointer"} ${
            isWiggling ? "animate-wiggle" : ""
          }`}
          disabled={isPending}
          onClick={handleClick}
        >
          <Image src={pokeBall} alt="Pokemon ball" width={80} height={80} />
        </button>
      </div>
    </div>
  );
}

export default Pokemon;
