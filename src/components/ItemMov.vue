<template>
    <router-link :to="{path: `/${itemData.id}`}" :key="itemData.id" class="card">
        <div class="card-image__wrapper">
            <img class="card-image" :src="itemData.image" :alt="itemData.name">
        </div>
        <div class="card-info__wrapper">
            <div class="card-title">{{itemData.name}}</div>
            <div class="card-avg">{{itemData.genre}}</div>
        </div>
        <!-- don't know if it is necessary to be able to buy a ticket on the main page, so it can be done on the One movie page -->
    </router-link>
</template>

<script>
export default {
    props: {
        itemData: {
          type: Object,
          require: true
        }
    },
}
</script>

<style lang="sass">

.card
  padding: 2rem
  border: 1px solid #47535C
  position: relative

  button
    font-size: 1.4rem
  
  &-sessions__hover
    position: absolute
    top: -100%
    left: 0
    width: 100%
    height: 100%
    transition: .3s ease opacity
    opacity: 0
    pointer-events: none
    z-index: 0

  &:hover
    .card-sessions__hover
      top: 0
      opacity: 1
      pointer-events: all
      transition: .3s ease opacity
      background-color: #2a2a3173
      backdrop-filter: blur(10px)
      z-index: 1


  &-image__wrapper
    width: 100%
    max-height: 100%

  &-image
    width: 100%
    height: auto
    object-fit: cover

  &-info__wrapper
    display: flex
    align-items: center
    justify-content: space-between
    padding-top: 2rem

  &-title
    max-width: 90%

  &-title,
  &-avg
    font-size: 1.4rem
    font-weight: 400

</style>