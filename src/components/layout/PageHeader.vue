<template>
  <header class="body-font bg-green-400 bg-opacity-95 text-white">
    <div class="container mx-auto flex flex-col items-center p-3">
      <picture class="w-64">
        <source class="object-cover" type="image/webp" :srcset="logoWebp" />
        <img :src="logoPng" class="object-cover" alt="avatar" />
      </picture>
    </div>
  </header>
</template>

<script setup>
import logoWebp from '@/images/rickandmorty_logo.webp'
import logoPng from '@/images/rickandmorty_logo.png'
</script>
