<template>
  <div>


    <div >
     <chp-list class="nav-main">
          <chp-list-item>


         <i class="fa fa-money" aria-hidden="true"></i>
         <span>uiDemo</span>
         <chp-list-expand>
           <chp-list>
             <chp-list-item class="chp-inset">
               <router-link to="/uiDemo/" exact >UI Demo index</router-link>
             </chp-list-item>
             <chp-list-item class="chp-inset">
               <router-link  to="/uiDemo/form-validate" exact>Form Validate</router-link>
             </chp-list-item>
           </chp-list>
         </chp-list-expand>
       </chp-list-item>
        <chp-list-item>
          <router-link to="/main" class="chp-list-item-container chp-button">
            <i class="fa fa-home" aria-hidden="true"></i>
            <span>Dashboard</span>
          </router-link>
        </chp-list-item>
        <chp-list-item href="#my-trading-account">
          <i class="fa fa-trademark" aria-hidden="true"></i>
          <span>My Trading Account</span>
        </chp-list-item>
        <chp-list-item>
          <i class="fa fa-money" aria-hidden="true"></i>
          <span>Fund Management</span>
          <chp-list-expand>
            <chp-list>
              <chp-list-item class="chp-inset">
                <router-link to="/my-trading-account/deposite-funds" exact >Deposit Funds</router-link>
              </chp-list-item>
              <chp-list-item class="chp-inset" >
                <router-link to="/my-trading-account/withdrawal" exact >Withdrawal</router-link>
              </chp-list-item>
              <chp-list-item class="chp-inset" >
                <router-link to="/my-trading-account/internal-transfer" exact >Internal Transfer</router-link>
              </chp-list-item>
              <chp-list-item class="chp-inset" >
                <router-link to="/my-trading-account/bank-account" exact >Bank Account</router-link>
              </chp-list-item>
            </chp-list>
          </chp-list-expand>
        </chp-list-item>

        <chp-list-item>
            <i class="fa fa-line-chart" aria-hidden="true"></i>
            <span>Agent Center</span>
         <chp-list-expand>
            <chp-list>
              <chp-list-item class="chp-inset" href="#my-trading-account/statistics">

                Statistics
              </chp-list-item>
              <chp-list-item class="chp-inset" href="#my-trading-account/client-list">
                Client List
              </chp-list-item>
              <chp-list-item class="chp-inset" href="#my-trading-account/marketing-materials">
                Marketing Materials
              </chp-list-item>
            </chp-list>
          </chp-list-expand>
        </chp-list-item>
        <chp-list-item>
            <i class="fa fa-download" aria-hidden="true" href="#download-center"></i>
            <span>Download Center</span>
        </chp-list-item>
       <chp-list-item>
         <i class="fa fa-bell-o" aria-hidden="true" href="#notice"></i>
         <span>Notice</span>
       </chp-list-item>
       <chp-list-item>

           <i class="fa fa-gift" aria-hidden="true" href="#event"></i>
           <span>Event</span>
           <mu-badge content="12" primary/>
       </chp-list-item>
        <chp-list-item>
            <i class="fa fa-tags" aria-hidden="true"></i>
            <span>Ticket</span>
            <mu-badge content="12" primary/>
          <chp-list-expand>
            <chp-list>
              <chp-list-item class="chp-inset" href="#ticket/new-ticket">New Ticket</chp-list-item>
              <chp-list-item class="chp-inset" href="#ticket/ticket-list">Ticket List</chp-list-item>
            </chp-list>
          </chp-list-expand>
        </chp-list-item>

        <chp-list-item>


            <i class="fa fa-graduation-cap" aria-hidden="true"></i>
            <span>Training</span>
            <chp-list-expand>
              <chp-list>
                <chp-list-item class="chp-inset" href="#training/online-training">
                  <span> Online Training </span>
                  <mu-badge content="12" primary/>
                </chp-list-item>
                <chp-list-item class="chp-inset" >
                  <span> Books and Magazines </span>
                  <mu-badge content="12" primary/>
                  <chp-list-expand>
                    <chp-list>
                      <chp-list-item class="chp-inset" href="#training/books-magazines/money-theory">Money Theory</chp-list-item>
                      <chp-list-item class="chp-inset" href="#training/books-magazines/educational-books">
                        Educational Books
                      </chp-list-item>
                    </chp-list>
                  </chp-list-expand>
                </chp-list-item>
                <chp-list-item class="chp-inset">

                  <span>Videos</span>
                  <chp-list-expand>
                    <chp-list>
                      <chp-list-item href="#/videos/stock">
                        股市情报局
                      </chp-list-item>
                      <chp-list-item href="#/videos/analyse">
                        视频分析
                      </chp-list-item>
                      <chp-list-item href="#/videos/teaching">
                        教学视频
                      </chp-list-item>
                    </chp-list>
                  </chp-list-expand>



                </chp-list-item>

              </chp-list>
            </chp-list-expand>

        </chp-list-item>
      </chp-list>
    </div>




  </div>

</template>
<script>
  export default{
    data(){
      return{
        defaultState:[false,false,false,false,false,false],
        isItemOpen:[false,false,false,false,false,false],
        isItemOpenTest:true,
        open:false,
        index: 0,
      }
    },
    methods:{
      menuItemClick(item){
      },
      itemClick(index,subindex){
        // isItemOpen 必须与当前Item状态保持一致才有效
        // 原来的代码逻辑是不一致的，在点击同一个的时候不管怎样都是false
        // isItemOpen的值发生变化时才会导致内部状态变化
        // 内部状态在点击的时候本身就会变化
        if (index === this.index) {
          this.isItemOpen.splice(index, 1, !this.isItemOpen[index]);
        } else {
          this.isItemOpen.splice(this.index, 1, false);
          this.index = index;
          this.isItemOpen.splice(this.index, 1, true);
        }
      },
      openNestedMenuTest(){

        this.open = !this.open;
      }
    }
  }
</script>
<style lang="less">
  .level2-menu {
  .mu-item-wrapper {
    padding-left: 18px;
  }
  .mu-item.show-right {
    padding-right: 24px;
  }
  }
</style>
