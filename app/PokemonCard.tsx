"use client";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PokemonCard({ pokemon, isPending }: any) {
  const queryClient = useQueryClient();

  const { mutate: toggleCheck } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3001/pokemon/${pokemon.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ ...pokemon, caught: !pokemon.caught }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["pokemon"] });
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3001/pokemon/${pokemon.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["pokemon"] });
    },
  });

  return (
    <div className={`max-w-sm mx-auto my-10 ${isPending ? "opacity-50" : ""}`}>
      <Card className="relative">
        <div className="absolute top-5 right-5">
          <Checkbox
            checked={pokemon.caught}
            onCheckedChange={() => toggleCheck()}
          />
        </div>
        <div className="flex justify-center items-center relative top-12">
          <div className="flex justify-center mb-4 h-32 w-32 animate-wiggleS">
            <img
              alt={pokemon.name}
              className="object-cover rounded-full"
              src={pokemon.img}
            />
          </div>
        </div>
        <CardContent className="rounded-lg shadow-lg bg-white pt-10">
          <div className="">
            <div className="text-center mb-4">
              <span className="text-3xl font-bold text-red-600">CP</span>
              <span className="text-3xl font-bold text-red-600">
                {pokemon.cp}
              </span>{" "}
            </div>
            <div className="text-center mb-4">
              <span className="text-xl font-bold text-gray-800">
                {pokemon.name}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 gap-3">
              <div>
                <span className="text-gray-700 text-sm">178.07kg</span>
                <span className="text-gray-500 text-xs ml-1">WEIGHT</span>
              </div>
              <div>
                <span className="text-gray-700 text-sm">6.37m</span>
                <span className="text-gray-500 text-xs ml-1">HEIGHT</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-blue-600 text-sm">{pokemon.type}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                {pokemon.moves.map((move: string, index: number) => {
                  return (
                    <span
                      key={index}
                      className="text-gray-700 text-sm bg-gray-200 px-2 py-1 rounded-full"
                    >
                      {move}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="bg-green-500 h-2 rounded-full mb-4"></div>
            <div className="text-center">
              <span className="text-gray-700 font-bold">
                {pokemon.hp} / {pokemon.hp} HP
              </span>{" "}
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="flex flex-col gap-1">
                <Button variant="destructive" onClick={() => deleteMutation()}>
                  Transfer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

 
}
