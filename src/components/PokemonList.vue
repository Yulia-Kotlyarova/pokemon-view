<template>
  <div class="pokemon-list__wrapper">
    <div v-for="(pokemon, i) in list"
         :key="i"
         class="pokemon-list__item"
    >
      <img v-if="pokemon.sprites"
           :src="getPic(pokemon.sprites)"
           class="pokemon-list__image"/>
      <span v-else
            class="pokemon-list__image"
      > 😀 </span>
      <span class="pokemon-list__title"> {{ pokemon.name }} </span>
      <span class="pokemon-list__link"> {{ pokemon.url }} </span>
      <div v-for="stat in Object.keys(pokemon.stats)"
           :key="stat"
           class="pokemon-list__stat-box"
      >
          <span class="pokemon-list__stat">
            {{ stat }} : {{ pokemon.stats[stat] }}
          </span>

      </div>
    </div>

  </div>
</template>
<script>

export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    getPic(link) {
      return link;
    }
  },
}
</script>

<style lang="scss" scoped>
.pokemon-list {
  &__wrapper {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
  }
  &__item {
    width: 23%;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid cornflowerblue;
    border-radius: 3px;
    box-sizing: border-box;
    transition: 0.3s;
    &:hover {
      border: 1px solid yellow;
      cursor: pointer;
    }
  }
  &__image {
    display: block;
    object-fit: contain;
    width: 100px;
    height: 50px;
    margin: auto;
    text-align: center;
  }
  &__title {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    text-align: center;
  }
  &__stat {
    line-height: 23px;
  }
}
</style>