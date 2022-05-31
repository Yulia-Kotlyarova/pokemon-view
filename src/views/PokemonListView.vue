<template>
  <div class="container">
<!--    <base-select-->
<!--        :model-value="selectedSort"-->
<!--        @update:model-value="setSelectedSort"-->
<!--        :options="sortOptions"-->
<!--    />-->
    <PokemonList
        :list="getSortedList"
    />
    <span v-if="isLoading"> loading...</span>
    <div v-intersection="fetchMorePokemons" class="observer"></div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import PokemonList from '@/components/PokemonList';

export default {
  name: 'pokemonListView',
  components: {
    PokemonList,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapActions({
      fetchMorePokemons: 'pokemon/fetchMorePokemons',
      fetchPokemons: 'pokemon/fetchPokemons'
    }),
    getPic(link) {
      return link;
    }
  },
  computed: {
    ...mapState({
      pokemonsList: state => state.pokemon.pokemonsList,
      isLoading: state => state.pokemon.isLoading,
      selectedSort: state => state.pokemon.selectedSort,
      sortOptions: state => state.pokemon.sortOptions,
    }),
    ...mapGetters({
      getSortedList: 'pokemon/getSortedList'
    }),
    ...mapMutations({
      setSelectedSort: 'pokemon/setSelectedSort',
    })
  },
  mounted() {
    this.fetchPokemons('lord');
  },
}
</script>

<style lang="scss" scoped>

</style>