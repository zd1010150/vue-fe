export default{
  data(){
    return {
      routerArr: [],
      items: [
        {
          icon: 'home',
          title: 'Dashboard',
          open: false,
          routerLink: true,
          to: "/main"
        },
        {
          icon: 'money',
          title: 'ui Demo',
          subs: [
            {
              title: "ui component",
              open: false,
              routerLink: true,
              to: "/uiDemo/ui-component"
            },
            {
              title: "formvalidate",
              open: false,
              routerLink: true,
              to: "/uiDemo/form-validate"
            }
          ]
        },

        {
          icon: 'trademark',
          title: 'My Trading Account',
          open: false,
          routerLink: true,
          to: "/my-trading-account"
        },
        {
          icon: 'money',
          title: 'Fund Management',
          subs: [
            {
              title: "Deposite Funds",
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
              title: "Internal Transfer",
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
          title: 'Agent Center',
          subs: [
            {
              title: "Statistics",
              open: false,
              routerLink: true,
              to: "/agent-center/deposite-funds"
            },
            {
              title: "Client List",
              open: false,
              routerLink: true,
              to: "/agent-center/client-list"
            },
            {
              title: " Marketing Materials",
              open: false,
              routerLink: true,
              to: "/agent-center/marketing-materials"
            }
          ]
        },

        {
          icon: 'download',
          title: 'Download Center',
          open: false,
          routerLink: true,
          to: "/download-center"
        },
        {
          icon: 'bell-o',
          title: 'Notice',
          open: false,
          routerLink: true,
          to: "/notice"
        },
        {
          icon: 'gift',
          title: 'Event',
          open: false,
          routerLink: true,
          to: "/event"
        },
        {
          icon: 'tags',
          title: 'Ticket',
          subs: [
            {
              title: "New Ticket",
              open: false,
              routerLink: true,
              to: "/ticket/new-ticket"
            },
            {
              title: "Ticket List",
              open: false,
              routerLink: true,
              to: "/ticket/ticket-list"
            }
          ]
        },
        {
          icon: 'graduation-cap',
          title: 'Training',
          subs: [
            {
              title: "Online Training",
              open: false,
              routerLink: true,
              to: "/training/online-training"
            },
            {
              title: "Books and Magazines",
              open: false,
              routerLink: false,
              subs: [{
                title: 'Money Theory',
                to: '/training/books-magazines/money-theory',
                open: false,
                routerLink: true
              }, {
                title: "Educational Books",
                to: '/training/books-magazines/educational-books',
                open: false,
                routerLink: true
              }]
            },
            {
              title: "Videos",
              open: false,
              routerLink: false,
              subs: [{
                title: '股市情报局',
                to: '/training/videos/stock',
                open: false,
                routerLink: true
              }, {
                title: "视频分析",
                to: '/training/videos/analyse',
                open: false,
                routerLink: true
              },
                {
                  title: "教学视频",
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
      children.push(createElement("span", node.title));
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
            exact: true
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
    //console.log("mounted is trigger,",this.$route.path,JSON.stringify(this.items));
    this.setItemsOpen(this.$route.path);
  },
  methods: {
    setItemsOpen(path){
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
      let $html = document.querySelector("html");
      $html.classList.toggle("sidebar-left-opened");
    }
  }
}
