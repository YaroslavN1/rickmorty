<template>
  <footer>
    <div
      class="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row sm:justify-between"
    >
      <picture class="w-40">
        <source type="image/webp" :srcset="logoWebpBlack" />
        <img :src="logoPngBlack" class="object-cover" alt="avatar" />
      </picture>
      <span class="mt-4 inline-flex justify-center sm:mt-0 sm:justify-start">
        <a href="https://github.com/YaroslavN1/rickmorty" target="_blank">
          <i class="fa-brands fa-github fa-lg" />
        </a>
        <a
          href="https://www.linkedin.com/in/yaroslav-nykyforuk-12609a167"
          class="ml-3"
          target="_blank"
        >
          <i class="fa-brands fa-linkedin fa-lg" />
        </a>
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logoWebpBlack from '@/images/rickandmorty_logo_black.webp'
import logoPngBlack from '@/images/rickandmorty_logo_black.png'
</script>
