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
      charactersFound: false,
      charactersCount: 1,
      characterItems: [],
      lastPage: 1
    }
  },
  actions: {
    init(){
      this.getPageFromSessionStorage()
      this.getCharacters()
      this.filterCategories = filterCategories
    },

    getPageFromSessionStorage() {
      const storedPage = Number(sessionStorage.getItem('page'))
      if(!storedPage) {
        sessionStorage.setItem('page', 1)
      } else {
        this.requestFilters.page = storedPage
      }
    },

    async requestCharacters(requestFilters) {
      const response = await getCharacters(requestFilters)
      if(response.status === 200) {
        this.charactersFound = true
        return response
      } else {
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
        this.requestFilters[filterName] = subFilter
        const filteredFirstPage = {...this.requestFilters}
        filteredFirstPage.page = 1
        const { data: { info } } = await this.requestCharacters(filteredFirstPage)
        if(this.requestFilters.page > info.pages) {
          this.requestFilters.page = info.pages
          this.getCharacters()
        } else {
          this.getCharacters()
        }
      } else {
        delete this.requestFilters[filterName]
        const { data: { info } } = await this.requestCharacters(this.requestFilters)
        if(this.requestFilters.page < info.pages && this.requestFilters.page === this.lastPage && this.requestFilters.page > 1) {
          this.requestFilters.page = info.pages
          this.getCharacters()
        } else {
          this.getCharacters()
        }
      }
    },

    resetStoreFilters() {
      this.requestFilters = { page: 1 }
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