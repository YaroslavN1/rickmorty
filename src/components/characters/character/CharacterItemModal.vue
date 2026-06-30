<template>
  <teleport to=".modals-container">
    <section
      class="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-95"
    >
      <div
        ref="characterModalRef"
        class="flex w-full max-w-xs flex-col rounded-md border border-gray-200 bg-white p-3 pb-5 drop-shadow-2xl sm:max-w-3xl sm:flex-row sm:p-5"
      >
        <img
          class="mb-4 aspect-square w-full max-w-[300px] flex-shrink-0 rounded object-cover object-center drop-shadow-md sm:mb-0 sm:mr-8 sm:w-[300px]"
          :src="character.image"
          :alt="character.name"
        />

        <div>
          <h2 class="text-3xl font-semibold text-gray-600 sm:mb-3 sm:text-4xl">
            {{ character.name }}
          </h2>
          <div v-for="[key, value] in characterKeysFiltered" :key="key">
            <span class="capitalize text-green-500"> {{ key }}: </span>
            <span class="text-gray-600">
              <span v-if="['origin', 'location'].includes(key)">
                {{ value.name || '-' }}
              </span>
              <span v-else-if="key === 'created'">
                {{ formatDate(value) }}
              </span>
              <span v-else>
                {{ value === '' ? '-' : value }}
              </span>
            </span>
          </div>
        </div>

        <BaseButton
          aria-label="Close"
          class="absolute right-5 top-5 grid size-7 place-items-center rounded-full sm:size-6 sm:text-xs"
          @click="closeModal()"
        >
          <i class="fa-solid fa-x text-gray-500"></i>
        </BaseButton>
      </div>
    </section>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
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
