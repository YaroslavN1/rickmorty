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
import { useCharactersStore } from '@/stores/charactersStore'

const charactersStore = useCharactersStore()

charactersStore.init()
</script>
