export const toPreparePokemonList = (pokemon) => {
  const stats = {};
  pokemon?.stats.forEach(stat => stats[stat.stat.name] = stat.base_stat)

  return {
    name: pokemon?.name,
    types: pokemon?.types.map(t => t.type.name),
    sprites: {
      front_default: pokemon?.sprites?.front_default,
      back_default:pokemon?.sprites?.back_default,
      front_shiny:pokemon?.sprites?.front_shiny,
    },
    stats
  }
}
