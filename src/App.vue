<template>
  <div 
    id="app"
    class="characters-list text-slate-600"
  >
    <main
      class="max-w-5xl mx-auto p-10"
    >
      <div class="modals-container" />

      <CharacterFilters />

      <NavigationButtons
        class="mt-6"
      />

      <Suspense>
        <CharactersList
          class="mt-8"
        />
        <template #fallback>
          Loading characters...
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