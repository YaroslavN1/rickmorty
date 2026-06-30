<template>
  <input
    :value="modelValue"
    class="border border-gray-300 text-center outline-none placeholder:text-gray-300 focus:border-green-300"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string | number
  }>(),
  { modelValue: '' },
)

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
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
