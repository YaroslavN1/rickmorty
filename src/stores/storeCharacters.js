import { defineStore } from 'pinia'
import { getCharacters } from 'rickmortyapi'
import { filterNames } from '@/constants/filters.js'
import router from '@/router/index.js'

export const useStoreCharacters = defineStore('storeCharacters', {
  state: () => {
    return {
      requestFilters: {
        page: 1,
      },
      charactersLoading: true,
      charactersTotalCount: 0,
      characters: [],
      lastPage: 1,
    }
  },
  actions: {
    init() {
      this.getFiltersFromUrl()
      this.getCharacters()
    },

    getFiltersFromUrl() {
      const query = router.currentRoute.value.query
      const filters = { page: Number(query.page) || 1 }
      filterNames.forEach((name) => {
        if (query[name]) filters[name] = query[name]
      })
      this.requestFilters = filters
    },

    setFiltersInUrl() {
      router.replace({ query: { ...this.requestFilters } })
    },

    async getCharacters() {
      const response = await getCharacters(this.requestFilters)
      this.setFiltersInUrl()
      if (response.status === 200) {
        const data = response.data
        this.charactersTotalCount = data.info.count
        this.characters = data.results
        this.lastPage = data.info.pages
        this.charactersLoading = false
      } else {
        this.characters = []
        this.charactersLoading = false
        this.charactersTotalCount = 0
        this.lastPage = 1
      }
    },

    async setStoreFilter(name, value) {
      if (!!value && value !== 'all') {
        this.requestFilters.page = 1
        this.requestFilters[name] = value
      } else {
        delete this.requestFilters[name]
      }
      this.getCharacters()
    },

    resetStoreFilters() {
      this.requestFilters = { page: 1 }
      this.getCharacters()
    },
  },
})
