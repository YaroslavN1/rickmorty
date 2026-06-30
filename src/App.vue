<template>
  <div id="app" class="flex min-h-screen flex-col">
    <PageHeader />

    <main
      class="modals-container mx-auto mt-4 flex max-w-5xl flex-1 flex-col p-6"
    >
      <CharactersFilters />

      <CharactersPageRange />

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
import CharactersFilters from '@/components/characters/CharactersFilters.vue'
import CharactersPageRange from '@/components/characters/CharactersPageRange.vue'
import NavigationButtons from '@/components/navigation/NavigationButtons.vue'
import CharactersList from '@/components/characters/CharactersList.vue'
import { useCharactersStore } from '@/stores/charactersStore'

const charactersStore = useCharactersStore()

charactersStore.init()
</script>
