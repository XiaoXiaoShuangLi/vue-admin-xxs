<template>
    <div class="merchant-funds-flow">
        <admin-area-title-component label="流水核对"></admin-area-title-component>
        <admin-table-component :columns="columns" :url="this['$api'].getFundsFlowList" :args="args"
                               :autoLoad="true"
                               :rowKey="row => row.flowNo"
                               :isExpandedRowRender="true"
                               ref="table">
            <div slot="console">
                <div class="row">
                    <div class="item">
                        <admin-input-component label="订单号" v-model="args.orderNo"/>
                    </div>
                    <div class="item">
                        <admin-input-component label="流水号" v-model="args.flowNo"/>
                    </div>
                    <div class="item">
                        <admin-input-component label="外部流水号" v-model="args.externalFlowNo"/>
                    </div>
                    <div class="item">
                        <admin-select-component label="状态"
                                                :data="[{name:'全部',value:''},{name:'等待付款',value:'0'},{name:'交易完成',value:'1'},{name:'交易异常',value:'98'}]"
                                                v-model="args.status"/>
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

    @Component({
        components: {AdminSelectComponent, AdminInputComponent, AdminTableComponent, AdminAreaTitleComponent}
    })
    export default class MerchantFundsFlow extends Vue {
        public columns: any[] = [
            {
                title: '订单号',
                width: '140px',
                dataIndex: 'orderNo',
                key: 'orderNo',
            },
            {
                title: '交易流水号',
                width: '140px',
                dataIndex: 'flowNo',
                key: 'flowNo',
            },
            {
                title: '付款金额',
                width: '80px',
                dataIndex: 'amount',
                key: 'amount',
                customRender: (text => {
                    return Number(text).toFixed(2);
                })
            },
            {
                title: '付款时间',
                width: '160px',
                dataIndex: 'payTime',
                key: 'payTime',
            },
            {
                title: '退款金额',
                width: '80px',
                dataIndex: 'refundAmount',
                key: 'refundAmount',
                customRender: (text => {
                    return text == null ? '': Number(text).toFixed(2);
                })
            },
            {
                title: '退款时间',
                width: '160px',
                dataIndex: 'refundTime',
                key: 'refundTime'
            },
            {
                title: '外部流水号',
                width: '200px',
                dataIndex: 'externalFlowNo',
                key: 'externalFlowNo',
            },
            {
                title: '支付方式',
                width: '120px',
                dataIndex: 'payType',
                key: 'payType'
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
                            }, '待付款');
                        case '1':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-blue'
                                },
                            }, '交易完成');
                        case '98':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-color-red'
                                },
                            }, '交易异常');
                    }
                },
            },
            {
                title: '创建时间',
                width: '80px',
                dataIndex: 'createTime',
                key: 'createTime'
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