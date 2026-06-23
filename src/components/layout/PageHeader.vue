<template>
  <header class="body-font bg-green-400 bg-opacity-95 text-white">
    <div class="container mx-auto flex flex-col items-center p-3">
      <picture class="w-64">
        <source
          class="object-cover"
          type="image/webp"
          srcset="@/images/rickandmorty_logo.webp"
        />
        <source
          class="object-cover"
          type="image/png"
          srcset="@/images/rickandmorty_logo.png"
        />
        <img
          src="@/images/rickandmorty_logo.png"
          class="object-cover"
          alt="avatar"
        />
      </picture>
    </div>
  </header>
</template>
