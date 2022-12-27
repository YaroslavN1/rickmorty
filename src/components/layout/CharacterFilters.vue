<template>
  <div class="filters-wrapper grid grid-cols-1 gap-1">
    <input
      id="characterName"
      v-model="characterName"
      placeholder="Search by name..."
      type="text"
      class="justify-self-center w-2/5 h-7 mt-2 rounded border text-center focus:border-green-300 focus:ring-5 focus:ring-green-200 outline-none transition-colors duration-200 ease-in-out"
      @input="storeCharacters.searchByName(characterName)"
    >
    <label for="dropdown">
      <span
        class="text-green-500 mr-4"
      >
        Status: 
      </span>
      <select
        id="filters"
        v-model="selectedFilter.status"
        class="capitalize outline-0"
        name="filters"
        @change="setFilter('status', selectedFilter.status)"
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
        class="text-green-500"
      >
        Species: 
      </span>
      <select
        id="filters"
        v-model="selectedFilter.species"
        class="capitalize outline-0"
        name="filters"
        @change="setFilter('species', selectedFilter.species)"
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
        class="capitalize outline-0"
        name="filters"
        @change="setFilter('type', selectedFilter.type)"
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
        class="capitalize outline-0"
        name="filters"
        @change="setFilter('gender', selectedFilter.gender)"
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

    <a
      v-if="Object.keys(storeCharacters.requestFilters).length > 1"
      href=""
      class="text-red-400 hover:text-red-300 transition-colors duration-100 ease-in-out"
      @click.prevent="resetFilters"
    >
      clear filters
    </a>

    <div
      class="justify-self-center mt-3 flex"
    >
      <p class="ml-1">
        {{ idRange()[0] }} - {{ idRange()[1] }}
      </p>
      <p class="ml-2">of</p>
      <p class="text-green-400 ml-2">
        {{ storeCharacters.charactersCount }}
      </p>
    </div>
  </div>
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
  characters id range
*/

  const idRange = () => {
    let range = []
    let arr = [...storeCharacters.characterItems]
    range.push(storeCharacters.characterItems[0]?.id)
    range.push(arr.reverse()[0]?.id)
    return range
  }

  console.log(idRange())

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