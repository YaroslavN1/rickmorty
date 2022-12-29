<template>
  <header class="text-white bg-green-400 bg-opacity-95 body-font">
    <div class="container mx-auto flex p-3 flex-col items-center">
      <!-- <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
        <a class="mr-5 hover:text-gray-900">First Link</a>
        <a class="mr-5 hover:text-gray-900">Second Link</a>
        <a class="mr-5 hover:text-gray-900">Third Link</a>
        <a class="hover:text-gray-900">Fourth Link</a>
      </nav> -->
      <picture
        class="w-64"
      >
        <source class="object-cover" type="image/webp" srcset="@/images/rickandmorty_logo.webp">
        <source class="object-cover" type="image/png" srcset="@/images/rickandmorty_logo.png">
        <img
          src="@/images/rickandmorty_logo.png"
          class="object-cover"
          alt="avatar"
        >
      </picture>
      <!-- <img
        src="@/images/rickandmorty_logo.png"
        class="object-cover w-60"
        alt=""
      > -->
      <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span class="ml-3 text-xl">Tailblocks</span> -->
    </div>
  </header>
</template>