<template>
  <section class="body-font">
    <div class="px-5 py-20 mx-auto max-w-7xl">
      <NavigationButtons />

      <CharacterFilters />

      <div class="text-2xl mb-6">
        Found: {{ storeCharacters.charactersCount }}
      </div>
      
      <div
        v-if="storeCharacters.charactersFound"
        class="grid grid-cols-4 grid-rows-2 gap-16"
      >
        <CharacterItem
          v-for="character in storeCharacters.characterItems"
          :key="character.id"
          :character="character"
        />
      </div>
      <div
        v-else
        class="text-slate-400 text-3xl max-w-full flex justify-center align-middle"
      >
        no characters found
      </div>
    </div>
  </section>
</template>

<script setup>

/* 
  imports
*/

  import CharacterItem from '@/components/layout/CharacterItem.vue'
  import CharacterFilters from '@/components/layout/CharacterFilters.vue'
  import NavigationButtons from '@/components/layout/NavigationButtons.vue'
  import { useStoreCharacters } from '@/stores/storeCharacters'

/* 
  stores
*/

 const storeCharacters = useStoreCharacters()

</script>

