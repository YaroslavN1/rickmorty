<template>
  <div
    class="p-3 border rounded border-gray-200 bg-white"
  >
    <ModalCharacterItem
      v-if="modals.characterItem"
      v-model:characterModal="modals.characterItem"
      :character="character"
    />
    <a
      href="/"
      @click.prevent="modals.characterItem = !modals.characterItem"
    >
      <div
        class="mb-3 object-cover object-center rounded drop-shadow"
      >
        <img
          :class="{ hidden: imgLoaded}"
          src="@/images/avatar_placeholder.jpeg"
          alt="avatar"
        >
        <img
          :class="{ hidden: !imgLoaded}"
          :src="character.image"
          alt="avatar"
          @load="onImgLoaded"
        >
      </div>
      <h2 class="character-name text-gray-800 text-xl font-semibold leading-snug">{{ character.name }}</h2>
      <div class="text-sm mb-2">
        <span
          class="text-green-500 capitalize"
        >
          Species:
        </span>
        <span>
          {{ character.species }}
        </span>
      </div>
    </a>
  </div>
</template>

<script setup>

/* 
  imports
*/

  import { ref, reactive } from 'vue'
  import ModalCharacterItem from '@/components/layout/ModalCharacterItem.vue'

/*
  props
*/

  const props = defineProps({
    character: {
      type: Object,
      required: true
    },
    filter: {
      type: String,
      default: '.'
    },
    subFilter: {
      type: String,
      default: ''
    }
  })

/* 
  image loaded
*/

  const imgLoaded = ref(false)
  const onImgLoaded = () => {
    imgLoaded.value = true
  }

/* 
  modals
*/

const modals = reactive({
  characterItem: false
})

</script>