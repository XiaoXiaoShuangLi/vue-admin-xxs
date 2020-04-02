<template>
    <div class="merchant-funds-flow">
        <admin-area-title-component label="商户资金流水"></admin-area-title-component>
        <admin-table-component :columns="columns" :url="this['$api'].getMerchantFundsFlowList" :args="args"
                               :autoLoad="true"
                               :rowKey="row => row.id"
                               :isExpandedRowRender="true"
                               ref="table">
            <div slot="console">
                <div class="row">
                    <div class="item">
                        <admin-input-component label="订单号" v-model="args.orderNo"/>
                    </div>
                    <div class="item">
                        <admin-input-component label="商户名称" v-model="args.shopName"/>
                    </div>
                    <div class="item">
                        <admin-select-component label="状态" :data="[{name:'全部',value:''},{name:'已结算',value:'1'},{name:'未结算',value:'0'}]"></admin-select-component>
                    </div>
                    <div class="item">
                        <admin-date-component label="订单创建时间" @change="(v)=>{args.dateStart=v[0];args.dateEnd=v[1]}"/>
                    </div>
                    <div class="item">
                        <a-button type="primary" @click="onLoadData">搜索数据</a-button>
                    </div>
                </div>
            </div>
            <div slot="expandedRowRender" slot-scope="row">
                <div></div>
            </div>
        </admin-table-component>
    </div>
</template>
<style lang="scss" scoped>
    .merchant-funds-flow {

    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import AdminAreaTitleComponent from '../component/admin-area-title-component.vue';
    import AdminTableComponent from '../component/admin-table-component.vue';
    import AdminInputComponent from '../component/admin-input-component.vue';
    import AdminSelectComponent from '../component/admin-select-component.vue';
    import AdminDateComponent from '../component/admin-date-component.vue';

    @Component({
        components: {
            AdminDateComponent,
            AdminSelectComponent, AdminInputComponent, AdminTableComponent, AdminAreaTitleComponent}
    })
    export default class MerchantFundsFlow extends Vue {
        public columns: any[] = [
            {
                title: '商户ID',
                width: '80px',
                dataIndex: 'shopId',
                key: 'shopId',
            },
            {
                title: '商户名称',
                width: '240px',
                dataIndex: 'shopName',
                key: 'shopName',
            },
            {
                title: '订单号',
                width: '140px',
                dataIndex: 'orderNo',
                key: 'orderNo',
            },
            {
                title: '付款时间',
                width: '160px',
                dataIndex: 'payTime',
                key: 'payTime'
            },
            {
                title: '交易流水',
                width: '120px',
                dataIndex: 'flowNo',
                key: 'flowNo',
            },
            {
                title: '利润',
                width: '160px',
                dataIndex: 'costAmount',
                key: 'costAmount'
            },
            {
                title: '商品件数',
                width: '80px',
                dataIndex: 'number',
                key: 'number'
            },
            {
                title: '状态',
                width: '80px',
                dataIndex: 'status',
                key: 'status',
                customRender: (text) => {
                    switch (text.toString()) {
                        case '0':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-pink'
                                },
                            }, '待处理');
                        case '1':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-orange'
                                },
                            }, '退款完成');
                        case '2':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-color-red'
                                },
                            }, '拒绝退款');
                        case '9':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-blue'
                                },
                            }, '退款关闭');
                    }
                },
            },
            {
                title: '清算周期',
                width: '120px',
                dataIndex: 'period',
                key: 'period'
            },
            {
                title: '',
                key: '_panel',
                dataIndex: '_panel',
            }
        ];
        public args: any = {};

        public async onLoadData(){
            this.$refs.table.loadData();
        }
    }
</script>