<template>
  <div
    class="rounded-md border border-gray-200 bg-white px-2 pb-4 pt-2 drop-shadow-sm"
  >
    <a
      href="/"
      @click.prevent="isCharacterItemModalOpen = !isCharacterItemModalOpen"
    >
      <div class="mb-3">
        <img
          v-show="!imgLoaded"
          class="aspect-square w-full max-w-[300px] rounded object-cover object-center"
          :src="avatarPlaceholder"
          alt="avatar"
        />
        <img
          v-show="imgLoaded"
          class="aspect-square w-full max-w-[300px] rounded object-cover object-center"
          :src="character.image"
          :alt="character.name"
          @load="imgLoaded = true"
        />
      </div>
      <h2 class="text-xl font-semibold">
        {{ character.name }}
      </h2>
      <div class="text-sm">
        <span class="capitalize text-green-500"> Species: </span>
        <span>
          {{ character.species }}
        </span>
      </div>
    </a>

    <CharacterItemModal
      v-if="isCharacterItemModalOpen"
      :character="character"
      @close="isCharacterItemModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import avatarPlaceholder from '@/images/avatar_placeholder.jpeg'
import { Character } from '@/types/character'

defineProps<{
  character: Character
}>()

const imgLoaded = ref(false)

const isCharacterItemModalOpen = ref(false)
</script>
