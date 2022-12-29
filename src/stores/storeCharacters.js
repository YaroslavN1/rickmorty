import { defineStore } from 'pinia'
import { getCharacters } from 'rickmortyapi'
import filterCategories from '@/mockdata/filterCategories.json'



export const useStoreCharacters = defineStore('storeCharacters', {
  state: () => {
    return {
      requestFilters: {
        page: 1,
      },
      filterCategories: [],
      charactersLoading: true,
      charactersFound: false,
      charactersCount: 0,
      characterItems: [],
      lastPage: 1
    }
  },
  actions: {
    init(){
      this.filterCategories = filterCategories
      this.getFiltersFromSessionStorage()
      this.getCharacters()
    },

    getFiltersFromSessionStorage() {
      if(!sessionStorage.getItem('page')) {
        sessionStorage.setItem('page', this.requestFilters.page)
      } else {
        const storedFilters = {}
        storedFilters.page = Number(sessionStorage.getItem('page'))
        filterCategories.forEach(el => {
          if(sessionStorage.getItem(el.name)) {
          storedFilters[el.name] = sessionStorage.getItem(el.name)
          }
        })
        this.requestFilters = storedFilters
      }
    },

    async requestCharacters(requestFilters) {
      const response = await getCharacters(requestFilters)
      sessionStorage.setItem('page', this.requestFilters.page)
      if(response.status === 200) {
        this.charactersLoading = false
        this.charactersFound = true
        return response
      } else {
        this.charactersLoading = false
        this.charactersFound = false
        this.charactersCount = 0
        this.lastPage = 1
      }
    },

    async getCharacters() {
      const response = await this.requestCharacters(this.requestFilters)
      const data = response.data
      this.charactersCount = data.info.count
      this.characterItems = data.results
      this.lastPage = data.info.pages
      if(this.requestFilters.page > this.lastPage) {
        this.requestFilters.page = this.lastPage
      }
    },

    searchByName(name) {
      if(name !== '') {
        this.requestFilters.name = name
        this.getCharacters()
      } else {
        delete this.requestFilters.name
        this.getCharacters()
      }
    },

    async setStoreFilters(filterName, subFilter) {
      if(subFilter !== 'all') {
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
      filterCategories.forEach(el => {
        if(sessionStorage.getItem(el.name)) {
        sessionStorage.removeItem(el.name)
        }
      })
      this.getCharacters()
    },

    goToPage(page) {
      if(page > 0 && page <= this.lastPage)
        this.requestFilters.page = page
        this.getCharacters()
    },

    nextPage() {
      if(this.requestFilters.page <= this.lastPage)
      this.requestFilters.page += 1
      this.getCharacters()
    },

    previousPage() {
      if(this.requestFilters.page >= 1)
      this.requestFilters.page -= 1
      this.getCharacters()
    },
  }
})