<template>
  <teleport
    to=".modals-container"
  >
    <section 
      class="modal-background absolute p-3 z-10 top-0 left-0 w-full h-full text-gray-600 bg-white bg-opacity-95 flex justify-center items-center"
    >
      <a
        ref="characterModalRef"  
        href=""
        @click.prevent="closeModal()"
      >
        <div class="modal-container p-3 sm:p-5 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-xs w-full sm:max-w-3xl flex flex-col sm:flex-row rounded-md border border-gray-200 bg-white drop-shadow-2xl">
          <img class="object-cover object-center rounded drop-shadow-md" :src="character.image" alt="blog">

          <div class="py-2 sm:py-0 sm:pl-8 sm:pr-28">
            <h2 class="text-3xl sm:text-4xl font-semibold mt-2 sm:mt-0 sm:mb-3">{{ character.name }}</h2>
            <div
              v-for="key in characterKeysFiltered"
              :key="key"
              class="text-md"
            >
              <span
                class="text-green-500 capitalize"
              >
                {{ key[0] }}:
              </span>
              <span>
                {{ key[1] === '' ? '-' : key[1] }}
              </span>
            </div>
          </div>
        
          <div
            class="h-7 w-7 sm:h-6 sm:w-6 sm:text-xs rounded-full absolute top-5 right-5 flex justify-center items-center border border-gray-300 bg-gray-50 shrink-0"
          >
            <i class="fa-solid fa-x text-gray-500"></i>
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
  import { onClickOutside } from '@vueuse/core'

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
  close on click outside
*/

  const characterModalRef = ref(null)

  onClickOutside(characterModalRef, () => closeModal())

/* 
  character prop destructure
*/

  const characterKeys = ref(['status', 'species', 'type', 'gender', 'created', 'origin', 'location'])

  const characterKeysFiltered = Object.entries(props.character).filter(el => characterKeys.value.some(key => el[0] === key))
  characterKeysFiltered.forEach(i => {
    if(i[0] === 'origin' || i[0] === 'location') {
      i[1] = i[1].name
    }
  })

/*
  character creation date formatting
*/

  let characterCreationDate = new Date(characterKeysFiltered.filter(el => el[0] === 'created')[0][1])

  characterCreationDate = new Intl.DateTimeFormat('en-GB', {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }).format(characterCreationDate)

  characterKeysFiltered.filter(el => el[0] === 'created')[0][1] = characterCreationDate

</script>