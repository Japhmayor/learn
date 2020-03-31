<template lang="pug">

<section class="section">
  <div class="container">
    <div class="content">
      <p class="title is-5" v-if="channel.description"><strong>About</strong></p>
      <ul class="channel-stats">
        <li>{{ subscriberCount }} subscribers</li>
        <li>{{ viewCount }} views</li>
        <li>joined {{ publishedAt }}</li>
      </ul>
      <p v-html="channel.description"></p>
    </div>
  </div>
</section>
</template>

<script>
import numeral from 'numeral'
import dayjs from 'dayjs'
import store from '~store'

export default {
  data() {
    return {
      channel: store.currentChannel
    }
  },
  computed: {
    subscriberCount() {
      return numeral(this.channel.subscriberCount).format('0,0')
    },
    viewCount() {
      return numeral(this.channel.viewCount).format('0,0')
    },
    publishedAt() {
      return dayjs(this.channel.publishedAt).format('MMM D, YYYY')
    }
  },
  created() {
    this.$Progress.finish()
  }
}
</script>

<style lang="sass">
.channel-title
  // margin-bottom: 0 !important
.channel-stats
  list-style: none !important
  margin-left: 0 !important
  li
    font-weight: 500
    color: #4a4a4a
</style>