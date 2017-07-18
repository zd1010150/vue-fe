<template>

 <!-- <chp-list>
    <template v-for="item in items">
      <chp-list-item :class="{chp-inset:!item.icon}">
        <template v-if="item.routerLink && item.to.length>0">
          <router-link :to="item.to" exact>
            <i :class="fa 'fa-'+item.icon" aria-hidden="true" v-if="item.icon"></i>
            <span>{{item.title}}</span>
          </router-link>
        </template>
        <template v-else>
          <i :class="fa 'fa-'+item.icon" aria-hidden="true" v-if="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <template v-if="item.subs && item.subs.length > 0">

        </template>


      </chp-list-item>

    </template>
  </chp-list>-->


</template>
<script>

  export default{
    data(){
      return {
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
            icon: 'money',
            title: 'Fund Management',
            subs: [
              {
                title: "Deposite Funds",
                open: false,
                routerLink: true,
                to: "/my-trading-account/deposite-funds"
              },
              {
                title: "withdrawal",
                open: false,
                routerLink: true,
                to: "/my-trading-account/withdrawal"
              },
              {
                title: "internalTransfer",
                open: false,
                routerLink: true,
                to: "/my-trading-account/internal-transfer"
              },
              {
                title: "bankAccount",
                open: false,
                routerLink: true,
                to: "/my-trading-account/bank-account"
              }
            ]
          }

        ]
      }
    },
    render(createElement){
      let nodes = [];

      const createChild = (rootNode) => {

        let children = [];
        if (rootNode.subs && rootNode.subs.length > 0) {

          for (let j = 0, len_j = rootNode.subs.length; j < len_j; j++) {
            children.push(createChild(rootNode.subs[j]));
          }
          return createElement("li",[rootNode.title,createElement("ul",children)])

        }
          return createElement("li",[rootNode.title])
        }

      for (let i = 0, len = this.items.length; i < len; i++) {
        nodes.push(createChild(this.items[i]));
      }
      return createElement("ul",nodes);

    },
    mounted(){
        console.log();
    }
  }
</script>
