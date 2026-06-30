import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCharacters as fetchCharacters } from 'rickmortyapi'
import { filterNames } from '@/constants/filters.js'
import router from '@/router/index.js'
import { Character } from '@/types/character'

export const useCharactersStore = defineStore('charactersStore', () => {
  const requestFilters = ref({ page: 1 })
  const charactersLoading = ref(false)
  const fetchingError = ref(false)
  const charactersTotalCount = ref(0)
  const characters = ref<Character[]>([])
  const lastPage = ref(1)

  function init() {
    getFiltersFromUrl()
    getCharacters()
  }

  function getFiltersFromUrl() {
    const query = router.currentRoute.value.query
    const filters = { page: Number(query.page) || 1 }
    filterNames.forEach((name) => {
      if (query[name]) filters[name] = query[name]
    })
    requestFilters.value = filters
  }

  function setFiltersInUrl() {
    router.replace({ query: { ...requestFilters.value } })
  }

  async function getCharacters() {
    fetchingError.value = false
    charactersLoading.value = true
    try {
      const response = await fetchCharacters(requestFilters.value)
      setFiltersInUrl()
      if (response.status !== 200) throw response
      const data = response.data
      characters.value = data.results || []
      charactersTotalCount.value = data.info?.count ?? 0
      lastPage.value = data.info?.pages ?? 1
    } catch (error) {
      fetchingError.value = (error as { status?: number }).status !== 404
      characters.value = []
      charactersTotalCount.value = 0
      lastPage.value = 1
    } finally {
      charactersLoading.value = false
    }
  }

  function setStoreFilter(name, value) {
    if (!!value && value !== 'all') {
      requestFilters.value[name] = value
    } else {
      delete requestFilters.value[name]
    }
    requestFilters.value.page = 1
    getCharacters()
  }

  function resetStoreFilters() {
    requestFilters.value = { page: 1 }
    getCharacters()
  }

  return {
    requestFilters,
    charactersLoading,
    fetchingError,
    charactersTotalCount,
    characters,
    lastPage,
    init,
    getFiltersFromUrl,
    setFiltersInUrl,
    getCharacters,
    setStoreFilter,
    resetStoreFilters,
  }
})
