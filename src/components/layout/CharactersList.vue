<template>
  <section class="body-font">
    <div class="py-20 mx-auto">
      <div
        v-if="storeCharacters.charactersLoading"
      >
        Characters loading...
      </div>

      <div
        v-else-if="storeCharacters.charactersFound"
        class="grid sm:grid-cols-2 md:grid-cols-4 justify-items-center gap-16"
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
        No characters found
      </div>
    </div>
  </section>
</template>

<script setup>

/* 
  imports
*/

  import CharacterItem from '@/components/layout/CharacterItem.vue'
  import { useStoreCharacters } from '@/stores/storeCharacters'

/* 
  stores
*/

 const storeCharacters = useStoreCharacters()

</script>

