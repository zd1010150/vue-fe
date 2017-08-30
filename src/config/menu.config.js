//公共的菜单，所有用户都有
export const common= [
        {
          icon: 'home',
          title: 'dashboard',
          open: false,
          routerLink: true,
          to: "/main"
        },
        {
          icon: 'money',
          title: 'uiDemo',
          subs: [
            {
              title: "uiComponent",
              open: false,
              routerLink: true,
              to: "/uiDemo/ui-component"
            },
            {
              title: "formvalidate",
              open: false,
              routerLink: true,
              to: "/uiDemo/form-validate"
            },
            {
              title: "echarts",
              open: false,
              routerLink: true,
              to: "/uiDemo/echarts"
            }
          ]
        },

        {
          icon: 'trademark',
          title: 'accountManagement',
          subs:[{
              title: "myTradingAcoount",
              open: false,
              routerLink: true,
              to: "/account-management/my-trading-account"
            },{
              title: "applicationSubaccount",
              open: false,
              routerLink: true,
              to: "/account-management/application-sub-account"
            }]
        },
        {
          icon: 'money',
          title: 'fundManagement',
          subs: [
            {
              title: "depositeFunds",
              open: false,
              routerLink: true,
              to: "/fund-manager/deposite-funds"
            },
            {
              title: "withdrawal",
              open: false,
              routerLink: true,
              to: "/fund-manager/withdrawal"
            },
            {
              title: "internalTransfer",
              open: false,
              routerLink: true,
              to: "/fund-manager/internal-transfer"
            },
            {
              title: "bankAccount",
              open: false,
              routerLink: true,
              to: "/fund-manager/bank-account"
            }
          ]
        },
        {
          icon: 'download',
          title: 'downloadCenter',
          open: false,
          routerLink: true,
          to: "/download-center"
        },
        {
          icon: 'bell-o',
          title: 'notice',
          open: false,
          routerLink: true,
          to: "/notice"
        },
        {
          icon: 'gift',
          title: 'event',
          open: false,
          routerLink: true,
          to: "/event"
        },
        {
          icon: 'tags',
          title: 'ticket',
          open: false,
          routerLink: true,
          to: "/ticket/ticketList"
        },
        {
          icon: 'graduation-cap',
          title: 'training',
          subs: [
            {
              title: "onlineTraining",
              open: false,
              routerLink: true,
              to: "/training/online-training"
            },
            {
              title: "booksandMagazines",
              open: false,
              routerLink: false,
              subs: [{
                title: 'moneyTheory',
                to: '/training/books-magazines/money-theory',
                open: false,
                routerLink: true
              }, {
                title: "educationalBooks",
                to: '/training/books-magazines/educational-books',
                open: false,
                routerLink: true
              }]
            },
            {
              title: "videos",
              open: false,
              routerLink: true,
              to:"/training/videos"
            }
          ]
        }

      ]
//AGENT 才有得菜单
export const agent =  [{
      icon: 'line-chart',
      title: 'agentCenter',
      subs: [
        {
          title: 'agentActivity',
          open: false,
          routerLink: true,
          to: "/agent-center/agent-activity"
        },
        {
          title: "statistics",
          open: false,
          routerLink: true,
          to: "/agent-center/statistics"
        },
        {
          title: "clientList",
          open: false,
          routerLink: true,
          to: "/agent-center/client-list"
        },
        {
          title: " marketingMaterials",
          open: false,
          routerLink: true,
          to: "/agent-center/marketing-materials"
        }
      ]
    }]
//非agent的路由
export const nonAgent = [{
      icon: 'line-chart',
      title: 'agentCenter',
      open: false,
      routerLink: true,
      to: "/agent-center/applyAffiliate"
    }]