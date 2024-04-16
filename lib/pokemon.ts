const pokemonTypes = ["Electric", "Water", "Fire", "Earth", "Air"]; 
const pokemonNames = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Jigglypuff", "Meowth", "Psyduck", "Gengar", "Machop","Geodude", "Onix", "Cubone", "Hitmonlee", "Hitmonchan", "Lickitung" ,"Koffing", "Rhyhorn", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Goldeen", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Gyarados", "Lapras", "Ditto", "Eevee", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Mewtwo", "Mew"]; 
const pokemonMoves = ["Thunder Shock", "Tackle", "Water Gun", "Ember", "Vine Whip", "Scratch", "Pound", "Peck", "Quick Attack", "Twister", "Shock Wave", "Bubble Beam"]; 


function generateRandomPokemon() {
    const pokemonId = Math.floor(Math.random() * 100000).toString(); 

    const pokemonName = pokemonNames[Math.floor(Math.random() * pokemonNames.length)]; 
    const pokemonType = pokemonTypes[Math.floor(Math.random() * pokemonTypes.length)]; 
    const pokemonLevel = Math.floor(Math.random() * 100); 
    const cp = Math.floor(Math.random() * 4000); 
    const hp = Math.floor(Math.random() * 300); 
    const randomMoves = Array(4).fill('').map(() => pokemonMoves[Math.floor(Math.random() * pokemonMoves.length)]); 
    const pokemonImage = `https://wiki.p-insurgence.com/images/0/09/722.png`; 
  
    return {
      id: pokemonId,
      name: pokemonName,
      type: pokemonType,
      level: pokemonLevel,
      moves: randomMoves,
      img: pokemonImage,
      caught: false,
      cp,
      hp,
    };
  }

  export { generateRandomPokemon };