<template lang="">

<main>
  <div class="hero is-black is-large" v-if="loaded &amp;&amp; video &amp;&amp; !error">
    <div class="hero-body is-paddingless">
      <div class="container">
        <player :id="video.id" autoplay></player>
      </div>
    </div>
  </div>
  <section class="section" v-if="loaded &amp;&amp; video &amp;&amp; !error">
    <div class="container">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48" v-if="video.channel"><img class="is-circle" :src="video.channel.thumbnails.default.url" :alt="video.channelTitle + ' channel logo'"></figure>
        </div>
        <div class="media-content">
          <div class="content">
            <h2 class="title is-5"><strong>{{ video.title }}</strong></h2>
            <p class="subtitle is-6"> 
              <router-link :to="{ name: 'channel', params: { id: video.channelId } }">{{ video.channelTitle }}</router-link> * {{ publishedAt }}
            </p>
          </div>
        </div>
        <div class="media-right"><span>{{ viewCount }}</span></div>
      </div>
      <div class="content has-margintop">
        <p v-html="description"></p>
        <div class="control is-grouped">
          <div class="control" v-for="topic in video.topics">
            <router-link class="button" :to="{ name: 'topic', params: { id: topic.id } }" exact>{{ topic.title }}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-for="topic in video.topics">
      <topic-related-videos :topic="topic"></topic-related-videos>
    </div>
    <channel-recent-videos :channel="video.channel"></channel-recent-videos>
  </section>
  <div class="hero is-large" v-if="loaded &amp;&amp; error">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h2 class="title is-3">Sorry, but this video is somehow not loaded 😞</h2>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import dayjs from 'dayjs'
import numeral from 'numeral'
import nl2br from 'nl2br'
import linkifyjs from 'linkifyjs/html'
import truncate from 'lodash.truncate'
import store from '~store'
import config from '~config'
import Player from '~components/Player.vue'
import ChannelRecentVideos from '~widgets/ChannelRecentVideos.vue'
import TopicRelatedVideos from '~widgets/TopicRelatedVideos.vue'

export default {
  components: { Player, ChannelRecentVideos, TopicRelatedVideos },
  data() {
    return {
      video: null,
      loaded: false,
      params: {
        title: '',
        description: ''
      },
      error: null
    }
  },
  computed: {
    publishedAt() {
      return 'Published on ' + dayjs(this.video.publishedAt).format('MMM D, YYYY')
    },
    viewCount() {
      return numeral(this.video.viewCount).format('0,0') + ' views'
    },
    description() {
      return nl2br(linkifyjs(this.video.description, {
        attributes: {
          rel: 'noopener'
        }
      }))
    }
  },
  created() {
    this.video = null
    this.loaded = false
    this.loadVideo()
  },
  watch: {
    $route() {
      this.video = null
      this.loaded = false
      this.loadVideo()
    }
  },
  methods: {
    loadVideo() {
      store.fetchVideo(this.$route.params.id).then(video => {
        store.fetchChannel(video.channelId).then(channel => {
          video.channel = channel
          video.topics = []
          this.video = video
          this.loaded = true
          this.params.title = video.title
          this.params.description = truncate(video.description.replace(/\r?\n|\r/g, ''), { 'length': 155, 'separator': ' ' })
          this.$emit('updateHead')
          const id = video.tags.join(',')
          if(id) {
            store.fetchTopics({ id }).then(topics => {
              this.video.topics = topics
            })
          }
        })
      }).catch((err) => {
        this.loaded = true
        this.error = err.message
      })
    }
  },
  head: {
    title() {
      return {
        inner: this.params.title,
        separator: '-',
        complement: config.app.name
      }
    },
    meta() {
      return [
        { id: 'description', name: 'description', content: this.params.description }
      ]
    }
  }
}
</script>