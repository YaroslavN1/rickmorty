<template>
  <div class="flex h-8 justify-center">
    <NavigationButton
      :disabled="isFirstPage"
      @click="storeCharacters.goToPage(1)"
    >
      First
    </NavigationButton>

    <NavigationButton
      class="ml-5"
      :disabled="isFirstPage"
      @click="storeCharacters.movePage(-1)"
    >
      &lt;
    </NavigationButton>

    <input
      id="pageNumber"
      :value="storeCharacters.requestFilters.page"
      type="number"
      class="mx-1 w-14 rounded border border-gray-100 text-center outline-none drop-shadow-sm focus:border-green-300"
      @focusout="onPageNumberInput"
      @keyup.enter="onPageNumberInput"
    />

    <NavigationButton
      :disabled="isLastPage"
      @click="storeCharacters.movePage(1)"
    >
      &gt;
    </NavigationButton>

    <NavigationButton
      class="ml-5"
      :disabled="isLastPage"
      @click="storeCharacters.goToPage(storeCharacters.lastPage)"
    >
      Last
    </NavigationButton>
  </div>
</template>

<script setup>
import NavigationButton from './NavigationButton.vue'
import { useStoreCharacters } from '@/stores/storeCharacters'
import { computed } from 'vue'

const storeCharacters = useStoreCharacters()

const isFirstPage = computed(() => storeCharacters.requestFilters.page === 1)
const isLastPage = computed(
  () => storeCharacters.requestFilters.page === storeCharacters.lastPage,
)

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
