<template>
  <div 
    id="app"
    class="characters-list"
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
  import { onMounted } from 'vue'
  import { useStoreCharacters } from '@/stores/storeCharacters'

/* 
  stores
*/

 const storeCharacters = useStoreCharacters()

/* 
  mounted
*/
  onMounted(() => {
    storeCharacters.init()
  })

</script>

<style>
</style>