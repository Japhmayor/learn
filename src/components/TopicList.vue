<template lang="">
<transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
  <div class="container topic-list animated" v-if="topics.length">
    <div class="columns" v-for="column in chunk(topics, columns)">
      <v-topic class="column" v-for="(topic, index) in column" :topic="topic" :key="index" :class="[ columnSize ]"></v-topic>
    </div>
  </div>
</transition>
</template>

<script>
import chunk from 'lodash.chunk'
import Topic from '~components/Topic.vue'

export default {
  components: {
    'v-topic': Topic
  },
  props: {
    topics: Array,
    columns: {
      type: Number,
      default: 4
    }
  },
  computed: {
    columnSize() {
      return 'is-' + Math.floor(12 / this.columns)
    }
  },
  methods: {
    chunk
  }
}
</script>

<style lang="sass" scoped>
@import '~animate.css'

.animated
  animation-duration: .25s
</style>