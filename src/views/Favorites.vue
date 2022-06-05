<template>
  <div class="container">
    <router-link to="/">
      <button class="button">Main Page</button>
    </router-link>
    <div v-if="!!favorite.length" class="pokemon-list__wrapper">
      <PokemonItem v-for="(pokemon, i) in favorite"
                   :key="i"
                   :pokemon="pokemon"
      />
    </div>
    <div v-else>
      Add something to favorites
    </div>
  </div>
</template>

<script>
import PokemonItem from '@/components/PokemonItem';
import {mapMutations, mapState} from 'vuex';

export default {
  components: {
    PokemonItem,
  },
  methods: {
    ...mapMutations({
      setSelectedType: 'pokemon/setSelectedType',
    })
  },
  computed: {
    ...mapState({
      favorite: state => state.pokemon.favorite
    }),
  },
}
</script>


<style lang="scss" scoped>
.pokemon-list {
  &__wrapper {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    & > div {
      margin-right: 20px;
    }
  }
}
.button {
  margin-bottom: 10px;
}
</style>
