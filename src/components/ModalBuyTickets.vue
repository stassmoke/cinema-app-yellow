<template>
  <div>
    <div class="modal" @click.self="toggleModal">
      <!-- I know that it is possible through slots, but I don't have much time -->
      <button @click="toggleModal" class="close-button">Close</button>
      <div class="modal-wrapper">
        <h5 class="modal-title">Buy tickets</h5>
        <div class="modal-content">
           <div class="modal-movie__showtimes" v-if="!places.length">
              <div v-for="(showtimeObj, index) in sessions" :key="index">
                <div>
                  <div class="date-row">{{ showtimeObj.showdate }}</div>
                  <div class="grid-option">
                    <div 
                      v-for="(time, idx) in showtimeObj.daytime.split(';')"
                      :key="idx"
                      class="wrapper-option"
                    >
                      <input 
                        type="radio"  
                        :id="`option-selected-${idx}`" 
                        :value="{time: time, date: showtimeObj.showdate }" 
                        v-model="selected"
                        class="radio-option"
                      >
                      <label 
                        :class="[(selected?.time === time && selected?.date === showtimeObj.showdate)  ? '__selected' : '', 'label-option']"
                        label 
                        :for="`option-selected-${idx}`"
                      > 
                        {{ time }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="btn" 
                v-if="selected"
                @click="bookPlace"
              >
              Book place 
            </button>
          </div>
          <select-palces
            v-else 
            :seatsData="places" 
            :selectedDateTime="selected"
            @successfulPurchase="successfulPurchase"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import SelectPalces from '@/components/SelectPalces.vue';

export default {
  components: { SelectPalces },
  props: {
    sessions: {

    }
  },
  data() {
    return {
      selected: null,
      places: []
    };
  },
  computed: {
    id() {
      return this.$route.params?.id || 0
    }
  },
  methods: {
    successfulPurchase() {
      this.$emit('successfulPurchase')
    },
    toggleModal() {
      this.$emit('toggleModal')
    },
    async bookPlace() {
      try {
            const queries = {
              id: this.id,
              daytime: this.selected.time,
              showdate: this.selected.date
            }
            // not readable, i know :)
            // we can move the beginning of the api to another file, but why if we have only one?
            await axios.get(`https://cinema-api-test.y-media.io/v1/showPlaces?movie_id=${queries.id}&daytime=${queries.daytime}&showdate=${queries.showdate}}`)
            .then(({data}) => {
                this.places = data.data
            })
        } catch (error) {
            console.error('error:', error)
        }
    },
    clearData() {
      this.selected = null
      this.places = []
    }
  },
  beforeDestroy() {
    this.clearData()
  }
};
</script>

<style lang="sass">

.label-option
  border: 1px solid grey
  font-size: 1.4rem
  padding: .3rem
  width: 100%
  height: 100%
  display: block

  &.__selected
    color: white
    border: 1px solid white

.wrapper-option
  position: relative

.radio-option
  position: absolute
  left: 0
  right: 0
  width: auto
  height: 100%
  opacity: 0
  cursor: pointer
  display: block

.grid-option
  display: flex
  align-items: center
  flex-wrap: wrap
  gap: .9rem
  margin-bottom: 1.5rem 

.date-row
  font-size: 1.6rem
  margin-bottom: 1rem

</style>
