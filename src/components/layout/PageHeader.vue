<template>
  <header class="text-white bg-green-400 bg-opacity-95 body-font">
    <div class="container mx-auto flex p-3 flex-col items-center">
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
    </div>
  </header>
</template>