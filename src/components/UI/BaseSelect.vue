<template>
  <select
      class="base-select"
      v-model="modelValue"
      @change="changeOption"
  >
    <option disabled value="">Filter</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'base-select',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
  .base-select {
    outline: none;
  }
</style>