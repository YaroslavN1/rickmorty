<template>
  <div
    class="rounded-md border border-gray-200 bg-white px-2 pb-4 pt-2 drop-shadow-sm"
  >
    <a
      href="/"
      @click.prevent="isModalCharacterItemOpen = !isModalCharacterItemOpen"
    >
      <div class="mb-3 overflow-hidden rounded">
        <img v-show="!imgLoaded" :src="avatarPlaceholder" alt="avatar" />
        <img
          v-show="imgLoaded"
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

    <ModalCharacterItem
      v-if="isModalCharacterItemOpen"
      v-model:is-open="isModalCharacterItemOpen"
      :character="character"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModalCharacterItem from '@/components/characters/character/ModalCharacterItem.vue'
import avatarPlaceholder from '@/images/avatar_placeholder.jpeg'

defineProps({
  character: {
    type: Object,
    required: true,
  },
})

const imgLoaded = ref(false)

const isModalCharacterItemOpen = ref(false)
</script>
