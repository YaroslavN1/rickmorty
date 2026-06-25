<template>
  <div
    class="rounded-md border border-gray-200 bg-white p-1 drop-shadow-sm sm:p-2"
  >
    <a
      href="/"
      @click.prevent="isModalCharacterItemOpen = !isModalCharacterItemOpen"
    >
      <div class="mb-3 overflow-hidden rounded object-cover object-center">
        <img
          :class="{ hidden: imgLoaded }"
          src="@/images/avatar_placeholder.jpeg"
          alt="avatar"
        />
        <img
          :class="{ hidden: !imgLoaded }"
          :src="character.image"
          alt="avatar"
          @load="imgLoaded = true"
        />
      </div>
      <h2 class="text-xl font-semibold leading-snug text-gray-800">
        {{ character.name }}
      </h2>
      <div class="mb-2 text-sm">
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

defineProps({
  character: {
    type: Object,
    required: true,
  },
})

const imgLoaded = ref(false)

const isModalCharacterItemOpen = ref(false)
</script>
