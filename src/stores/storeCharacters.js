import { defineStore } from 'pinia'
import { getCharacters } from 'rickmortyapi'
import filterCategories from '@/filters/filterCategories.json'



export const useStoreCharacters = defineStore('storeCharacters', {
  state: () => {
    return {
      requestFilters: {
        page: 1,
      },
      filterCategories: [
        // name: [],                                    // add search by name 
        // { 
        //   id: 1,
        //   name: 'status',
        //   subFilters: []
        // } ,
        // { 
        //   id: 2,
        //   name: 'species',
        //   subFilters: []
        // } ,
        // { 
        //   id: 3,
        //   name: 'type',
        //   subFilters: []
        // } ,
        // { 
        //   id: 4,
        //   name: 'gender',
        //   subFilters: []
        // } ,
      ],
      visibleCharacterItems: [],
      allCharacterItems: []
      // charactersLoaded: false
    }
  },
  actions: {
    init(){
      this.getPageFromSessionStorage()
      this.getAllCharacters()
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

    //below part goes through all of the pages and accumulates all characters
    // as of the moment of creating this app, values of filters were not available directly, so I had to make this quite inefficient move, to get data

    async getAllCharacters() {
      let loopCharacters = []
      for ( let i = 1; i < 2; i++ ){
        const requestResult = await getCharacters({ page: [i] })
        if(requestResult.status !== 200) break
        else {
          loopCharacters = requestResult.data.results
          this.allCharacterItems = this.allCharacterItems.concat(loopCharacters)
        }
      }
      // this.getSubFilters()
    },

    // below part iterates over accumulated characters and gathers unique values of filters
    // getSubFilters() {
    //   for (let i = 0; i < this.filterCategories.length; i++) {
    //     const currentFilterItem = this.filterCategories[i]
    //     for (let character of this.allCharacterItems) {
    //       if(!currentFilterItem.subFilters.includes(character[currentFilterItem.name])) {
    //         currentFilterItem.subFilters.push(character[currentFilterItem.name])
    //       }
    //     }
    //   }
    //   this.downloadJsonFile(this.filterCategories, 'filterCategories')
    // },

    // downloadJsonFile(data, filename){
    //   // Creating a blob object from non-blob data using the Blob constructor
    //   const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    //   const url = URL.createObjectURL(blob);
    //   // Create a new anchor element
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = filename || 'download';
    //   a.click();
    //   a.remove();
    // },

    getFilteredCharacters() {
      console.log('filtered characters')
    },

    previousPage() {
      if(this.requestFilters.page > 1)
      this.requestFilters.page -= 1
      this.getPagedCharacters()
    },
    
    nextPage() {
      this.requestFilters.page += 1
      this.getPagedCharacters()
    }
  },
})