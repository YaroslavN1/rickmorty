<template>
  <button
    :disabled="disabled"
    class="border border-gray-300 bg-white hover:border-green-300 focus:outline-none disabled:pointer-events-none disabled:border-gray-200 disabled:text-gray-200"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>
