<template>
  <div
    class="rounded-md border border-gray-200 bg-white p-1 drop-shadow-sm sm:p-2"
  >
    <ModalCharacterItem
      v-if="modals.characterItem"
      v-model:character-modal="modals.characterItem"
      :character="character"
    />
    <a href="/" @click.prevent="modals.characterItem = !modals.characterItem">
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
      <h2
        class="character-name text-xl font-semibold leading-snug text-gray-800"
      >
        {{ character.name }}
      </h2>
      <div class="mb-2 text-sm">
        <span class="capitalize text-green-500"> Species: </span>
        <span>
          {{ character.species }}
        </span>
      </div>
    </a>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ModalCharacterItem from '@/components/layout/ModalCharacterItem.vue'

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
  filter: {
    type: String,
    default: '.',
  },
  subFilter: {
    type: String,
    default: '',
  },
})

const imgLoaded = ref(false)

const modals = reactive({
  characterItem: false,
})
</script>
