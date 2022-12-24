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
      // charactersLoaded: false
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

    async getCharacters() {
      const result = await getCharacters(this.requestFilters)
      if(result.status === 200) {
        const data = result.data
        this.charactersFound = true
        this.charactersCount = data.info.count
        this.characterItems = data.results
        this.lastPage = data.info.pages
        if(this.requestFilters.page > this.lastPage) {
          this.requestFilters.page = this.lastPage
        }
      } else {
        this.charactersFound = false
        this.charactersCount = 0
        this.lastPage = 1
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
        const firstPage = {...this.requestFilters}
        firstPage.page = 1
        const { data: {info: { pages } } } = await getCharacters(firstPage)
        if(this.requestFilters.page > pages) {
          this.requestFilters.page = pages
          this.getCharacters()
        } else {
          this.getCharacters()
        }
      } else {
        delete this.requestFilters[filterName]
        const { data: {info: { pages } } } = await getCharacters(this.requestFilters)
        if(this.requestFilters.page < pages && this.requestFilters.page === this.lastPage) {
          // console.log('current page is greater')
          this.requestFilters.page = pages
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