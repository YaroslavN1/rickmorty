<template>
  <div id="app" class="text-slate-600">
    <header>
      <PageHeader />
    </header>

    <main class="modals-container relative mx-auto mt-4 max-w-5xl p-6">
      <CharacterFilters />

      <NavigationButtons class="mt-6" />

      <CharactersList class="my-10" />

      <NavigationButtons class="mb-6" />
    </main>

    <footer>
      <PageFooter />
    </footer>
  </div>
</template>

<script setup>
import PageHeader from '@/components/layout/PageHeader.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import CharacterFilters from '@/components/layout/CharacterFilters.vue'
import NavigationButtons from '@/components/layout/NavigationButtons.vue'
import CharactersList from '@/components/layout/CharactersList.vue'
import { useStoreCharacters } from '@/stores/storeCharacters'

const storeCharacters = useStoreCharacters()

storeCharacters.init()
</script>
