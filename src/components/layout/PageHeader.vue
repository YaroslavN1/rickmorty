<template>
  <header class="flex flex-col items-center bg-green-400 py-3">
    <picture class="w-64">
      <source type="image/webp" :srcset="logoWebp" />
      <img :src="logoPng" class="object-cover" alt="avatar" />
    </picture>
  </header>
</template>

<script setup>
import logoWebp from '@/images/rickandmorty_logo.webp'
import logoPng from '@/images/rickandmorty_logo.png'
</script>
