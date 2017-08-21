<template>
<div class="mu-pagination" v-if="total">
  <page-item :index="1" @click="handleClick" class="first-page visible-sm visible-xs" :showIndex="false">
    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
  </page-item>
  <page-item identifier="singleBack" @click="handleClick" :disabled="leftDisabled" class="previous-btn">
   <i class="fa fa-angle-left" aria-hidden="true"></i>
  </page-item>
  <page-item :index="1" @click="handleClick" :isActive="actualCurrent === 1" class=""/>
  
  <page-item v-if="totalPageCount > defaultMaxCount && actualCurrent - 1 >= defaultMaxCount-1" identifier="backs" @click="handleClick" title="前5页">
    <span>...</span>
  </page-item>
  <page-item v-for="item in pageList" :key="item" :index="item" @click="handleClick" :isActive="actualCurrent === item"/>

  <page-item v-if="totalPageCount > defaultMaxCount && totalPageCount - actualCurrent > defaultMaxCount-1" identifier="forwards" @click="handleClick" title="后5页">
    <span>...</span>
  </page-item>
  <page-item :index="totalPageCount" @click="handleClick" :isActive="actualCurrent === totalPageCount" v-if="totalPageCount !== 1"></page-item>
  <page-item identifier="singleForward" @click="handleClick" :disabled="rightDisabled" class="next-btn">
   <i class="fa fa-angle-right" aria-hidden="true"></i>
  </page-item>
  <page-item :index="totalPageCount" @click="handleClick" class="last-page visible-sm visible-xs" :showIndex="false">
    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
  </page-item>

</div>
</template>

<script>
import pageItem from './item'
export default{

  props: {
    total: {
      type: Number,
      default: 1
    },
    current: {
      type: Number,
      default: 1
    },
    defaultPageSize: {
      type: Number,
      default: 10
    },
    pageSize: {
      type: Number
    },
    defaultMaxCount: {
      type:Number,
      default:5
    }
  },
  data () {
    return {
      leftDisabled: false,
      rightDisabled: false,
      actualCurrent: this.current,
      totalPageCount: 0,
      pageList: [],
      quickJumpPage: ''
    }
  },
  mounted () {
    this.iconIsDisabled(this.actualCurrent)

    // 优先使用pageSizeOption,如果props配置了默认值，那么该props无论在父组件
    // 中是否配置该值都不会为undefined,所以需要使用showSizeChanger来做这个判断
    // 才对
    this.totalPageCount = Math.ceil(this.total / this.pageSize)
    this.pageList = this.calcPageList(this.actualCurrent)
  },
  methods: {
    handleClick (res) {
      if (typeof res === 'number') {
        this.actualCurrent = res
      } else {
        switch (res) {
          case 'singleBack':
            this.actualCurrent = Math.max(1, this.actualCurrent - 1)
            break
          case 'backs':
            this.actualCurrent = Math.max(1, this.actualCurrent - 5)
            break
          case 'forwards':
            this.actualCurrent = Math.min(this.totalPageCount, this.actualCurrent + 5)
            break
          case 'singleForward':
            this.actualCurrent = Math.min(this.totalPageCount, this.actualCurrent + 1)
            break
        }
      }
    },
    iconIsDisabled (current) {
      this.leftDisabled = current === 1
      this.rightDisabled = current === this.totalPageCount
    },

    calcPageList (current) {
      let pageList = []
      if (this.totalPageCount > this.defaultMaxCount) {
        let left = Math.max(2, current - 2)
        let right = Math.min(current + 2, this.totalPageCount - 1)
        if (current - 1 < 2) {
          right = 4
        }

        if (this.totalPageCount - current < 2) {
          left = this.totalPageCount - 3
        }

        for (let i = left; i <= right; i++) {
          pageList.push(i)
        }
      } else {
        for (let i = 2; i < this.totalPageCount; i++) {
          pageList.push(i)
        }
      }

      return pageList
    },
    pageSizeAndTotalChange (current) {
      this.iconIsDisabled(current)
      this.pageList = this.calcPageList(current)
    }
    // quickJump () {
    //   if (this.quickJumpPage) {
    //     this.actualCurrent = Math.min(this.quickJumpPage, this.totalPageCount)
    //   }
    // }
  },
  components: {
    'page-item': pageItem
  },
  watch: {
    actualCurrent: function (val) {
      if (val === 0) {
        return
      }
      this.pageSizeAndTotalChange(val)
      this.$emit('pageChange', val)
      this.$emit('page-change', val)
    },
    pageSize: function (val, oldVal) {
      // 如果页面条数改变的时候,对应的当前页也是需要重新计算的,
      // 计算规则是根据当前页的起始索引来计算该索引位于新的pageSize
      // 中的页码
      let itemIndex = oldVal * (this.actualCurrent - 1)
      let oldCurrent = this.actualCurrent
      this.actualCurrent = Math.floor(itemIndex / val) + 1
      // 页码条数改变的时候当前页不一定改变,但是我们必须重新计算一些依赖的参数
      this.totalPageCount = Math.ceil(this.total / val)
      if (oldCurrent === this.actualCurrent) {
        this.pageSizeAndTotalChange(oldCurrent)
      }
      this.$emit('pageSizeChange', val)
      this.$emit('page-size-change', val)
      console.log("sizechanged totalPageCOunt:",this.totalPageCount);
    },
    total: function (val) {
      // 如果条目总数改变的时候当前页也需要重新计算
      let oldCurrent = this.actualCurrent
      this.actualCurrent = Math.min(this.totalPageCount, this.actualCurrent)
      // 总条数改变的时候当前页不一定改变,但是我们必须重新计算一些依赖的参数,
      // 比如total从10变为11(pageSize=10),那么current没变,不过右前进的按钮应该由
      // disable变为enable的
      this.totalPageCount = Math.ceil(this.total / this.pageSize)
      if (oldCurrent === this.actualCurrent) {
        this.pageSizeAndTotalChange(oldCurrent)
      }
    },
    current (val) {
      this.actualCurrent = val
    }
  }
}
</script>

<style lang="less">
@import "~assets/less/variable.less";
@media(max-width:@screen-sm-min ){
  .mu-pagination{
    padding:0px 0px;
    .mu-pagination-item{
      padding:8px 0px;
      margin:8px 0px;
      .flex(1);
      min-width:auto;
      font-size: inherit;
      }
  }
  .mu-pagination{
    .mu-pagination-item{
      display:none;
      &.previous-btn,&.active,&.next-btn,&.first-page{
        display: block;
      }
    }
  }
}
.mu-pagination{
  .display(flex);
  .justify-content(flex-end);
  .align-items(center);
  font-size: 1.6rem;
  font-weight: bold;
}

.mu-pagination-svg-icon{
  display: inline-block;
  width: 24px;
  height: 24px;
  fill: currentColor;
  user-select: none;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1);;
}

</style>
