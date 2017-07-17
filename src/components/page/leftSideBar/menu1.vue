<template>
<div>
  <button @click="openNestedMenuTest">openNestedMenu</button>
  <mu-list class="leftsidebar-menu-list" activeClass="active-router" @itemClick="menuItemClick">
    <mu-list-item title="Dashboard" href="/">
      <mu-icon slot="left" value="home" />
    </mu-list-item>
    <mu-list-item title="My Trading Account" href="/my-trading-account">
      <mu-icon slot="left" value="account_box" />
    </mu-list-item>
    <mu-list-item title="Fund Management" toggleNested  nestedListClass="level2-menu" :open="isItemOpen[0]" @click="itemClick(0)">
      <mu-icon slot="left" value="attach_money" />
      <mu-list-item title="Deposit Funds" slot="nested"></mu-list-item>
      <mu-list-item title="Widthdrawal" slot="nested"></mu-list-item>
      <mu-list-item title="Internal Transfer" slot="nested"></mu-list-item>
      <mu-list-item title="Bank Account" slot="nested"></mu-list-item>
    </mu-list-item>
    <mu-list-item title="Agent Center" toggleNested nestedListClass="level2-menu" key="2" :open="isItemOpen[1]" @click="itemClick(1)">
      <mu-icon slot="left" value="people" />
      <mu-list-item title="Statistics" slot="nested"></mu-list-item>
      <mu-list-item title="Client List" slot="nested"></mu-list-item>
      <mu-list-item title="Marketing Materials" slot="nested"></mu-list-item>
    </mu-list-item>
    <mu-list-item title="Download" href="/">
      <mu-icon slot="left" value="cloud_download" />
    </mu-list-item>
    <mu-list-item title="Notice" href="/">
      <mu-icon slot="left" value="notifications_none" />
    </mu-list-item>
    <mu-list-item title="Event" href="/">
      <mu-icon slot="left" value="event" />
    </mu-list-item>
    <mu-list-item title="Ticket" toggleNested nestedListClass="level2-menu" key="3" :open="isItemOpen[2]" @click="itemClick(2)">
      <mu-icon slot="left" value="chat" />
      <mu-list-item title="New Ticket" slot="nested"></mu-list-item>
      <mu-list-item title="Ticket List" slot="nested"></mu-list-item>
    </mu-list-item>
    <mu-list-item title="Training" toggleNested nestedListClass="level2-menu" key="4" :open="isItemOpen[3]" @click="itemClick(3)">
      <mu-icon slot="left" value="school" />
      <mu-list-item title="Online Training" slot="nested"></mu-list-item>
      <mu-list-item title="Books and Magazines" slot="nested"  nestedListClass="level3-menu" key=5 :open="isItemOpen[4][0]" @click="itemClick(4,0)">
        <mu-list-item title="Money Theory" slot="nested"></mu-list-item>
        <mu-list-item title="Education Books" slot="nested"></mu-list-item>
      </mu-list-item>
      <mu-list-item title="Videos" slot="nested"  toggleNested nestedListClass="level3-menu" key=6 :open="isItemOpen[4][1]" @click="itemClick(4,1)">

        <mu-list-item title="汇市情报局" slot="nested"></mu-list-item>
        <mu-list-item title="视频分析" slot="nested"></mu-list-item>
        <mu-list-item title="教学视频" slot="nested"></mu-list-item>
      </mu-list-item>
    </mu-list-item>
  </mu-list>
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
