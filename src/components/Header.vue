<template lang="">

<header class="nav header">
  <div class="container">
    <div class="nav-left">
      <router-link class="logo nav-item is-brand" to="/"><img class="is-hidden-mobile" :src="app.brand.logo" :alt="app.name + ' logo'"><img class="is-hidden-tablet" :src="app.brand.logoMini" :alt="app.name + ' logo'"></router-link>
      <search class="nav-item"></search>
    </div>
    <div class="nav-right is-hidden-mobile">
      <div class="nav-item social-buttons">
        <a class="button" :href="'https://twitter.com/intent/tweet?text=' + app.twitter.tweet + '&amp;url=' + app.url + '&amp;via=' + app.twitter.username" target="_blank" rel="noopener noreferrer"><span class="icon">
            <ion-icon name="logo-twitter"></ion-icon></span>
            <span>Tweet</span></a>
      </div>
    </div>
  </div>
</header>
</template>

<script>
import config from '~config'
import Search from '~components/Search.vue'

export default {
  components: { Search },
  computed: {
    app() {
      return config.app
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  min-height: 70px
  background-color: white
  position: fixed !important
  top: 0
  left: 0
  right: 0
  z-index: 4
.logo
  img
    max-height: 35px

.nav-left
  flex-basis: auto

.social-buttons
  margin-right: 6px
  .button
    color: #4a4a4a
  ion-icon
    height: 24px
    font-size: 22px
    display: flex
    align-items: center
</style>
