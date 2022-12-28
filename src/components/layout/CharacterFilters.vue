<template>
  <div class="filters-wrapper grid grid-cols-1 gap-1">
    <input
      id="characterName"
      v-model="selectedFilters.name"
      placeholder="Search by name..."
      type="text"
      class="justify-self-center w-2/5 h-7 mt-2 rounded border text-center focus:border-green-300 focus:ring-5 focus:ring-green-200 outline-none transition-colors duration-200 ease-in-out"
      @input="storeCharacters.searchByName(selectedFilters.name)"
    >
    <label for="dropdown">
      <span
        class="text-green-500 mr-4"
      >
        Status: 
      </span>
      <select
        id="filters"
        v-model="selectedFilters.status"
        class="capitalize outline-0"
        name="filters"
        @change="setFilter('status', selectedFilters.status)"
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
        v-model="selectedFilters.species"
        class="capitalize outline-0"
        name="filters"
        @change="setFilter('species', selectedFilters.species)"
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
        v-model="selectedFilters.type"
        class="capitalize outline-0"
        name="filters"
        @change="setFilter('type', selectedFilters.type)"
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
        v-model="selectedFilters.gender"
        class="capitalize outline-0"
        name="filters"
        @change="setFilter('gender', selectedFilters.gender)"
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

  // const idRange = ref([1, 20])
  const idRange = () => {
    let range = []
    if(storeCharacters.requestFilters.page !== storeCharacters.lastPage) {
      range.push(1 + (storeCharacters.requestFilters.page - 1) * storeCharacters.characterItems.length)
      range.push(storeCharacters.requestFilters.page * storeCharacters.characterItems.length)
      return range
    } else {
      range.push(storeCharacters.charactersCount - (storeCharacters.characterItems.length - 1))
      range.push(storeCharacters.charactersCount)
      return range
    }
  }
/* 
  get filters
*/

  const filterCategories = storeCharacters.filterCategories

  const [{subFilters: statusFilters}, {subFilters: speciesFilters}, {subFilters: typeFilters}, {subFilters: genderFilters}] = filterCategories

/* 
  selected filters default
*/

  const selectedFilters = ref({
    name: '',
    status: 'all',
    species: 'all',
    type: 'all',
    gender: 'all'
  })

/* 
  update selected filters from session storage
*/

  Object.keys(selectedFilters.value).forEach(el => {
        if(storeCharacters.requestFilters[el]) {
          selectedFilters.value[el] = storeCharacters.requestFilters[el]
        }
      })
  
/* 
  reset filters
*/
  const resetFilters = () => {
    selectedFilters.value.status = 'all'
    selectedFilters.value.species = 'all'
    selectedFilters.value.type = 'all'
    selectedFilters.value.gender = 'all'
    selectedFilters.value.name = ''
    storeCharacters.resetStoreFilters()
  }


/* 
  set request filter in store
*/

  const setFilter = (filterName, subFilter) => {
    storeCharacters.setStoreFilters(filterName, subFilter)
  }

</script>