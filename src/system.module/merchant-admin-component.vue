<template>
    <div class="merchant-admin">
        <admin-area-title-component label="商户管理"></admin-area-title-component>
        <admin-table-component :columns="columns" :url="this['$api'].getMerchantList" :args="args"
                               :autoLoad="true"
                               :rowKey="row => row.id"
                               ref="table">
            <div slot="console">
                <div class="row">
                    <div class="item">
                        <admin-input-component label="店铺名称" v-model="args.name"/>
                    </div>
                    <div class="item">
                        <a-button type="primary" @click="onLoadData">搜索数据</a-button>
                    </div>
                </div>
            </div>
        </admin-table-component>
    </div>
</template>
<style lang="scss" scoped>
    .merchant-admin {

    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import AdminAreaTitleComponent from '../component/admin-area-title-component.vue';
    import AdminTableComponent from '../component/admin-table-component.vue';
    import AdminInputComponent from '../component/admin-input-component.vue';

    @Component({
        components: {AdminInputComponent, AdminTableComponent, AdminAreaTitleComponent}
    })
    export default class MerchantAdminComponent extends Vue {
        public columns: any[] = [
            {
                title: '',
                width: '10px',
                key: '_id',
                dataIndex: '_id',
            },
            {
                title: '商户ID',
                width: '100px',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '商户名称',
                width: '200px',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '商户账号',
                width: '160px',
                key: 'account',
                dataIndex: 'account',
            },
            {
                title: '备注',
                width: '200px',
                key: 'remark',
                dataIndex: 'remark',
            },
            {
                title: '状态',
                width: '100px',
                key: 'status',
                dataIndex: 'status',
            },
            {
                title: '创建时间',
                width: '160px',
                key: 'createTime',
                dataIndex: 'createTime',
            },
            {
                title: '',
                key: '_panel',
                dataIndex: '_panel',
            },
        ];
        public args: any = {};

        public async onLoadData(){
            this.$refs.table.loadData();
        }
    }
</script>