<template>
  <div class="buttons-wrapper flex h-8 justify-center">
    <button
      :disabled="storeCharacters.requestFilters.page === 1"
      class="rounded border bg-white px-4 drop-shadow-sm transition-colors duration-100 ease-in-out hover:border-green-300 focus:outline-none disabled:pointer-events-none disabled:text-slate-200"
      @click="storeCharacters.goToPage(1)"
    >
      First
    </button>

    <button
      :disabled="storeCharacters.requestFilters.page <= 1"
      class="ml-5 rounded border bg-white px-4 drop-shadow-sm hover:border-green-300 focus:outline-none disabled:pointer-events-none disabled:text-slate-200"
      @click="storeCharacters.movePage(-1)"
    >
      &lt;
    </button>

    <input
      id="pageNumber"
      :value="storeCharacters.requestFilters.page"
      type="number"
      class="mx-1 w-14 rounded border border-gray-100 bg-white text-center text-gray-700 outline-none drop-shadow-sm transition-colors duration-200 ease-in-out focus:border-green-300"
      @focusout="onPageNumberInput"
      @keyup.enter="onPageNumberInput"
    />

    <button
      :disabled="
        storeCharacters.requestFilters.page >= storeCharacters.lastPage
      "
      class="rounded border bg-white px-4 drop-shadow-sm hover:border hover:border-green-300 focus:outline-none disabled:pointer-events-none disabled:text-slate-200"
      @click="storeCharacters.movePage(1)"
    >
      &gt;
    </button>

    <button
      :disabled="
        storeCharacters.requestFilters.page >= storeCharacters.lastPage
      "
      class="ml-5 rounded border bg-white px-4 drop-shadow-sm hover:border-green-300 focus:outline-none disabled:pointer-events-none disabled:text-slate-200"
      @click="storeCharacters.goToPage(storeCharacters.lastPage)"
    >
      Last
    </button>
  </div>
</template>

<script setup>
import { useStoreCharacters } from '@/stores/storeCharacters'

const storeCharacters = useStoreCharacters()

const onPageNumberInput = ({ target: { value } }) => {
  storeCharacters.requestFilters.page = Math.max(
    Math.min(Math.round(parseInt(value)), storeCharacters.lastPage),
    1,
  )
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
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
