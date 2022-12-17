<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-20 mx-auto max-w-7xl">
      <div class="buttons-wrapper flex justify-center lg:flex-col-1/2 mb-12">
        <button
          :disabled="storeCharacters.requestFilters.page === 1"
          class="disabled:pointer-events-none disabled:text-slate-200 text-green-500 py-2 px-6 focus:outline-none hover: border hover:border-green-300 rounded text-lg"
          @click="storeCharacters.previousPage"
        >
          &lt;
        </button>

        <input
          id="pageNumber"
          v-model="storeCharacters.requestFilters.page"
          type="number"
          class="page-number w-20 rounded border border-gray-100 focus:border-green-300 focus:ring-5 focus:ring-green-200 text-center outline-none text-gray-700 mx-3 transition-colors duration-200 ease-in-out"
          @focusout="storeCharacters.getCharacters"
          @keyup.enter="storeCharacters.getCharacters"
        >

        <button
          class="text-green-500 py-2 px-6 focus:outline-none hover: border hover:border-green-300 rounded text-lg"
          @click="storeCharacters.nextPage"
        >
          &gt;
        </button>
      </div>

      <div class="filters-wrapper flex mb-6">
        <div class="filters-main">
          <label for="dropdown" class="text-green-500 mr-4">
            Category:
          </label>
          <select
            id="filters"
            v-model="selectedMainFilter"
            class="capitalize outline-0 mr-4"
            name="filters"
          >
            <option selected value="" class="text-center">
              all
            </option>

            <option
              v-for="filter in storeCharacters.filterCategories"
              :key="filter.id"
              option-class="capitalize"
              class="capitalize"
              :value="filter"
            >
              {{ filter.name }}
            </option>
          </select>

          <select
            v-if="selectedMainFilter"
            id="sub-filters"
            v-model="selectedSubFilter"
            name="sub-filters"
            class="capitalize outline-0 inline-block"
          >
            <option v-if="selectedMainFilter.subFilters.length === 0" selected value="" style="color: lightgray">
              loading...
            </option>

            <option v-if="selectedMainFilter.subFilters.length !== 0" selected value="" class="text-center">
              -
            </option>

            <option v-for="subFilter in selectedMainFilter.subFilters" :key="subFilter" :value="subFilter">
              {{ subFilter }}
            </option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-4 grid-rows-2 gap-16">
        <CharacterItem
          v-for="character in filteredCharacters()"
          :key="character.id"
          :character="character"
        />
      </div>
    </div>
  </section>
</template>

<script setup>

/* 
  imports
*/

import { ref } from 'vue'
import CharacterItem from '@/components/layout/CharacterItem.vue'
import { useStoreCharacters } from '@/stores/storeCharacters'

/* 
  stores
*/

 const storeCharacters = useStoreCharacters()


/* 
  filters
*/

  const selectedMainFilter = ref('')
  const selectedSubFilter = ref('')
  const filteredCharacters = () => {
    if(selectedSubFilter.value === '') {
      return storeCharacters.allCharacterItems.filter(el => el.id <= 20)
    } else {
      storeCharacters.getFilteredCharacters(selectedSubFilter.value)
    }
  }

// else {
//       console.log(storeCharacters.allCharacterItems.filter(el => el[selectedMainFilter.value] === selectedSubFilter.value)
//       )
//     }

</script>

<style scoped>


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>