<template>
    <div class="search-cell__wrapper">
        <label
          for="search" 
          class="search-cell__title"
        >
          Search:
        </label>
        <input 
          type="text"
          id="search" 
          v-model="searchTerm" 
          @input="updateSearch"
          placeholder="Search"
        >
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchTerm: '',
      };
    },
    methods: {
      updateSearch() {
        this.$emit('search-updated', this.searchTerm);
      },
    },
  };
  </script>
  
<style lang="sass">

input
      font-size: 1.7rem
      color: white
      font-weight: 200
      padding: 10px
      border: 1px solid #47535C
      border-radius: 5px
      background-color: #142633
      outline: none
</style>