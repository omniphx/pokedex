import { CardContent, Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PokemonCard({ pokemonData }: any) {

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (pokemon: any) => {
      const response = await fetch(`http://localhost:3001/pokemon/${pokemon.id}`, {
        method: 'PUT',
        body: JSON.stringify({...pokemon, caught: !pokemon.caught}),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['pokemon'] })
    },
  })


  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {pokemonData.map((pokemon: any) => (
        <div className="w-full max-w-sm" key={pokemon.id}>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 p-6">
              <img
                alt={pokemon.name}
                className="aspect-square object-contain border bg-white p-4"
                height={150}
                src={pokemon.img}
                width={150}
              />
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Checkbox
                  checked={pokemon.caught}
                  onCheckedChange={() => mutation.mutate(pokemon)}
                />
                <h3 className="text-lg font-bold">{pokemon.name}</h3>
                <p>Level: {pokemon.level}</p>
                <p>Moves: {pokemon.moves.join(", ")}</p>
                <div className="flex gap-1.5">
                  <span className="inline-block rounded-full border shadow-sm border-gray-200 text-gray-900 dark:border-gray-800 dark:text-gray-100 px-3 py-0.5 text-sm dark:bg-gray-950">
                    {pokemon.type}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
