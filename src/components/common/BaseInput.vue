<template>
  <input
    :value="modelValue"
    class="border border-gray-300 text-center outline-none placeholder:text-gray-300 focus:border-green-300"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>
