<template>
  <section class="flex flex-1 flex-col">
    <div
      v-if="characters.length > 0"
      class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6"
    >
      <CharacterItem
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>

    <div
      v-else
      class="flex flex-1 items-center justify-center text-xl text-gray-400"
    >
      <p v-if="charactersLoading">Loading...</p>
      <p v-else-if="fetchingError">Server error</p>
      <p v-else>No characters found</p>
    </div>
  </section>
</template>

<script setup>
import CharacterItem from '@/components/characters/character/CharacterItem.vue'
import { useStoreCharacters } from '@/stores/storeCharacters'
import { storeToRefs } from 'pinia'

const { charactersLoading, fetchingError, characters } =
  storeToRefs(useStoreCharacters())
</script>
