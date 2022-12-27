<template>
  <teleport
    to=".modals-container"
  >
    <section class="modal-background text-gray-600 bg-white bg-opacity-95 flex justify-center items-center">
      <a
        href=""
        @click.prevent="closeModal()"
      >
        <div class="modal-container max-w-4xl flex flex-col sm:flex-row p-6 rounded-md border border-green-200 bg-white drop-shadow-2xl">
          <img class="object-cover max-w-2xl object-center rounded-md drop-shadow-md" :src="character.image" alt="blog">
          <div class="grow py-2 sm:pl-8 sm:pr-28">
            <h2 class="text-4xl font-semibold mb-3">{{ character.name }}</h2>
            <div
              v-for="entry in characterFiltered"
              :key="entry"
            >
              <span
                class="text-green-500 capitalize"
              >
                {{ entry[0] }}:
              </span>
              <span>
                {{ entry[1] === '' ? '-' : entry[1] }}
              </span>
            </div>
          </div>
        </div>
      </a>
    </section>
  </teleport>
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
    characterModal: {
      type: Boolean,
      default: false
    }
  })
/* 
  emits
*/

  const emit = defineEmits(['update:characterModal'])

/* 
  close character card
*/

  const closeModal = () => {
    emit('update:characterModal', false)
  }

/* 
  character prop destructure
*/

  const characterKeys = ref(['status', 'species', 'type', 'gender', 'created', 'origin', 'location'])

  const characterFiltered = Object.entries(props.character).filter(el => characterKeys.value.some(key => el[0] === key))

  characterFiltered.forEach(i => {
    if(i[0] === 'origin' || i[0] === 'location') {
      i[1] = i[1].name
    }
  })

</script>

<style scoped>

.modal-background {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1;
}

</style>