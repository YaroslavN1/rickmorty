<template>
  <div 
    id="app"
    class="characters-list text-slate-600"
  >
    <PageHeader />

    <main class="max-w-5xl mx-auto mt-4 p-6">
      <CharacterFilters />

      <NavigationButtons class="mt-6" />

      <Suspense>
        <CharactersList class="my-10" />
        <template #fallback>
          Loading characters...
        </template>
      </Suspense>

      <NavigationButtons class="mb-6" />
    </main>

    <PageFooter />
  </div>
</template>

<script setup>

/* 
  imports
*/
  import PageHeader from '@/components/layout/PageHeader.vue'
  import PageFooter from '@/components/layout/PageFooter.vue'
  import CharacterFilters from '@/components/layout/CharacterFilters.vue'
  import NavigationButtons from '@/components/layout/NavigationButtons.vue'
  import CharactersList from '@/components/layout/CharactersList.vue'
  import { useStoreCharacters } from '@/stores/storeCharacters'

/* 
  stores
*/

 const storeCharacters = useStoreCharacters()

/* 
  mounted
*/

  storeCharacters.init()

</script>