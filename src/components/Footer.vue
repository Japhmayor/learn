<template lang="">
  
<footer class="footer">
  <div class="container">
    <div class="content has-text-centered">
      <p>Copyright &copy; Meyo 2020. </p>
      <p></p>
    </div>
  </div>
</footer>
          
</template>

<script>
import config from '~config'

export default {
  computed: {
    app() {
      return config.app
    }
  }
}
</script>

<style lang="sass" scoped>
.social-buttons
  span
    margin: 0 3px  
</style>
