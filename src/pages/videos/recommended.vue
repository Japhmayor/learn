<template lang="">
<section class="section">
  <div class="container">
    <h2 class="title is-5"><strong>Recommended</strong></h2>
    <video-list :videos="videos"></video-list>
  </div>
</section>
</template>

<script>
import store from '~store'
import util from '~util'
import filters from '~api/filters'
import VideoList from '~components/VideoList.vue'

export default {
  components: {
    VideoList
  },
  data() {
    return {
      videos: [],
      limit: 12,
      loaded: false
    }
  },
  created() {
    this.loadVideos()
  },
  methods: {
    loadVideos() {
      this.loaded = false
      store.fetchTopics().then(topics => {
        const params = {
          q: util.prepareQuery(topics),
          videoCategoryId: 27,
          order: filters.order[3].value,
          maxResults: this.limit,
          publishedAfter: filters.timeframe[3].value
        }

        store.fetchVideos(params).then(result => {
          this.videos = result.videos
          this.$Progress.finish()
          this.loaded = true
        }).catch(() => {
          this.$Progress.fail()
        })
      }).catch(() => {
        this.$Progress.fail()
      })
    }
  }
}
</script>