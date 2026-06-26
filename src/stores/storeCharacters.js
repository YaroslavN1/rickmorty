import { defineStore } from 'pinia'
import { getCharacters } from 'rickmortyapi'
import { filterNames } from '@/constants/filters.js'

export const useStoreCharacters = defineStore('storeCharacters', {
  state: () => {
    return {
      requestFilters: {
        page: 1,
      },
      charactersLoading: true,
      charactersTotalCount: 0,
      characterItems: [],
      lastPage: 1,
    }
  },
  actions: {
    init() {
      this.getFiltersFromSessionStorage()
      this.getCharacters()
    },

    getFiltersFromSessionStorage() {
      if (!sessionStorage.getItem('page')) {
        sessionStorage.setItem('page', this.requestFilters.page)
      } else {
        const storedFilters = {}
        storedFilters.page = Number(sessionStorage.getItem('page'))
        filterNames.forEach((name) => {
          if (sessionStorage.getItem(name)) {
            storedFilters[name] = sessionStorage.getItem(name)
          }
        })
        this.requestFilters = storedFilters
      }
    },

    async getCharacters() {
      const response = await getCharacters(this.requestFilters)
      sessionStorage.setItem('page', this.requestFilters.page)
      if (response.status === 200) {
        const data = response.data
        this.charactersTotalCount = data.info.count
        this.characterItems = data.results
        this.lastPage = data.info.pages
        this.charactersLoading = false
      } else {
        this.characterItems = []
        this.charactersLoading = false
        this.charactersTotalCount = 0
        this.lastPage = 1
      }
    },

    async setStoreFilter(filterName, subFilter) {
      if (subFilter !== 'all' && subFilter !== '') {
        this.requestFilters.page = 1
        this.requestFilters[filterName] = subFilter
        sessionStorage.setItem(filterName, subFilter)
        this.getCharacters()
      } else {
        delete this.requestFilters[filterName]
        sessionStorage.removeItem(filterName, subFilter)
        this.getCharacters()
      }
    },

    resetStoreFilters() {
      this.requestFilters = { page: 1 }
      sessionStorage.clear()
      this.getCharacters()
    },
  },
})
