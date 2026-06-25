<template>
  <section class="flex flex-1 flex-col">
    <div
      v-if="storeCharacters.charactersLoading"
      class="flex flex-1 items-center justify-center text-xl text-gray-400"
    >
      Loading...
    </div>

    <div
      v-else-if="storeCharacters.charactersCount > 0"
      class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6"
    >
      <CharacterItem
        v-for="character in storeCharacters.characterItems"
        :key="character.id"
        :character="character"
      />
    </div>

    <div
      v-else
      class="flex flex-1 items-center justify-center text-xl text-gray-400"
    >
      No characters found...
    </div>
  </section>
</template>

<script setup>
import CharacterItem from '@/components/characters/character/CharacterItem.vue'
import { useStoreCharacters } from '@/stores/storeCharacters'

const storeCharacters = useStoreCharacters()
</script>
