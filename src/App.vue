<template>
  <div 
    id="app"
    class="characters-list text-slate-600"
  >
    <header>
      <PageHeader />
    </header>

    <main class="max-w-5xl modals-container relative mx-auto mt-4 p-6">
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

/* 
  imports
*/
  import PageHeader from '@/components/layout/PageHeader.vue'
  import PageFooter from '@/components/layout/PageFooter.vue'
  import CharacterFilters from '@/components/layout/CharacterFilters.vue'
  import NavigationButtons from '@/components/layout/NavigationButtons.vue'
  import CharactersList from '@/components/layout/CharactersList.vue'
  import { useStoreCharacters } from '@/stores/storeCharacters'

/* 
  stores
*/

 const storeCharacters = useStoreCharacters()

/* 
  hydrate store
*/

  storeCharacters.init()

</script>