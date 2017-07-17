<template>
  <div>
    <div>
     <chp-list>
    
    </chp-list>
    </div>
  </div>

</template>
<script>
  export default{
    data(){
      return{
        items: [
                    {
                        icon: 'home',
                        title: 'Dashboard',
                        open:false,
                        routerLink:true,
                        to:"/main"
                    },
                    {
                        icon: 'money',
                        title: 'ui Demo',
                        subs: [
                            {
                                title:"ui component",
                                open:false,
                                routerLink:true,
                                to:"/uiDemo/ui-component"
                            },
                            {
                              title:"formvalidate",
                              open:false,
                              routerLink:true,
                              to:"/uiDemo/form-validate"
                            }
                        ]
                    },
                    {
                        icon: 'money',
                        title: 'Fund Management',
                        subs: [
                            {
                              title:"Deposite Funds",
                              open:false,
                              routerLink:true,
                              to:"/my-trading-account/deposite-funds"
                            },
                            {
                              title:"withdrawal",
                              open:false,
                              routerLink:true,
                              to:"/my-trading-account/withdrawal"
                            },
                            {
                              title:"internalTransfer",
                              open:false,
                              routerLink:true,
                              to:"/my-trading-account/internal-transfer"
                            },
                            {
                              title:"bankAccount",
                              open:false,
                              routerLink:true,
                              to:"/my-trading-account/bank-account"
                            }
                        ]
                    }

                ]
      }
    },
    methods:{

    }
  }
</script>
