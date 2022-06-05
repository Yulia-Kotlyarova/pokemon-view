<template>
  <div class="pokemon-list__wrapper">
    <div v-for="(pokemon, i) in list"
         :key="i"
         class="pokemon-list__item"
         >
      <Favorite :pokemon="pokemon"/>
      <img v-if="pokemon.sprites.front_default"
           :src="pokemon.sprites.front_default"
           class="pokemon-list__image"/>
      <span v-else
            class="pokemon-list__image"
      > 😀 </span>
      <span class="pokemon-list__title"> {{ pokemon.name }} </span>
      <TypesList :types="pokemon?.types"/>
      <span class="pokemon-list__link"> {{ pokemon.url }} </span>
      <span v-for="(stat, statName) in pokemon.stats"
            :key="statName"
            class="pokemon-list__stat-box"
      >
            {{ statName }} : {{ stat }}
      </span>
    </div>

  </div>
</template>
<script>
import TypesList from '@/components/TypesList';
import {mapMutations} from 'vuex';
import Favorite from '@/components/Favorite';

export default {
  name: 'PokemonList',
  data() {
    return {
      isFavorite: false,
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
  },
  components: {
    Favorite,
    TypesList,
  },
  methods: {
    ...mapMutations({
      setFavorite: 'pokemon/setFavorite',
      deleteFavorite: 'pokemon/deleteFavorite',
    })
  },
}
</script>

<style lang="scss" scoped>
@import "@/style/root.scss";

.pokemon-list {
  &__wrapper {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__item {
    position: relative;
    width: 24%;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid $main;
    border-radius: 4px;
    box-sizing: border-box;
  }

  &__image {
    display: block;
    object-fit: contain;
    width: 100px;
    height: 70px;
    margin: auto;
    text-align: center;
  }

  &__title {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    text-align: center;
  }

  &__stat-box {
    display: block;
    padding-top: 10px;
  }
}
</style>