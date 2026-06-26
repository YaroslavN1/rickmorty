<template>
  <div class="flex justify-center">
    <button
      class="relative flex"
      :class="{ 'filters-icon-anim': isIconAnimation }"
      @click="isOpenFilters = !isOpenFilters"
    >
      <i
        class="fa-solid fa-filter text-xl transition-colors hover:text-green-200"
        :class="[isOpenFilters ? 'text-gray-300' : 'text-green-300']"
      />
      <span
        v-if="isModifiedFilters"
        class="absolute -right-px -top-px h-2 w-2 rounded-full bg-red-500"
      />
    </button>
  </div>

  <div v-if="isOpenFilters" class="mt-6 flex flex-col items-center gap-6">
    <BaseInput
      v-model="selectedFilters.name"
      class="h-8 w-2/5 rounded-2xl"
      placeholder="Search by name..."
      type="text"
      @update:model-value="(value) => setStoreFilter('name', value)"
    />
    <div class="grid max-w-xl grid-cols-2 gap-x-10 gap-y-1">
      <BaseDropdown
        v-for="{ name, subFilters } in filterCategories"
        :key="name"
        v-model="selectedFilters[name]"
        :label="name"
        :options="subFilters"
        @update:model-value="(value) => setStoreFilter(name, value)"
      />
    </div>

    <button
      v-if="isModifiedFilters"
      class="text-red-400 underline transition-colors hover:text-red-300"
      @click="resetFilters"
    >
      clear filters
    </button>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useStoreCharacters } from '@/stores/storeCharacters'
import { storeToRefs } from 'pinia'
import BaseDropdown from '../common/BaseDropdown.vue'
import BaseInput from '../common/BaseInput.vue'
import filterCategories from '@/mockdata/filterCategories.json'

const storeCharacters = useStoreCharacters()
const { requestFilters } = storeToRefs(storeCharacters)
const { setStoreFilter, resetStoreFilters } = storeCharacters

const isOpenFilters = ref(false)

const filtersDefault = {
  name: '',
  status: 'all',
  species: 'all',
  type: 'all',
  gender: 'all',
}
const selectedFilters = ref({
  ...filtersDefault,
})
const isModifiedFilters = computed(
  () =>
    Object.keys(requestFilters.value).filter((key) => key !== 'page').length >
    0,
)
const syncFiltersFromStore = () => {
  Object.keys(selectedFilters.value).forEach((el) => {
    if (requestFilters.value[el]) {
      selectedFilters.value[el] = requestFilters.value[el]
    }
  })
}
const resetFilters = () => {
  selectedFilters.value = { ...filtersDefault }
  resetStoreFilters()
}

const isIconAnimation = ref(true)
if (!sessionStorage.getItem('iconAnimated')) {
  sessionStorage.setItem('iconAnimated', true)
} else {
  isIconAnimation.value = false
}

onBeforeMount(() => {
  syncFiltersFromStore()
})
</script>

<style scoped>
.filters-icon-anim {
  animation: flash;
  animation-duration: 1.6s;
}
/* select {
    -webkit-appearance:caret;
  } */
</style>
