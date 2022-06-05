<template>
  <div v-if="pokemon.name" class="pokemon-list__item">
    <Favorite :pokemon="pokemon"/>
    <div class="pokemon-list__img-box">
      <img v-if="pokemon.sprites.back_default"
           :src="pokemon.sprites.back_default"
           class="pokemon-list__image"
      />
      <img v-if="pokemon.sprites.front_default"
           :src="pokemon.sprites.front_default"
           class="pokemon-list__image"
      />
      <img v-if="pokemon.sprites.front_shiny"
           :src="pokemon.sprites.front_shiny"
           class="pokemon-list__image"
      />
      <span v-else
            class="pokemon-list__image"
      > 😀 </span>
    </div>

    <span class="pokemon-list__title"> {{ pokemon.name }} </span>
    <TypesList :types="pokemon?.types"
    />

    <span class="pokemon-list__link"> {{ pokemon.url }} </span>
    <span v-for="(stat, statName) in pokemon.stats"
          :key="statName"
          class="pokemon-list__stat-box"
    >
      {{ statName }} : {{ stat }}
    </span>
  </div>

</template>
<script>
import { TYPES } from '@/common/consts.js';
import TypesList from '@/components/TypesList';
import {mapMutations} from 'vuex';
import Favorite from '@/components/Favorite';

export default {
  data() {
    return {
      TYPES: TYPES,
      isFavorite: true,
    }
  },
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  components: {
    Favorite,
    TypesList,
  },
  methods: {
    ...mapMutations({
      setSelectedType: 'pokemon/setSelectedType',
    })
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.pokemon-list {
  &__item {
    position: relative;
    width: 24%;
    min-width: 340px;
    height: fit-content;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid cornflowerblue;
    border-radius: 4px;
    box-sizing: border-box;
  }
  &__img-box {
    display: flex;
    justify-content: space-between;
  }
  &__image {
    display: block;
    object-fit: contain;
    width: 100px;
    height: 100px;
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
  &__type {
    display: inline-block;
    padding: 4px 10px;
    color: white;
    border-radius: 2px;
    margin: 10px 5px 10px 0;
  }
  &__heart {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
