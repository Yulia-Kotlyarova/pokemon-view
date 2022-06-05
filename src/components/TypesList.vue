<template>
  <div class="pokemon-type__box">
    <span v-for="type in types"
          :key="type"
          :class="['pokemon-type', tagsClass(type) ]"
          @click.prevent="setSelectedType(type)"
    >{{ type }}
      </span>
  </div>
</template>

<script>
import { TYPES } from '@/common/consts';
import { mapMutations } from 'vuex';

export default {
  name: 'TypesList',
  props: {
    types: {
      type: Array,
      required: true,
      default: [],
    },
  },
  methods: {
    tagsClass(type) {
      return type === TYPES.FIRE && 'red' ||
          type === TYPES.WATER && 'blue' ||
          type === TYPES.GRASS && 'green' ||
          type === TYPES.POISON && 'orange' ||
          type === TYPES.NORMAL && 'normal' ||
          'pink'
    },
    ...mapMutations({
      setSelectedType: 'pokemon/setSelectedType',
      deleteSelectedType: 'pokemon/deleteSelectedType',
    }),
  },
}
</script>

<style lang="scss" scoped>
.pokemon-type {
  display: inline-block;
  padding: 4px 10px;
  color: white;
  border-radius: 2px;
  margin: 10px 5px 10px 0;
  cursor: pointer;
  &:hover {
    filter: brightness(120%);
  }
  &__box {
    min-height: 50px;
    display: flex;
    justify-content: start;
    align-content: center;
  }
}
.normal {
  background-color: gray;
}
.red {
  background: red;
}
.blue {
  background: blue;
}
.green {
  background-color: green;
}
.pink {
  background-color: purple;
}
.orange {
  background-color: orange;
}
</style>
