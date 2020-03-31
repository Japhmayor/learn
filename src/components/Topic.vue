<template lang="">

<div>
  <router-link class="topic-link" :to="{ name: 'topic', params: { id: topic.id } }">
    <div class="card">
      <div class="card-image">
        <div class="hero is-small" :style="{ backgroundColor: topic.color }">
          <div class="hero-body"></div>
        </div>
      </div>
      <div class="card__content info">
        <div class="container">
          <div class="media">
            <div class="media-left">
              <div class="image logo"><span class="logo__wrapper"></span><img :src="topic.logo" :alt="topic.title + ' Logo'"></div>
            </div>
            <div class="media-content">
              <div class="content">
                <div class="title is-5"><strong>{{ topic.title }}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</div>
</template>

<script>
export default {
  props: {
    topic: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="sass" scoped>
.topic-link:hover
  .card
    box-shadow: 0px 2px 15px rgba(0,0,0,.2)

.card
  border-radius: 3px
  overflow: hidden
  width: 100%

.info
  padding: 0 20px

  .content
    padding: 8px 0

  .logo
    background-color: #fff
    border-radius: 6px
    z-index: 2
    border: 5px solid #fff
    top: -37px
    width: 70px
    height: 70px
    box-shadow: 0 1px 2px rgba(0,0,0,.1)
    
    &__wrapper
      display: inline-block
      height: 100%
      vertical-align: middle

    img 
      display: inline-block
      vertical-align: middle
      max-height: 100%
      max-width: 100%
</style>