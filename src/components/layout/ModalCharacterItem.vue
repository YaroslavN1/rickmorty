<template>
  <teleport
    to=".modals-container"
  >
    <section class="card-background text-gray-600 bg-white bg-opacity-95 flex justify-center items-center">
      <a
        href=""
        @click.prevent="closeModal()"
      >
        <div class="card-container flex flex-col sm:flex-row p-6 rounded-xl overflow-hidden whitespace-normal bg-white drop-shadow-2xl">
          <img class="avatar object-cover object-center rounded-md" :src="character.image" alt="blog">
          <div class="py-8 sm:px-12">
            <h2 class="text-5xl font-semibold mb-4">{{ character.name }}</h2>
            <div
              v-for="entry in characterFilteredKeys"
              :key="entry"
              class="text-2xl font-semibold mb-2"
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
  character destructure
*/

  const characterFilteredKeys = Object.entries(props.character).filter(el => el[0] === 'status' || el[0] === 'species' || el[0] === 'type' || el[0] === 'gender' || el[0] === 'created' || el[0] === 'origin' || el[0] === 'location')

  characterFilteredKeys[4][1] = characterFilteredKeys[4][1].name
  characterFilteredKeys[5][1] = characterFilteredKeys[5][1].name

</script>

<style scoped>

.card-background {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1;
}

@media (max-width: 641px) {
  .card-container {
    max-width: 250px;
  }
}

.avatar {
  max-width: 250px;
}

</style>