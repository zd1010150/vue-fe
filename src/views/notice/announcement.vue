<template>
    <chp-data-table slot="body" :isDisplayFilterToolbar="isDisplayFilterToolbar" :pageSize="pageSize" :rowsTotal="rowsTotal" :pageOptions="pageOptions" :canFilter="false" :canAdd="false" @pageSizeChange="pageSizeChange" @pageNumberChange="pageNumberChange">
        <chp-table slot="table">
            <chp-table-header>
                <chp-table-row>
                    <chp-table-head chp-sort-by="order_time">Time</chp-table-head>
                    <chp-table-head chp-sort-by="mt4_id" width="100px">Account</chp-table-head>
                </chp-table-row>
            </chp-table-header>
            <chp-table-body>
                <chp-table-row v-for="(row, rowIndex) in noticeList" :key="rowIndex" :chp-selection="chpSelection">
                    <chp-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :chp-numeric="columnIndex == 'top_up_amount' ">
                        {{column}}
                    </chp-table-cell>
                </chp-table-row>
            </chp-table-body>
        </chp-table>
    </chp-data-table>
</template>
<script>
import trainingService from "services/notificationService"
import { SET_CONTENT_LOADING } from 'store/mutation-types'
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
        pageSizeChange(newSize) {
            this.pageSize = newSize
            this.pageIndex = 1
        },
        pageNumberChange(newIndex) {
            this.pageIndex = newIndex
        },
        filterFields(originData) {
            if(originData && originData.length > 0){
                this.noticeList = originData.map(function() {
                    return {
                        content:row.content,
                        date_time:row.dateTime
                    }
                })
            }else {
                this.noticeList = []
            }
        },

        async fetchAnnoucement() {
            this.$store.commit(SET_CONTENT_LOADING, true)
            let { success, data } = await trainingService.getNoticeByType('announcement', {
                language: this.language,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            })
            this.$store.commit(SET_CONTENT_LOADING, false)
            if (success) {
                console.log('announcement', data);
                this.filterFields(data.data)
                this.pageIndex = data.current_page
                this.rowsTotal = data.total
                this.pageSize = Number(data.per_page)
            }
        },
    }
}
</script>

