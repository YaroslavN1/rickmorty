<template>
  <div class="buttons-wrapper flex justify-center lg:flex-col-1/2 mb-10">
    <button
      :disabled="storeCharacters.requestFilters.page === 1"
      class="disabled:pointer-events-none disabled:text-slate-200 px-6 mr-5 text-xl focus:outline-none border hover:border-green-300 rounded transition-colors duration-100 ease-in-out"
      @click="storeCharacters.goToPage(1)"
    >
      First
    </button>

    <button
      :disabled="storeCharacters.requestFilters.page === 1"
      class="disabled:pointer-events-none disabled:text-slate-200 py-2 px-6 focus:outline-none hover: border hover:border-green-300 rounded text-lg"
      @click="storeCharacters.previousPage"
    >
      &lt;
    </button>

    <input
      id="pageNumber"
      v-model="storeCharacters.requestFilters.page"
      type="number"
      min="1"
      max="42"
      class="w-20 mx-1 rounded border border-gray-100 focus:border-green-300 focus:ring-5 focus:ring-green-200 text-center outline-none text-gray-700 transition-colors duration-200 ease-in-out"
      @focusout="storeCharacters.getCharacters"
      @keyup.enter="storeCharacters.getCharacters"
    >

    <button
      :disabled="storeCharacters.requestFilters.page === storeCharacters.lastPage || storeCharacters.characterItems.length < 20"
      class="disabled:pointer-events-none disabled:text-slate-200 py-2 px-6 focus:outline-none hover: border hover:border-green-300 rounded text-lg"
      @click="storeCharacters.nextPage"
    >
      &gt;
    </button>

    <button
      :disabled="storeCharacters.requestFilters.page === storeCharacters.lastPage"
      class="disabled:pointer-events-none disabled:text-slate-200 px-6 ml-5 text-xl focus:outline-none border hover:border-green-300 rounded"
      @click="storeCharacters.goToPage(storeCharacters.lastPage)"
    >
      Last
    </button>
  </div>
</template>

<script setup>
/* 
  imports
*/

  import { useStoreCharacters } from '@/stores/storeCharacters'

/* 
  stores
*/

  const storeCharacters = useStoreCharacters()

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