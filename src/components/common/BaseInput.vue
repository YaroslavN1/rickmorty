<template>
  <input
    :value="modelValue"
    class="border border-gray-300 text-center outline-none placeholder:text-gray-300 focus:border-green-300"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
