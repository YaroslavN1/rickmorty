<template>
  <div 
    id="app"
    class="characters-list text-slate-600"
  >
    <main
      class=" max-w-7xl mx-auto mt-20"
    >
      <div class="modals-container" />

      <NavigationButtons />

      <CharacterFilters />
      <div class="text-2xl mb-6">
        Found: {{ storeCharacters.charactersCount }} {{ storeCharacters.charactersCount === 1 ? 'character' : 'characters' }}.
      </div>
      <Suspense>
        <CharactersList />
        <template #fallback>
          LOADING.....
        </template>
      </Suspense>
    </main>
  </div>
</template>

<script setup>

/* 
  imports
*/
  import CharacterFilters from '@/components/layout/CharacterFilters.vue'
  import NavigationButtons from '@/components/layout/NavigationButtons.vue'
  import CharactersList from '@/components/layout/CharactersList.vue'
  import { useStoreCharacters } from '@/stores/storeCharacters'

/* 
  stores
*/

 const storeCharacters = useStoreCharacters()

/* 
  mounted
*/

  storeCharacters.init()

</script>

<style scoped>

.modals-container {
  position: relative;
}

</style>