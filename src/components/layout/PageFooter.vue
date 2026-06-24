<template>
  <footer class="body-font text-gray-600">
    <div
      class="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row"
    >
      <picture class="w-40">
        <source
          class="object-cover"
          type="image/webp"
          srcset="@/images/rickandmorty_logo_black.webp"
        />
        <source
          class="object-cover"
          type="image/png"
          srcset="@/images/rickandmorty_logo_black.png"
        />
        <img
          src="@/images/rickandmorty_logo_black.png"
          class="object-cover"
          alt="avatar"
        />
      </picture>
      <span
        class="mt-4 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start"
      >
        <a href="https://github.com/YaroslavN1/rickmorty" target="_blank">
          <i class="fa-brands fa-github fa-lg text-gray-800" />
        </a>
        <a
          href="https://www.linkedin.com/in/yaroslav-nykyforuk-12609a167"
          class="ml-3"
          target="_blank"
        >
          <i class="fa-brands fa-linkedin fa-lg text-gray-800" />
        </a>
      </span>
    </div>
  </footer>
</template>
