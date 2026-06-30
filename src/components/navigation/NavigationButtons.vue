<template>
  <div class="flex h-8 justify-center">
    <BaseButton
      class="rounded px-4"
      :disabled="isFirstPage"
      @click="goToPage(1)"
    >
      First
    </BaseButton>

    <BaseButton
      class="ml-5 rounded px-4"
      :disabled="isFirstPage"
      @click="movePage(-1)"
    >
      &lt;
    </BaseButton>

    <BaseInput
      v-model="pageInput"
      type="number"
      class="mx-1 w-14 rounded"
      @focusout="goToPage(pageInput)"
      @keyup.enter="goToPage(pageInput)"
    />

    <BaseButton
      class="rounded px-4"
      :disabled="isLastPage"
      @click="movePage(1)"
    >
      &gt;
    </BaseButton>

    <BaseButton
      class="ml-5 rounded px-4"
      :disabled="isLastPage"
      @click="goToPage(lastPage)"
    >
      Last
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useCharactersStore } from '@/stores/charactersStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const charactersStore = useCharactersStore()
const { requestFilters, lastPage } = storeToRefs(charactersStore)

const pageInput = ref(requestFilters.value.page)

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
    charactersStore.getCharacters()
  }

  pageInput.value = requestFilters.value.page
}

const movePage = (pageOffset) => {
  goToPage(requestFilters.value.page + pageOffset)
}
</script>
