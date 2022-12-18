import { defineStore } from 'pinia'
import { getCharacters } from 'rickmortyapi'
import filterCategories from '@/mockdata/filterCategories.json'



export const useStoreCharacters = defineStore('storeCharacters', {
  state: () => {
    return {
      requestFilters: {
        page: 1,
      },
      filterCategories: [
        // name: [],                                    // add search by name 
      ],
      characterItems: [],
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
      const {data} = await getCharacters(this.requestFilters)
        this.characterItems = data.results
    },

    goToPage(page) {
      if(page > 0 && page < 43)
      this.requestFilters.page = page
      this.getCharacters()
    },

    getFilteredCharacters(filter, subFilter) {
      if(subFilter !== '') {
        this.requestFilters = { page: 1 }        //reset a page for subfilter
        this.requestFilters[filter] = subFilter
        this.getCharacters()
      } else {
        this.requestFilters = { page: 1 }
        this.getCharacters()
      }
    },

    nextPage() {
      if(this.requestFilters.page <= 43)
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