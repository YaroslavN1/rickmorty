<template>
  <footer class="text-gray-600 body-font">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <picture
        class="w-40"
      >
        <source class="object-cover" type="image/webp" srcset="@/images/rickandmorty_logo_black.webp">
        <source class="object-cover" type="image/png" srcset="@/images/rickandmorty_logo_black.png">
        <img
          src="@/images/rickandmorty_logo_black.png"
          class="object-cover"
          alt="avatar"
        >
      </picture>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a href="https://github.com/YaroslavN1/rickmorty" target="_blank">
          <i class="text-gray-800 fa-brands fa-github fa-lg" />
        </a>
        <a href="https://www.linkedin.com/in/yaroslav-nykyforuk-12609a167" class="ml-3" target="_blank">
          <i class="text-gray-800 fa-brands fa-linkedin fa-lg" />
        </a>
      </span>
    </div>
  </footer>
</template>