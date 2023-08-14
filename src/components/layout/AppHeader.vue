<template>
  <div class="header">
    <router-link to="/" id="some-logo">Some Logo</router-link>
    <div class="container">
      <ul class="header-list">
      <template v-for="(link, idx) in links">
          <li :key="idx">
            <router-link
              :active-class="'header-link__active'"
              :key="idx" 
              :to="{name: link.to}"
              class="header-list__link"
            >
              {{link.name}}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
  
<script>

export default {
    name: 'app-header',
    components: {
    },
    data() {
      return { 
        // to not be so empty
        links: [
          {
            name: 'empty link',
            to: '/'
          },
          {
            name: 'empty link 1',
            to: '/'
          },
          {
            name: 'empty link 2',
            to: '/'
          },
        ]
      };
  },
}
</script>
  
<style lang="sass">

#some-logo
  margin-right: -7rem

.header
  padding: 2rem 0
  border-bottom: 1px solid #47535C
  background-color: #091016
  display: flex
  align-items: center

  &-list
    display: flex
    align-items: center
    justify-content: center
    gap: 2rem
    max-width: 50%
    margin: 0 auto

    

    &__link
      text-transform: uppercase
      font-weight: 400
      color: #B6BEC2

      &.header-link__active
        font-weight: 500
        color: #fff

</style>
  