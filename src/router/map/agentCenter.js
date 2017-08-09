import agentActivity from 'views/agentCenter/agentActivity/index'
import clientList from 'views/agentCenter/clientList/index'
import marketingMaterials from 'views/agentCenter/marketingMaterials/index'
import statistics from 'views/agentCenter/statistics/index'


export default [{
  path: "agent-center/agent-activity",
  component: agentActivity,
  meta: {
    requiresAuth: true,
    pageTitle: "agentActivity"
  }
}, {
  path: "agent-center/statistics",
  component: statistics,
  meta: {
    requiresAuth: true,
    pageTitle: "statistics"
  }
}, {
  path: "agent-center/client-list",
  component: clientList,
  meta: {
    requiresAuth: true,
    pageTitle: "clientList"
  }
}, {
  path: "agent-center/marketing-materials",
  component: marketingMaterials,
  meta: {
    requiresAuth: true,
    pageTitle: "marketingMaterials"
  }
}

];
