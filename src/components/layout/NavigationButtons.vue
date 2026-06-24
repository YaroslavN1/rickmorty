<template>
  <div class="flex h-8 justify-center">
    <NavigationButton :disabled="isFirstPage" @click="goToPage(1)">
      First
    </NavigationButton>

    <NavigationButton
      class="ml-5"
      :disabled="isFirstPage"
      @click="movePage(-1)"
    >
      &lt;
    </NavigationButton>

    <input
      id="pageNumber"
      ref="pageInputRef"
      :value="requestFilters.page"
      type="number"
      class="mx-1 w-14 rounded border border-gray-100 text-center outline-none drop-shadow-sm focus:border-green-300"
      @focusout="(el) => goToPage(el.target.value)"
      @keyup.enter="(el) => goToPage(el.target.value)"
    />

    <NavigationButton :disabled="isLastPage" @click="movePage(1)">
      &gt;
    </NavigationButton>

    <NavigationButton
      class="ml-5"
      :disabled="isLastPage"
      @click="goToPage(lastPage)"
    >
      Last
    </NavigationButton>
  </div>
</template>

<script setup>
import NavigationButton from './NavigationButton.vue'
import { useStoreCharacters } from '@/stores/storeCharacters'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const storeCharacters = useStoreCharacters()
const { requestFilters, lastPage } = storeToRefs(storeCharacters)

const pageInputRef = ref(null)

const isFirstPage = computed(() => requestFilters.value.page === 1)
const isLastPage = computed(() => requestFilters.value.page === lastPage.value)

const clampPage = (page) => Math.max(Math.min(page, lastPage.value), 1)

const goToPage = (page) => {
  const parsedPage = parseInt(page)
  const isValidPage = !Number.isNaN(parsedPage)
  const clampedPage = clampPage(parsedPage)
  const isCurrentPage = clampedPage === requestFilters.value.page

  if (isValidPage && !isCurrentPage) {
    requestFilters.value.page = clampedPage
    storeCharacters.getCharacters()
  }

  pageInputRef.value.value = requestFilters.value.page
}

const movePage = (pageOffset) => {
  goToPage(requestFilters.value.page + pageOffset)
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
