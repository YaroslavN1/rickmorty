<template>
  <div class="mt-6 flex place-content-center">
    <p class="ml-1">{{ itemsRange[0] }} - {{ itemsRange[1] }}</p>
    <p class="ml-2">of</p>
    <p class="ml-2 text-green-400">
      {{ charactersTotalCount }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useCharactersStore } from '@/stores/charactersStore'

const { requestFilters, charactersTotalCount, characters } =
  storeToRefs(useCharactersStore())

const itemsRange = computed(() => {
  const currentPage = requestFilters.value.page
  const defaultPageSize = 20

  if (characters.value.length === 0) {
    return [0, 0]
  }

  return [
    (currentPage - 1) * defaultPageSize + 1,
    Math.min(currentPage * defaultPageSize, charactersTotalCount.value),
  ]
})
</script>
