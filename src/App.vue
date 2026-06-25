<template>
  <div id="app">
    <PageHeader />

    <main class="modals-container mx-auto mt-4 max-w-5xl p-6">
      <CharacterFilters />

      <NavigationButtons class="mt-6" />

      <CharactersList class="my-10" />

      <NavigationButtons class="mb-6" />
    </main>

    <PageFooter />
  </div>
</template>

<script setup>
import PageHeader from '@/components/layout/PageHeader.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import CharacterFilters from '@/components/layout/CharacterFilters.vue'
import NavigationButtons from '@/components/navigation/NavigationButtons.vue'
import CharactersList from '@/components/layout/CharactersList.vue'
import { useStoreCharacters } from '@/stores/storeCharacters'

const storeCharacters = useStoreCharacters()

storeCharacters.init()
</script>
