<template>
    <div class="search-cell__wrapper">
        <label 
          for="genres"
          class="search-cell__title"
        >
          Gernes:
        </label>
        <select 
          id="genres" 
          v-model="selectedGenre" 
          @change="updateGenre"
        >
          <option value="">Select gerne</option>
          <option 
            v-for="(genre, index) in genres" :key="index"
            :value="genre.value"
          >
              {{ genre.label }}
          </option>
        </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        genres: [
          { label: 'Action', value: 0 },
          { label: 'Adventures', value: 1 },
          { label: 'Comedy', value: 2 },
          { label: 'Drama', value: 3 },
          { label: 'Horror', value: 4 },
          { label: 'Westerns', value: 5 },
        ],
        selectedGenre: '',
      };
    },
    methods: {
      updateGenre() {
        this.$emit('genre-updated', this.selectedGenre);
      },
    },
  };
  </script>

<style lang="sass">
select
      font-size: 1.7rem
      color: white
      font-weight: 200
      padding: 10px
      border: 1px solid #47535C
      border-radius: 5px
      background-color: #142633
      outline: none
</style>
  