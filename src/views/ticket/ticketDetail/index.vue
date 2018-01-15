<i18n src="../i18n.yaml"></i18n>
<template>
  <div class="container-fluid" v-show="loadingStatus">
    <div>
      <section>
        <header class="row bottom-2px-border pb-sm">
          <div class="title col-lg-6 col-md-6 col-sm-12">
            <h4 class="pb-none m-none">{{$t("subject")}}:{{ ticket.subject }}</h4>
            <p class="pt-sm">
              {{ $t('ticketForAccount') }}
              <span class="text-primary"> {{ ticket.account_no}} </span>
              {{ $t('about') }}
              <span class="text-primary">{{ ticket.question }}</span>
            </p>
          </div>
          <div class="operate col-lg-6 col-md-6 col-sm-12 text-right" v-if="currentView == null">
            <chp-button class="mb-xs mt-xs mr-xs btn btn-primary print-btn" @click="reply" v-if="canReply">
              <i class="fa fa-reply hidden-sm hidden-xs pr-xs" aria-hidden="true"></i>{{ $t('ui.button.reply') }}
            </chp-button>
            <chp-button class="mb-xs mt-xs mr-xs btn btn-default print-btn" @click="back">
              <i class="fa fa-chevron-left hidden-sm hidden-xs pr-xs"></i> {{ $t('ui.button.back') }}
            </chp-button>
            <chp-button class="mb-xs mt-xs mr-xs btn btn-danger print-btn" @click="closeIssue" v-if="canClose">
              <i class="fa fa-ban hidden-sm hidden-xs pr-xs"></i> {{ $t('ui.button.closeIssue') }}
            </chp-button>
          </div>
        </header>
        <div class="replay row">
          <chp-expand-transition name="chp-fade">
            <keep-alive>
              <component
                class="col-lg-12 col-md-12 col-sm-12"
                v-bind:is="currentView"
                @submit="submit"
                @cancel="cancel"
                @refresh="refresh"
                :ticketId="ticketId"
              >
              </component>
            </keep-alive>
          </chp-expand-transition>
        </div>
        <ul class="posts pt-lg">
          <template v-for='(post,index) in posts'>
            <ticket-post :username='post.username'
                         :authorId='post.author_id'
                         :content='post.content'
                         :path='post.path'
                         :postTime='post.post_time'>
            </ticket-post>
          </template>
        </ul>

      </section>
    </div>
  </div>
</template>
<script>
  import ticketDetailClose from './close'
  import ticketDetailReplay from './reply'
  import ticketPost from './post'
  import ticketService from 'services/ticketService'
  import { SET_CONTENT_LOADING } from 'store/mutation-types'
  import loadingMix from 'mixins/loading'

  export default {
    mixins: [loadingMix],
    data () {
      return {
        currentView: null,
        ticket: {
          subject: ''
        },
        posts: []
      }
    },
    props: {
      ticketId: String
    },
    components: {
      'ticket-detail-close': ticketDetailClose,
      'ticket-detail-replay': ticketDetailReplay,
      'ticket-post': ticketPost
    },
    methods: {
      submit () {
        this.currentView = null
        this.fetchPosts()
      },
      cancel () {
        this.currentView = null
      },
      async fetchPosts () {
        let {success, data} = await ticketService.getTicketDetail(this.ticketId)
        if (success) {
          this.posts = data && data.posts
          this.ticket = Object.assign({}, this.ticket, data && data.ticket)
        }
        this.$store.commit(SET_CONTENT_LOADING, false)
        this.loadingStatus = true
      },
      reply () {
        this.currentView = 'ticket-detail-replay'
      },
      back () {
        this.$router.push(this.$route.path)
        this.$emit('close', 'detail')
      },
      closeIssue () {
        this.currentView = 'ticket-detail-close'
      },
      refresh () {
        this.fetchPosts()
      }
    },
    computed: {
      canReply: function () {
        return this.ticket && (this.ticket.status === 'replied' || this.ticket.status === 'pending')
      },
      canClose: function () {
        return this.ticket && this.ticket.status !== 'closed'
      }
    },
    activated () {
      this.loadingStatus = false
      this.$store.commit(SET_CONTENT_LOADING, true)
      this.posts = []
      this.fetchPosts()
    }
  }
</script>
<style lang="less" scoped>
  @import "~assets/less/variable.less";

  ul {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
  }
</style>
