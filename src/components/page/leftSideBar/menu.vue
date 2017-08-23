<i18n src="./i18n.yaml"></i18n>
<script>
 import { SET_LEFT_SIDE_BAR_STATUS } from "store/mutation-types"
  export default{
  data(){
    return {
      routerArr: [],
      items: [
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
              routerLink: false,
              subs: [{
                title: 'stock',
                to: '/training/videos/stock',
                open: false,
                routerLink: true
              }, {
                title: "analyse",
                to: '/training/videos/analyse',
                open: false,
                routerLink: true
              },
                {
                  title: "teaching",
                  to: '/training/videos/teaching',
                  open: false,
                  routerLink: true
                }]
            },
          ]
        }

      ]
    }
  },
  render(createElement){
    let nodes = [], level = 0, id = 0, _routerArr = [];
    /*渲染一个菜单项*/
    const renderOneItem = (node) => {
      let children = [], routerLink;
      if (node.icon) {
        children.push(createElement("i", {
          'class': ['fa', 'fa-' + node.icon]
        }));
      }
      children.push(createElement("span", this.$t("menu."+node.title)));
      if (node.notice) {
        children.push(createElement("mu-badge", {
          props: {
            content: node.notice + "",
            primary: true
          }
        }));
      }
      if (node.routerLink && node.to) {
        routerLink = createElement("router-link", {
          props: {
            to: node.to,
            exact: false
          }
        }, children);

      }
      return routerLink ? [routerLink] : children;
    };
    const createChild = (rootNode, level) => {

      let children = [], childrenNodes;
      if (rootNode.subs && rootNode.subs.length > 0) {

        for (let j = 0, len_j = rootNode.subs.length; j < len_j; j++) {
          rootNode.subs[j].id = ++id;
          rootNode.subs[j].index = rootNode.index + "-" + j;
          children.push(createChild(rootNode.subs[j], level + 1));
        }
        childrenNodes = createElement("chp-list-expand", [createElement("chp-list", children)]);
      }
      return createElement('chp-list-item', {
        'class': [{
          'chp-inset': !rootNode.icon
        },
          'level-' + level + "-menu"],
        props: {
          open: rootNode.open
        }
      }, [renderOneItem(rootNode), childrenNodes ? childrenNodes : []]);
    };

    for (let i = 0, len = this.items.length; i < len; i++) {
      this.items[i].id = ++id;
      this.items[i].index = i;
      nodes.push(createChild(this.items[i], level));
    }
    return createElement("chp-list", nodes);

  },
  mounted(){
    this.setItemsOpen(this.$route.path);
  },
  methods: {
    closeAllItems(){
      try{


      let traverse = (root)=>{
        if(root.open != undefined){
          root.open = false
        }
        if(root.subs){
          for(let i=0,len=root.subs.length;i<len;i++){
            traverse(root.subs[i])
          }
        }
      }
      for(let i=0,len=this.items.length;i<len;i++){
        traverse(this.items[i])
      }
       }catch(ex){
        console.log(ex)
       }
    },
    setItemsOpen(path){
      this.closeAllItems();
      let parentIds = [], routerArr;
      const getPathIndex = (path) => {
        let _pathIndex;
        const traverseChild = (node) => {
          if (node.subs && node.subs.length > 0) {
            for (let j = 0, len_j = node.subs.length; j < len_j; j++) {
              let oneItem = node.subs[j];
              if (oneItem.to === path) {
                return oneItem.index;
              } else {
                let _index = traverseChild(oneItem);
                if (_index) {
                  return _index
                } else {
                  continue;
                }
              }
            }
          } else {
            return;
          }
        };
        for (let i = 0, len = this.items.length; i < len; i++) {
          let oneItem = this.items[i];
          if (oneItem.to === path) {
            return oneItem.index;
          } else {
            let _index = traverseChild(oneItem);
            if (_index) {
              return _index
            } else {
              continue;
            }
          }
        }
        ;
        return _pathIndex;
      }
      
      let _path = getPathIndex(path)+"";
      if(_path.indexOf("-") > -1){
        parentIds = _path.split("-");
      }else{
        parentIds = new Array(_path);
      }

      const setAllparents = () => {
        if (!parentIds) {
          return;
        }
        let len = parentIds.length;
        if (len == 1) {
          let index1 = parentIds[0]
          this.$set(this.items, index1, Object.assign(this.items[index1], {open: true}));
        }
        if (len == 2) {
          let index1 = parentIds[0], index2 = parentIds[1];
          this.$set(this.items, index1, Object.assign(this.items[index1], {open: true}));
          this.$set(this.items[index1].subs, index2, Object.assign(this.items[index1].subs[index2], {open: true}));
        }
        if (len == 3) {
          let index1 = parentIds[0], index2 = parentIds[1], index3 = parentIds[2];
          this.$set(this.items, index1, Object.assign(this.items[index1], {open: true}));
          this.$set(this.items[index1].subs, index2, Object.assign(this.items[index1].subs[index2], {open: true}));
          this.$set(this.items[index1].subs[index2].subs, index3, Object.assign(this.items[index1].subs[index2].subs[index3], {open: true}));
        }
      }

      setAllparents();
    }

  },
  watch: {
    $route(val, oldVal){
      // let $html = document.querySelector("html");
      // $html.classList.toggle("sidebar-left-opened");
      if(window.innerWidth<768){//小屏幕下才自动关闭，大屏幕不会
        console.log("menu js");
        this.$store.commit(SET_LEFT_SIDE_BAR_STATUS,false)
      }
      
    },
    "$route.path"(val){
      console.log("menu path change",val);
      this.setItemsOpen(val)
    }
  }
}

</script>

