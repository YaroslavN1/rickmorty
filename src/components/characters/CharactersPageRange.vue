<template>
  <div class="mt-6 flex place-content-center">
    <p class="ml-1">{{ itemsRange[0] }} - {{ itemsRange[1] }}</p>
    <p class="ml-2">of</p>
    <p class="ml-2 text-green-400">
      {{ charactersTotalCount }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStoreCharacters } from '@/stores/storeCharacters'
import { storeToRefs } from 'pinia'

const { requestFilters, charactersTotalCount, characterItems } =
  storeToRefs(useStoreCharacters())

const itemsRange = computed(() => {
  const currentPage = requestFilters.value.page
  const pageSize = characterItems.value.length

  if (pageSize === 0) {
    return [0, 0]
  }

  return [
    (currentPage - 1) * pageSize + 1,
    Math.min(currentPage * pageSize, charactersTotalCount.value),
  ]
})
</script>
