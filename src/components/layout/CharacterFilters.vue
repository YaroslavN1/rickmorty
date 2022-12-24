<template>
  <div class="filters-wrapper flex flex-col align-items-start mb-6">
    <label for="dropdown">
      <span
        class="text-green-500 mr-4"
      >
        Status: 
      </span>
      <select
        id="filters"
        v-model="selectedFilter.status"
        @change="setFilter('status', selectedFilter.status)"
        class="capitalize outline-0 mr-4"
        name="filters"
      >
        <option selected value="all">
          - all
        </option>

        <option
          v-for="filter in statusFilters"
          :key="filter"
          :value="filter"
        >
          {{ filter }}
        </option>
      </select>
    </label>

    <label for="dropdown">
      <span
        class="text-green-500 mr-4"
      >
        Species: 
      </span>
      <select
        id="filters"
        v-model="selectedFilter.species"
        @change="setFilter('species', selectedFilter.species)"
        class="capitalize outline-0 mr-4"
        name="filters"
      >
        <option selected value="all">
          - all
        </option>

        <option
          v-for="filter in speciesFilters"
          :key="filter"
          :value="filter"
        >
          {{ filter }}
        </option>
      </select>
    </label>

    <label for="dropdown">
      <span
        class="text-green-500 mr-4"
      >
        Type: 
      </span>
      <select
        id="filters"
        v-model="selectedFilter.type"
        @change="setFilter('type', selectedFilter.type)"
        class="capitalize outline-0 mr-4"
        name="filters"
      >
        <option selected value="all">
          - all
        </option>

        <option
          v-for="filter in typeFilters"
          :key="filter"
          :value="filter"
        >
          {{ filter }}
        </option>
      </select>
    </label>

    <label for="dropdown">
      <span
        class="text-green-500 mr-4"
      >
        Gender: 
      </span>
      <select
        id="filters"
        v-model="selectedFilter.gender"
        @change="setFilter('gender', selectedFilter.gender)"
        class="capitalize outline-0 mr-4"
        name="filters"
      >
        <option selected value="all">
          - all
        </option>

        <option
          v-for="filter in genderFilters"
          :key="filter"
          :value="filter"
        >
          {{ filter }}
        </option>
      </select>
    </label>

    <input
      id="characterName"
      v-model="characterName"
      type="text"
      class="w-20 mx-1 rounded border border-green-300 focus:border-green-300 focus:ring-5 focus:ring-green-200 text-center outline-none text-gray-700 transition-colors duration-200 ease-in-out"
      @input="storeCharacters.searchByName(characterName)"
    >
  </div>

  <a
      href=""
      @click.prevent="resetFilters"
      class="text-red-400 hover:text-red-300 transition-colors duration-100 ease-in-out"
    >
      reset filters
    </a>
</template>

<script setup>
/* 
  imports
*/

  import { ref } from 'vue'
  import { useStoreCharacters } from '@/stores/storeCharacters'

/* 
  stores
*/

  const storeCharacters = useStoreCharacters()

/* 
  filters
*/

  const filterCategories = storeCharacters.filterCategories

  const [{subFilters: statusFilters}, {subFilters: speciesFilters}, {subFilters: typeFilters}, {subFilters: genderFilters}] = filterCategories

/* 
  selected filters
*/

  const selectedFilter = ref({
    status: 'all',
    species: 'all',
    type: 'all',
    gender: 'all'
  })
  
  const resetFilters = () => {
    selectedFilter.value.status = 'all'
    selectedFilter.value.species = 'all'
    selectedFilter.value.type = 'all'
    selectedFilter.value.gender = 'all'
    characterName.value = ''
    storeCharacters.resetStoreFilters()
  }

  const characterName = ref('')

/* 
  set request filter in store
*/

  const setFilter = (filterName, subFilter) => {
    storeCharacters.setStoreFilters(filterName, subFilter)
  }

</script>