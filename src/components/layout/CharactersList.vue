<template>
  <section class="h-full">
    <div class="mx-auto">
      <div
        v-if="storeCharacters.charactersLoading"
        class="flex max-w-full items-center justify-center text-2xl text-gray-200"
      >
        Characters loading...
      </div>

      <div
        v-else-if="storeCharacters.charactersCount > 0"
        class="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6"
      >
        <CharacterItem
          v-for="character in storeCharacters.characterItems"
          :key="character.id"
          :character="character"
        />
      </div>

      <div
        v-else
        class="flex max-w-full items-center justify-center text-2xl text-gray-200"
      >
        No characters found...
      </div>
    </div>
  </section>
</template>

<script setup>
import CharacterItem from '@/components/layout/CharacterItem.vue'
import { useStoreCharacters } from '@/stores/storeCharacters'

const storeCharacters = useStoreCharacters()
</script>
