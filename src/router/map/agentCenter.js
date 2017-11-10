import agentActivity from 'views/agentCenter/agentActivity/index'
import clientList from 'views/agentCenter/clientList/index'
import marketingMaterials from 'views/agentCenter/marketingMaterials/index'
import statistics from 'views/agentCenter/statistics/index'
import afflinate from 'views/agentCenter/applyAffiliate'

export default [{
  path: 'agent-center/agent-activity',
  component: agentActivity,
  meta: {
    requiresAuth: true,
    pageTitle: 'agentActivity',
    requireAgentAuth: true,
    agent: true
  }
}, {
  path: 'agent-center/statistics',
  component: statistics,
  meta: {
    requiresAuth: true,
    pageTitle: 'statistics',
    requireAgentAuth: true,
    agent: true
  }
}, {
  path: 'agent-center/client-list',
  component: clientList,
  meta: {
    requiresAuth: true,
    pageTitle: 'clientList',
    requireAgentAuth: true,
    agent: true
  }
}, {
  path: 'agent-center/marketing-materials',
  component: marketingMaterials,
  meta: {
    requiresAuth: true,
    requireAgentAuth: true,
    agent: true,
    pageTitle: 'marketingMaterials'
  }
},
{
  path: 'agent-center/applyAffiliate',
  component: afflinate,
  meta: {
    requiresAuth: true,
    requireAgentAuth: true,
    agent: false,
    pageTitle: 'affiliate'
  }
}]
