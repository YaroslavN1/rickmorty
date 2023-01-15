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

    async getCharacters() {
      const response = await getCharacters(this.requestFilters)
      sessionStorage.setItem('page', this.requestFilters.page)
      if(response.status === 200) {
        const data = response.data
        this.charactersCount = data.info.count
        this.characterItems = data.results
        this.lastPage = data.info.pages
        this.charactersLoading = false
      } else {
        this.characterItems = []
        this.charactersLoading = false
        this.charactersCount = 0
        this.lastPage = 1
      }
    },

    async setStoreFilters(filterName, subFilter) {
      if(subFilter !== 'all' && subFilter !== '') {
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

    goToPage(page) {
      if(page > 0 && page <= this.lastPage)
        this.requestFilters.page = page
        this.getCharacters()
    },

    movePage(page) {
      if(this.requestFilters.page + page <= this.lastPage && this.requestFilters.page + page >= 1)
        this.requestFilters.page += page
        this.getCharacters()
    }
  }
})