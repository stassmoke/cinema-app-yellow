<template>
  <div class="search-movie">
    <search-input @search-updated="updateSearchTerm" />
    <genres-select @genre-updated="updateSelectedGenre" />
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue';
import GenresSelect from './GenresSelect.vue';

export default {
  components: {
    SearchInput,
    GenresSelect,
  },
  data() {
    return {
      searchTerm: '',
      selectedGenre: '',
      searchResults: [],
    };
  },
  watch: {
    searchTerm: 'searchMovies',
    selectedGenre: 'searchMovies',
  },
  methods: {
    searchMovies() {
      const seachQuery = {
        name: this.searchTerm, 
        genres: this.selectedGenre
      }
        this.$emit('search', seachQuery)
    },
    updateSearchTerm(term) {
      this.searchTerm = term;
    },
    updateSelectedGenre(genre) {
      this.selectedGenre = genre;
    },
  },
};
</script>

<style lang="sass">

.search-cell__wrapper
  display: flex
  flex-direction: column
  min-width: 30rem
  
.search-cell__title
  font-size: 1.4rem
  margin-bottom: 1rem


.search-movie
  margin-bottom: 3rem
  display: flex
  align-items: center
  gap: 2rem 
  

</style>
