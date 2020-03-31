<template lang="">
<transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
  <div class="container video-list animated" v-if="videos.length">
    <div class="columns" v-for="column in chunk(videos, columns)">
      <v-video class="column" v-for="(video, index) in column" :video="video" :key="index" :class="[ columnSize ]"></v-video>
    </div>
  </div>
</transition>
</template>

<script>
import chunk from 'lodash.chunk'
import Video from '~components/Video.vue'

export default {
  components: {
    'v-video': Video
  },
  props: {
    videos: Array,
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