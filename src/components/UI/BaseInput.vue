<template>
  <input
      class="input"
      :value="modelValue"
      @input="updateInput"
      type="text"
  >
</template>

<script>
export default {
  name: 'base-input',
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('setSearchQuery', event.target.value)
    }
  }
}
</script>

<style lang="scss"  scoped>
.input {
  border: 1px solid cornflowerblue;
  padding: 10px 15px;
  margin-top: 15px;
  max-width: 150px;
}

</style>
