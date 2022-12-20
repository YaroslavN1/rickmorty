<template>
  <a href="/">
    <img
      v-if="!imgLoaded"
      class="object-cover object-center rounded-lg mb-4"
      src="@/images/avatar_placeholder.jpeg"
      alt="avatar"
    >
    <img
      class="object-cover object-center rounded-lg mb-4"
      :class="{ hidden: !imgLoaded}"
      :src="character.image"
      alt="avatar"
      @load="onImgLoaded"
    >
    <h2 class="text-gray-900 character-name font-semibold mb-1">{{ character.name }}</h2>
    <div class="text-lg font-semibold">
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
</template>

<script setup>

/* 
  imports
*/

  import { ref } from 'vue'

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

</script>

<style scoped>
.character-name {
  font-size: 17px;
  line-height: 1.1;
}
</style>