<template>
  <div class="flex place-content-center">
    <a
      href=""
      class="relative flex text-xl"
      :class="{ 'filters-icon-anim': animateIcon }"
      @click.prevent="openCloseFilters = !openCloseFilters"
    >
      <i
        class="fa-solid fa-filter transition-colors duration-100 ease-in-out hover:text-green-200"
        :class="[openCloseFilters ? 'text-green-300' : 'text-gray-300']"
      />
      <p
        v-if="Object.keys(storeCharacters.requestFilters).length > 1"
        class="absolute"
        style="top: -1px; right: -1px"
      >
        <span class="block h-2 w-2 rounded-2xl bg-red-500" />
      </p>
    </a>
  </div>

  <div
    class="filters-wrapper flex flex-col items-center transition-all duration-300 ease-in-out"
    :class="{ 'h-0': openCloseFilters, 'overflow-hidden': openCloseFilters }"
  >
    <input
      id="characterName"
      v-model="selectedFilters.name"
      placeholder="Search by name..."
      type="text"
      class="focus:ring-5 mt-6 h-8 w-2/5 min-w-max rounded-2xl border border-gray-300 text-center outline-none drop-shadow-sm transition-colors duration-200 ease-in-out placeholder:text-gray-300 focus:border-green-300 focus:ring-green-200"
      @input="setFilter('name', selectedFilters.name)"
    />
    <div
      class="dropdown-wrapper mt-6 grid max-w-xl grid-cols-2 gap-x-10 gap-y-1"
    >
      <label
        v-for="filter in filterCategories"
        :key="filter.id"
        for="dropdown"
        class="flex"
      >
        <span class="mr-2 capitalize text-green-500"> {{ filter.name }}: </span>
        <select
          id="filters"
          v-model="selectedFilters[filter.name]"
          class="w-full text-ellipsis text-center capitalize outline-0"
          name="filters"
          @change="setFilter(filter.name, selectedFilters[filter.name])"
        >
          <option selected value="all">-</option>
          <option
            v-for="subFilter in filter.subFilters"
            :key="subFilter"
            :value="subFilter"
          >
            {{ subFilter }}
          </option>
        </select>
      </label>
    </div>

    <a
      v-if="Object.keys(storeCharacters.requestFilters).length > 1"
      href=""
      class="mt-4 text-red-400 underline transition-colors duration-100 ease-in-out hover:text-red-300"
      @click.prevent="resetFilters"
    >
      clear filters
    </a>
  </div>

  <div class="mt-6 flex place-content-center">
    <p class="ml-1">{{ idRange()[0] }} - {{ idRange()[1] }}</p>
    <p class="ml-2">of</p>
    <p class="ml-2 text-green-400">
      {{ storeCharacters.charactersCount }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStoreCharacters } from '@/stores/storeCharacters'

const storeCharacters = useStoreCharacters()

const idRange = () => {
  const currentPage = storeCharacters.requestFilters.page
  const charactersCount = storeCharacters.charactersCount
  const charactersLength = storeCharacters.characterItems.length

  if (charactersLength === 0) {
    return [0, 0]
  }

  return [
    (currentPage - 1) * 20 + 1,
    currentPage * 20 > charactersCount ? charactersCount : currentPage * 20,
  ]
}

const openCloseFilters = ref(true)
const filterCategories = storeCharacters.filterCategories
const selectedFilters = ref({
  name: '',
  status: 'all',
  species: 'all',
  type: 'all',
  gender: 'all',
})
Object.keys(selectedFilters.value).forEach((el) => {
  if (storeCharacters.requestFilters[el]) {
    selectedFilters.value[el] = storeCharacters.requestFilters[el]
  }
})
const setFilter = (filterName, subFilter) => {
  storeCharacters.setStoreFilters(filterName, subFilter)
}
const resetFilters = () => {
  selectedFilters.value.name = ''
  selectedFilters.value.status = 'all'
  selectedFilters.value.species = 'all'
  selectedFilters.value.type = 'all'
  selectedFilters.value.gender = 'all'
  storeCharacters.resetStoreFilters()
}

let animateIcon = ref(true)
if (!sessionStorage.getItem('iconAnimated')) {
  sessionStorage.setItem('iconAnimated', true)
} else {
  animateIcon.value = false
}
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
