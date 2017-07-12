<template>
  <div class="chp-table-pagination">
    <span class="chp-table-pagination-label">{{ chpLabel }}:</span>

    <!--<chp-select v-model="currentSize" chp-menu-class="chp-pagination-select" @change="changeSize" v-if="chpPageOptions !== false">
      <chp-option v-for="amount in chpPageOptions" :key="amount" :value="amount">{{ amount }}</chp-option>
    </chp-select>-->
    <chp-select v-model="currentSize" class="chp-pagination-select" @change="changeSize" v-if="chpPageOptions !== false" >

      <mu-menu-item v-for="amount in chpPageOptions" :key="amount" :value="amount" :title="String(amount)"></mu-menu-item>

    </chp-select>

    <span>{{ ((currentPage - 1) * currentSize) + 1 }}-{{ subTotal }} {{ chpSeparator }} {{ chpTotal }}</span>


    <mu-icon-button @click="previousPage" :disabled="currentPage === 1">
      <i class="fa fa-angle-double-left" aria-hidden="true" ></i>
    </mu-icon-button>
    <mu-icon-button @click="nextPage" :disabled="shouldDisable">
      <i class="fa fa-angle-double-right" aria-hidden="true"></i>
    </mu-icon-button>

  </div>
</template>

<script>
  export default {
    name: 'chp-table-pagination',
    props: {
      chpSize: {
        type: [Number, String],
        default: 10
      },
      chpPageOptions: {
        type: [Array, Boolean],
        default: () => [10, 25, 50, 100]
      },
      chpPage: {
        type: [Number, String],
        default: 1
      },
      chpTotal: {
        type: [Number, String],
        default: 'Many'
      },
      chpLabel: {
        type: String,
        default: 'Rows per page'
      },
      chpSeparator: {
        type: String,
        default: 'of'
      }
    },
    data() {
      return {
        totalItems: isNaN(this.chpTotal) ? Number.MAX_SAFE_INTEGER : parseInt(this.chpTotal, 10),
        currentPage: 1,
        currentSize: parseInt(this.chpSize, 10)
      };
    },
    watch: {
      chpTotal(val) {
        const sub = this.currentPage * this.currentSize;

        this.subTotal = sub > val ? val : sub;
        this.totalItems = isNaN(val) ? Number.MAX_SAFE_INTEGER : parseInt(val, 10);
      },
      chpSize(val) {
        this.currentSize = parseInt(val, 10);
      },
      chpPage(val) {
        this.currentPage = parseInt(val, 10);
      }
    },
    computed: {
      lastPage() {
        return false;
      },
      shouldDisable() {
        return this.currentSize * this.currentPage >= this.totalItems;
      },
      subTotal() {
        const sub = this.currentPage * this.currentSize;

        return sub > this.chpTotal ? this.chpTotal : sub;
      }
    },
    methods: {
      emitPaginationEvent() {
        if (this.canFireEvents) {
          this.$emit('pagination', {
            size: this.currentSize,
            page: this.currentPage
          });
        }
      },
      changeSize() {
        if (this.canFireEvents) {
          this.$emit('size', this.currentSize);
          this.emitPaginationEvent();
        }
      },
      previousPage() {
        if (this.canFireEvents) {
          this.currentPage--;
          this.$emit('page', this.currentPage);
          this.emitPaginationEvent();
        }
      },
      nextPage() {
        if (this.canFireEvents) {
          this.currentPage++;
          this.$emit('page', this.currentPage);
          this.emitPaginationEvent();
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.chpPageOptions) {
          this.currentSize = this.chpPageOptions.includes(this.currentSize) ? this.currentSize : this.chpPageOptions[0];
        } else {
          this.currentSize = 0;
        }
        this.canFireEvents = true;
      });
    }
  };

</script>
<style lang="less">
  .chp-table-pagination{
    .chp-select{
      width:70px;
    }
  }
</style>
