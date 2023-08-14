<template>
    <div class="layout">
      <app-header/>
      <main>
        <router-view></router-view>
      </main>
      <app-footer/>
    </div>
  </template>
  
  <script>
  import AppHeader from './AppHeader.vue'
  import AppFooter from './AppFooter.vue'
  
  export default {
    name: 'App',
    components: {
      AppHeader,
      AppFooter
    }
  }
  </script>
  
  <style lang="sass">
  .layout
    display: flex
    flex-direction: column
    min-height: 100vh
  </style>
  