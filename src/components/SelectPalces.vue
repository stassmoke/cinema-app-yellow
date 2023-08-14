<template>
    <div class="seating">
        <div class="seating-text">Screen</div>
        <div class="seating-grid">
            <div class="row" v-for="(row, rowIndex) in seatsData" :key="rowIndex">
                <div
                    v-for="(seat, seatIndex) in row[1]"
                    :key="seatIndex"
                    :class="[{
                        'selected': isSeatSelected(row[0].row, seat.seat),
                        'booked': isSeatBooked(seat)
                    }, 'seat']"
                    @click="toggleSeat(row[0].row, seat.seat)"
                >
                    {{ seat.seat }}
                </div>
            </div>
        </div>
        <button 
        class="btn" 
        v-if="selectedSeat" 
        @click="buyTicket"
    >
        Buy ticket
    </button>
    </div>
</template>
  
<script>

import axios from 'axios';

export default {
props: {
    seatsData: Array,
    selectedDateTime: Object
},
data() {
    return {
        selectedSeat: null,
    };
},
methods: {
    async buyTicket() {
        try {
            const params = {
                movie_id: parseInt(this.id),
                row: this.selectedSeat.row,
                seat:  this.selectedSeat.seat,
                showdate: this.selectedDateTime.date,
                daytime: this.selectedDateTime.time
            }
            // we can move the beginning of the api to another file, but why if we have only one?
            await axios.post(`https://cinema-api-test.y-media.io/v1/bookPlace`, params)
            .then(() => {
                this.$emit('successfulPurchase')
            })
        } catch (error) {
            console.error('error:', error)
        }
        },
        toggleSeat(row, seat) {
            if (
            this.selectedSeat === null ||
            (this.selectedSeat.row !== row || this.selectedSeat.seat !== seat)
            ) {
            this.selectedSeat = { row, seat };
            } else {
            this.selectedSeat = null;
            }
        },
        isSeatSelected(row, seat) {
            return (
            this.selectedSeat !== null &&
            this.selectedSeat.row === row &&
            this.selectedSeat.seat === seat
            );
        },
        isSeatBooked(seat) {
            return !seat.is_free;
        },
    },
    computed: {
      id() {
        return this.$route.params?.id || 0
      }
    },
};
</script>
  
<style scoped lang="sass">
  .seating 
    
    &-grid
        display: flex
        flex-direction: column
        margin-bottom: 3rem
    &-text
        text-align: center
        font-size: 1.8rem
        margin-bottom: 2rem

  .row 
    display: flex
    justify-content: center
    align-items: center
    margin: 5px
  
  
  .seat 
    width: 30px
    height: 30px
    border: 1px solid #ccc
    margin: 2px
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    background-color: #f0f0f0
    color: black
  
  
  .seat.selected 
    background-color: lightgreen!important
  
  
  .seat.booked 
    background-color: lightgrey
    pointer-events: none
  
</style>
  