<template>
  <teleport to=".modals-container">
    <section class="fixed inset-0 z-10 bg-white bg-opacity-95 text-gray-600">
      <div
        ref="characterModalRef"
        class="absolute left-1/2 top-1/2 flex w-full max-w-xs -translate-x-1/2 -translate-y-1/2 flex-col rounded-md border border-gray-200 bg-white p-3 drop-shadow-2xl sm:max-w-3xl sm:flex-row sm:p-5"
      >
        <img
          class="rounded object-cover drop-shadow-md"
          :src="character.image"
          :alt="character.name"
        />

        <div class="py-2 sm:py-0 sm:pl-8 sm:pr-28">
          <h2 class="mt-2 text-3xl font-semibold sm:mb-3 sm:mt-0 sm:text-4xl">
            {{ character.name }}
          </h2>
          <div v-for="[key, value] in characterKeysFiltered" :key="key">
            <span class="capitalize text-green-500"> {{ key }}: </span>
            <span v-if="['origin', 'location'].includes(key)">
              {{ value.name || '-' }}
            </span>
            <span v-else-if="key === 'created'">
              {{ formatDate(value) }}
            </span>
            <span v-else>
              {{ value === '' ? '-' : value }}
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label="Close"
          class="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-gray-50 sm:h-6 sm:w-6 sm:text-xs"
          @click="closeModal()"
        >
          <i class="fa-solid fa-x text-gray-500"></i>
        </button>
      </div>
    </section>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:isOpen'])

const closeModal = () => {
  emit('update:isOpen', false)
}
const characterModalRef = ref(null)
onClickOutside(characterModalRef, () => closeModal())

const displayedCharacterKeys = [
  'status',
  'species',
  'type',
  'gender',
  'created',
  'origin',
  'location',
]

const characterKeysFiltered = Object.entries(props.character).filter(
  ([key, _]) => displayedCharacterKeys.includes(key),
)

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(date))
</script>
