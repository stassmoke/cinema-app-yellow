<template>
    <div class="home">
      <div class="container" >
        <div class="wrapper">
            <h1>Movies</h1>
            <search @search="getMov"/>
            <div  class="card_grid" v-if="allMov.length">
                <template v-for="mov in allMov">
                    <item :itemData="mov" :key="mov.id"/>
                </template>
            </div>
            <div v-else>
                No results
            </div>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import item from '../components/ItemMov.vue'
  import search from '../components/search/SearchMov.vue'
  
  export default {
    components: { 
      item,
      search
    },
    data() {
      return {
        allMov: [],
        pageOfItems: [],
        sessions: []
      }
    },
    methods: {
      async getMov(params = {}) {
        try {
            // we can move the beginning of the api to another file, but why if we have only one?
            await axios.get('https://cinema-api-test.y-media.io/v1/movies', { params })
            .then(({data}) => {
                this.allMov = data.data
                this.getSessions()
            })
        } catch (error) {
            console.error('error:', error)
        }
      },
      async getSessions() {
        try {
            // we can move the beginning of the api to another file, but why if we have only one?
            await axios.get('https://cinema-api-test.y-media.io/v1/movieShows')
            .then(({data}) => {
                this.sessions = data.data;
                for (const key in this.sessions) {
                    this.allMov.map((mov) => {
                        if(key == mov.id) {
                            this.$set(mov, 'showDate', this.sessions[key])
                        }
                    })
                }
            })
        } catch (error) {
            console.error('error:', error)
        }
      },
      onChangePage(pageOfItems) {
          this.pageOfItems = pageOfItems;
      }
    },
    created() {
      this.getMov()
    }
  }
  </script>
  
  <style lang="sass" scoped>
  
  .home
    padding: 5rem 0
  
  .wrapper
    display: flex
    flex-direction: column
    align-items: center
  
  
  .card_grid
    display: grid
    grid-template-columns: repeat(4, 1fr)
    grid-column-gap: 3rem
    grid-row-gap: 2rem
  
  
  
  
  </style>