<template>
  <button
    :disabled="disabled"
    class="rounded border bg-white px-4 drop-shadow-sm hover:border-green-300 focus:outline-none disabled:pointer-events-none disabled:text-slate-200"
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
