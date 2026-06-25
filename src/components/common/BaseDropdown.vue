<template>
  <label class="flex">
    <span class="mr-2 capitalize text-green-500">{{ label }}:</span>
    <select
      :value="modelValue"
      class="w-full text-ellipsis text-center capitalize outline-none"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="all">-</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true },
  modelValue: { type: String, default: 'all' },
})

defineEmits(['update:modelValue'])
</script>
