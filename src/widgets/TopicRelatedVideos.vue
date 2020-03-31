<template lang="">

<section class="section is-paddingless" v-if="topic &amp;&amp; videos.length">
  <hr>
  <div class="container"><strong>More from 
      <router-link :to="{ name: 'topic', params: { id: topic.id } }">{{ topic.title }}</router-link></strong>
    <div class="has-margintop">
      <video-list :videos="videos" :columns="limit"></video-list>
    </div>
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
  props: {
    topic: Object
  },
  data() {
    return {
      videos: [],
      limit: 6
    }
  },
  created() {
    this.loadVideos()
  },
  watch: {
    '$route': 'loadVideos'
  },
  methods: {
    loadVideos() {
      const params = {
        q: util.prepareQuery(this.topic),
        order: filters.order[3].value,
        maxResults: this.limit
      }

      store.fetchVideos(params).then(result => {
        this.videos = result.videos
      })
    }
  }
}
</script>