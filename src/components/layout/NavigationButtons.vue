<template>
  <div class="buttons-wrapper h-8 flex justify-center">
    <button
      :disabled="storeCharacters.requestFilters.page === 1"
      class="px-4 rounded disabled:pointer-events-none disabled:text-slate-200 focus:outline-none border drop-shadow-sm bg-white hover:border-green-300 transition-colors duration-100 ease-in-out"
      @click="storeCharacters.goToPage(1)"
    >
      First
    </button>

    <button
      :disabled="storeCharacters.requestFilters.page <= 1"
      class="px-4 ml-5 drop-shadow-sm bg-white disabled:pointer-events-none disabled:text-slate-200 focus:outline-none border hover:border-green-300 rounded"
      @click="storeCharacters.movePage(-1)"
    >
      &lt;
    </button>

    <input
      id="pageNumber"
      :value="storeCharacters.requestFilters.page"
      type="number"
      class="w-14 mx-1 text-gray-700 rounded border border-gray-100 drop-shadow-sm bg-white focus:border-green-300 text-center outline-none transition-colors duration-200 ease-in-out"
      @focusout="onPageNumberInput"
      @keyup.enter="onPageNumberInput"
    >

    <button
      :disabled="storeCharacters.requestFilters.page >= storeCharacters.lastPage"
      class="px-4 border drop-shadow-sm bg-white disabled:pointer-events-none disabled:text-slate-200 focus:outline-none hover:border hover:border-green-300 rounded"
      @click="storeCharacters.movePage(1)"
    >
      &gt;
    </button>

    <button
      :disabled="storeCharacters.requestFilters.page >= storeCharacters.lastPage"
      class="px-4 ml-5 rounded drop-shadow-sm bg-white disabled:pointer-events-none disabled:text-slate-200 focus:outline-none border hover:border-green-300"
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

/* 
  page number input
*/

  const onPageNumberInput = ({ target: { value }}) => {
    storeCharacters.requestFilters.page = Math.max(Math.min(Math.round(parseInt(value)), storeCharacters.lastPage), 1)
    storeCharacters.getCharacters()
  }

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