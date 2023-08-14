<template>
    <div class="movie">
      <div class="container">
        <div class="wrapper" v-if="oneMovie">
          <div class="card-image__wrapper">
            <img class="card-image" :src="oneMovie.image" :alt="oneMovie.name">
          </div>
          <div class="movie-card">
            <h2
              class="movie-title"
              v-html="oneMovie.name"
            ></h2>
            <div 
              class="movie-card__grid"
              v-html="oneMovie.additional"
            >
            </div>
            <div 
              class="movie-overview movie-card__text"
              v-html="oneMovie.description"
            ></div>
            <button class="btn btn-ticket" @click="toggleModal" >Buy tickets</button>
            <modal-tickets
              v-if="Object.keys(sessions).length && modalTickets"
              @toggleModal="toggleModal"
              @successfulPurchase="successfulPurchase"
              :sessions="sessions[id]"
            />
            <modal-successful 
              v-if="modalSuccessful"
              @toggleModal="modalSuccessful = false"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  import axios from 'axios';
  import modalTickets from '@/components/ModalBuyTickets.vue'
  import modalSuccessful from '@/components/ModalSuccessful.vue'


  export default {
    name: 'movie-one',
    components: {
      modalTickets,
      modalSuccessful
    },
    data() {
      return {
        modalTickets: false,
        modalSuccessful: false,
        oneMovie: null,
        movieFields: null,
        sessions: {}
      }
    },
    computed: {
      id() {
        return this.$route.params?.id || 0
      }
    },
    methods: {
      successfulPurchase() {
        this.modalTickets = false
        this.modalSuccessful = true
      },
      toggleModal() {
        this.modalTickets = !this.modalTickets
      },
      async getMov() {
        await axios.get(`https://cinema-api-test.y-media.io/v1/movies?movie_id=${parseFloat(this.id)}`)
        .then(({data}) => {
          this.oneMovie = data.data[0];
          this.getSessions()
        })
    },
    async getSessions() {
        try {
          // we can change route from movieShows?movie_id=id to movieShows, a universal solution, depending on what is needed
            await axios.get(`https://cinema-api-test.y-media.io/v1/movieShows?movie_id=${parseFloat(this.id)}`)
            .then(({data}) => {
                this.sessions = data.data; // or data.data[this.id]
                for (const key in this.sessions) {
                    if(key == this.id) {
                        this.$set(this.oneMovie, 'showDate', this.sessions[key])
                    }
                }
            })
        } catch (error) {
            console.error('error:', error)
        }
      },
  },
  created() {
      this.getMov()
  }
}
  </script>
  
<style lang="sass">

.wrapper
  padding: 5rem 0
  display: flex
  align-items: center

.card-image__wrapper
  width: 100%
  max-width: 40rem
  height: auto

  .card-image
    width: 100%
    height: 100%
    object-fit: cover 

.movie

  &-card
    padding-left: 4rem
    align-self: flex-start
    width: 100%

    &__text
      margin-bottom: 3rem
      font-size: 1.4rem

    &__grid
      margin-bottom: 3rem
      li
        display: flex
        margin-bottom: 1rem
        line-height: 20px

      .key
          width: 180px

      .val
        pointer-events: none
        width: calc(100% - 180px)



  &-title
    font-size: 4rem
    font-weight: 500
    margin-bottom: 4rem

  &-card__title
    font-size: 1.6rem
    font-weight: 400
    margin-bottom: 2rem

.edit-field
  width: 100%
  max-width: 50rem
  margin-bottom: 3rem

  &__area
    min-height: 9rem

.movie-edit
  margin-right: 1.5rem

  &__cancel
    &:hover
      background: #950d1c

  &__save
    margin-right: 2rem

    &:hover
        background: #2f732e

</style>
