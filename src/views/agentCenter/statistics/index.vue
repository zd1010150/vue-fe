<template>
  <div class="container-fluid">
    <agent-statistics-head @agentChange="agentChange"></agent-statistics-head>
    <agent-statistics-tabs :agent="agent"></agent-statistics-tabs>
  </div>
</template>
<script>
  import agentRouterMixin from 'mixins/agentRouterMixin'
  import head from '../head.vue'
  import tabs from './tabs.vue'

  export default {
    mixins: [agentRouterMixin],
    data () {
      return {
        agent: ''
      }
    },
    components: {
      'agent-statistics-head': head,
      'agent-statistics-tabs': tabs
    },
    methods: {
      agentChange (agent) {
        this.agent = agent
      }
    }
  }
</script>
