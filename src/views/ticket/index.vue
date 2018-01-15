<template>
  <transition name="slide-fade" mode="out-in">
    <keep-alive>
      <component
        v-bind:is="currentView"
        @close="close"
        :ticketId="ticketId"
      ></component>
    </keep-alive>
  </transition>
</template>
<script>
  import ticketDetail from './ticketDetail/index'
  import ticketList from './ticketList/index'

  export default {
    data () {
      return {
        currentView: '',
        ticketId: ''
      }
    },
    components: {
      'ticket-list': ticketList,
      'ticket-detail': ticketDetail
    },
    methods: {
      close (currentView, ticketId) {
        if (currentView === 'list') {
          this.currentView = 'ticket-detail'
        } else if (currentView === 'detail') {
          this.currentView = 'ticket-list'
        }
        this.ticketId = ticketId + ''
      },
      renderPage (ticketId) {
        if ((ticketId + '' === '0') || ticketId) {
          this.currentView = 'ticket-detail'
        } else {
          this.currentView = 'ticket-list'
        }
        this.ticketId = ticketId + ''
      }
    },
    watch: {
      '$route': function (route) {
        this.renderPage(route && route.query && route.query.ticketId)
      }
    },
    mounted () {
      const route = this.$route
      this.renderPage(route && route.query && route.query.ticketId)
    }
  }
</script>
