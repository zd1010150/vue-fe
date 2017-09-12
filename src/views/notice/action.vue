<i18n src="./i18n.yaml"></i18n>
<template>
    <chp-data-table slot="body" 
    :isDisplayFilterToolbar="isDisplayFilterToolbar" 
    :pageSize="pageSize" 
    :rowsTotal="rowsTotal" 
    :pageOptions="pageOptions" 
    :canFilter="false" 
    :canAdd="false" 
    @pageSizeChange="pageSizeChange" 
    @pageNumberChange="pageNumberChange">
    <div slot="toolBar">
        <chp-select :autoWidth="true" class="category-select" @change="searchCategory">
            <mu-menu-item v-for=" (option,index) in categories" 
            :key="index" 
            :value="option.val" 
            :title= "$t('notification.'+option.title)"  >
            </mu-menu-item>
            
        </chp-select>
    </div>
    <chp-table slot="table">
        <chp-table-header>
            <chp-table-row>
                <chp-table-head>{{ $t('notification.content') }}</chp-table-head>
                <chp-table-head width="100px">{{ $t('notification.category') }}</chp-table-head>
                <chp-table-head width="200px">{{ $t('notification.date') }}</chp-table-head>
            </chp-table-row>
        </chp-table-header>
        <chp-table-body>
            <chp-table-row v-for="(row, rowIndex) in noticeList" :key="rowIndex" :chp-selection="chpSelection">
                <chp-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :chp-numeric="columnIndex == 'top_up_amount' ">
                    <span  v-if="columnIndex == 'content'" v-html="column"></span>
                    <span v-else>
                        {{column}}
                    </span>                        
                </chp-table-cell>
            </chp-table-row>
        </chp-table-body>
    </chp-table>
    </chp-data-table>
</template>
<script>
import notificationService from "services/notificationService"
import { SET_CONTENT_LOADING,SET_NOTICE_REFRESH_FLAG } from 'store/mutation-types'
export default {
    data() {
        return {
            language: this.$store.state.language,
            isDisplayFilterToolbar: false,
            pageIndex: 1,
            pageSize: 5,
            rowsTotal: 100,
            pageOptions: [5, 20, 30],
            noticeList: [],
            chpSelection: false,
            category:'',
            categories:[
                {val:'',title:'all'},
                {val:'Systems',title:'system'},
                {val:'InternalTransfer',title:'internaltransfer'},
                {val:'Withdrawals',title:'withdrawals'},
                {val:'Deposits',title:'deposits'}
                ]
        }
    },
    watch: {
        "$store.state.language": function(val) {
            this.language = val;
            this.fetchAnnoucement();
        }
    },
    activated() {
        this.fetchAnnoucement()
    },
    methods: {
         research(model){
            console.log(model)
            this.startDay = model.startDay
            this.endDay = model.endDay
            this.pageIndex = 1
            this.fetchAnnoucement()
        },
        searchCategory(val){
            console.log(val)
            this.category = val
            this.fetchAnnoucement()
        },
        pageSizeChange(newSize) {
            this.pageSize = newSize
            this.pageIndex = 1
        },
        pageNumberChange(newIndex) {
            this.pageIndex = newIndex
        },
        filterFields(originData) {
            if(originData && originData.length > 0){
                this.noticeList = originData.map(function(row,index) {
                    return {
                        content:row.content,
                        category: row.category,
                        date_time:row.dateTime
                    }
                })
            }else {
                this.noticeList = []
            }
        },

        async fetchAnnoucement() {
           
            let { success, data } = await notificationService.getNoticeByType('action', {
                language: this.language,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                startDay: this.startDay,
                endDay: this.endDay,
                category: this.category
            })
            
            if (success) {
                console.log('action', data);
                this.filterFields(data.data)
                this.pageIndex = data.current_page
                this.rowsTotal = data.total
                this.pageSize = Number(data.per_page)

                let {success} = await notificationService.markReaded('action')
                if (success) {
                    this.$store.commit(SET_NOTICE_REFRESH_FLAG,"action")
                }
            }
        },
    }
}
</script>
<style lang="less" scoped>
    .category-select{
        width:192px;
        text-align: left;
    }
</style>

