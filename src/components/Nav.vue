<template lang="">

<nav class="nav has-shadow">
  <div class="container">
    <div class="nav-title">
      <p>Popular</p>
      <p>topics</p>
    </div>
    <div class="nav-item is-scrollable">
      <router-link class="button is-white" v-for="topic in topics" :key="topic.id" :to="{ name: 'topic', params: { id: topic.id } }"><strong>{{ topic.title }}</strong></router-link>
      <router-link class="link more-link" :to="{ name: 'topics' }"><strong>Show all..</strong></router-link>
    </div>
  </div>
</nav>
</template>

<script>
import store from '~store'

export default {
  data() {
    return {
      topics: [],
      limit: 12
    }
  },
  created() {
    this.loadTopics()
  },
  methods: {
    loadTopics() {
      store.fetchTopics({ order: 'score', limit: this.limit }).then(topics => {
        this.topics = topics
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.nav
  position: fixed !important
  top: 60px
  left: 0
  right: 0
  z-index: 3
  strong
    font-weight: 500

.nav-title
  color: #757575
  font-weight: 700
  text-transform: uppercase
  line-height: 1
  margin: 12px 0
  text-align: left
  border-right: 1px solid #ddd
  padding-right: 10px
  padding-left: 10px

.link
  &:hover
    text-decoration: underline

.is-scrollable
  overflow-x: scroll
  width: calc(100% - 100px)
  &::-webkit-scrollbar
    display: none

.more-link
  margin-left: 12px
</style>
