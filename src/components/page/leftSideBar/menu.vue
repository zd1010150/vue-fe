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
    <mu-list-item title="Fund Management"  nestedListClass="level2-menu" :open="isItemOpen[0]" @click="itemClick(1)">
      <mu-icon slot="left" value="attach_money" />
      <mu-list-item title="Deposit Funds" slot="nested"></mu-list-item>
      <mu-list-item title="Widthdrawal" slot="nested"></mu-list-item>
      <mu-list-item title="Internal Transfer" slot="nested"></mu-list-item>
      <mu-list-item title="Bank Account" slot="nested"></mu-list-item>
    </mu-list-item>
    <mu-list-item title="Agent Center"  nestedListClass="level2-menu" key="2" :open="isItemOpen[1]" @click="itemClick(2)">
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
    <mu-list-item title="Ticket"  nestedListClass="level2-menu" key="3" :open="isItemOpen[2]" @click="itemClick(3)">
      <mu-icon slot="left" value="chat" />
      <mu-list-item title="New Ticket" slot="nested"></mu-list-item>
      <mu-list-item title="Ticket List" slot="nested"></mu-list-item>
    </mu-list-item>
    <mu-list-item title="Training"  nestedListClass="level2-menu" key="4" :open="isItemOpen[3]" @click="itemClick(4)">
      <mu-icon slot="left" value="school" />
      <mu-list-item title="Online Training" slot="nested"></mu-list-item>
      <mu-list-item title="Books and Magazines" slot="nested"  nestedListClass="level3-menu" key=5 :open="isItemOpen[4]" @click="itemClick(5)">
        <mu-list-item title="Money Theory" slot="nested"></mu-list-item>
        <mu-list-item title="Education Books" slot="nested"></mu-list-item>
      </mu-list-item>
      <mu-list-item title="Videos" slot="nested"  nestedListClass="level3-menu" key=6 :open="isItemOpen[5]" @click="itemClick(6)">

        <mu-list-item title="汇市情报局" slot="nested"></mu-list-item>
        <mu-list-item title="视频分析" slot="nested"></mu-list-item>
        <mu-list-item title="教学视频" slot="nested"></mu-list-item>
      </mu-list-item>
    </mu-list-item>
  </mu-list>
</div>
</template>
<script>
export default {
  data() {
    return {
      defaultState: [false, false, false, false, false, false],
      isItemOpen: [false, false, false, false, false, false],
      isItemOpenTest: true,
      open: false
    }
  },
  methods: {
    menuItemClick(item) {},
    itemClick(index) {

      var oldIndex = this.isItemOpen.indexOf(true);
      if(index-1 == oldIndex ){
        this.isItemOpen.splice(index - 1, 1, false);
        return;
      }else{
        if (oldIndex > -1) {
          this.isItemOpen.splice(oldIndex, 1, false);
        }
        console.log(index, oldIndex);
        this.isItemOpen.splice(index - 1, 1, true);
        console.log(this.isItemOpen);
      }

    },
    openNestedMenuTest() {

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
