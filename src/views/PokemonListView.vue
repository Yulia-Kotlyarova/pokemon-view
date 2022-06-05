<template>
  <div class="container">
    <div class="filters__wrapper">
      <base-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />

  <!--    <base-input-->
  <!--      :model-value="searchQuery"-->
  <!--      @update:model-value="setSearchQuery"-->
  <!--      placeholder="Search by name..."-->
  <!--    />-->
  <!--    {{ searchQuery }}-->
  <!--    <button @click="fetchSearchByName" > Search </button>-->
      <TypesList :types="selectedType" class="pokemon-list__types"/>
      <router-link to="/favorites">
        <button>Favorite list {{favorite.length}}</button>
      </router-link>
    </div>

    <section class="pokemon__section">
      <PokemonList
        class="pokemon-list__wrapper"
        :list="getSortedList"
      />
    </section>
    <span v-if="isLoading"> loading...</span>
    <div v-intersection="fetchMorePokemons" class="observer"></div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import PokemonList from '@/components/PokemonList';
import BaseInput from '@/components/UI/BaseInput';
import PokemonItem from '@/components/PokemonItem';
import TypesList from '@/components/TypesList';

export default {
  name: 'pokemonListView',
  components: {
    TypesList,
    PokemonItem,
    BaseInput,
    PokemonList,
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions({
      fetchMorePokemons: 'pokemon/fetchMorePokemons',
      fetchPokemons: 'pokemon/fetchPokemons',
      fetchSearchByName: 'pokemon/fetchSearchByName',
    }),
    getPic(link) {
      return link;
    },
    ...mapMutations({
      setSelectedSort: 'pokemon/setSelectedSort',
      // setSearchQuery: 'pokemon/setSearchQuery',
    })
  },
  computed: {
    ...mapState({
      pokemonsList: state => state.pokemon.pokemonsList,
      isLoading: state => state.pokemon.isLoading,
      selectedSort: state => state.pokemon.selectedSort,
      sortOptions: state => state.pokemon.sortOptions,
      selectedType: state => state.pokemon.selectedType,
      searchQuery: state => state.pokemon.searchQuery,
      favorite: state => state.pokemon.favorite,
    }),
    ...mapGetters({
      getSortedList: 'pokemon/getSortedList'
    }),

  },
  mounted() {
    this.fetchPokemons();
  },
}
</script>

<style lang="scss" scoped>

.pokemon {
  &__section {
    display: flex;
    justify-content: space-between;
  }
}
.pokemon-list {
  &__wrapper {
    width: 100%;
  }
  &__types {
    justify-self: start;
  }
}
.filters {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
