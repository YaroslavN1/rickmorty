<template>
  <label class="flex">
    <span class="mr-2 capitalize text-green-500">{{ label }}:</span>
    <select
      :value="modelValue"
      class="w-full text-ellipsis text-center capitalize outline-none"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
    >
      <option value="all">-</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    options: readonly string[]
    modelValue?: string
  }>(),
  {
    modelValue: 'all',
  },
)

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
