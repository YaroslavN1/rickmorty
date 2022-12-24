<template>
  <div 
    id="app"
    class="characters-list text-slate-600"
  >
    <Suspense>
      <CharactersList />
      <template #fallback>
        LOADING.....
      </template>
    </Suspense>
  </div>
</template>

<script setup>

/* 
  imports
*/

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

<style>
</style>