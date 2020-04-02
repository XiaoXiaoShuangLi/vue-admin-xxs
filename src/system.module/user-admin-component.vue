<template>
    <div class="user-admin">
        <admin-area-title-component label="用户管理"></admin-area-title-component>
        <admin-table-component :columns="columns" :url="this['$api'].getUserList" :args="args"
                               :autoLoad="true"
                               :rowKey="row => row.id"
                               ref="table">
            <div slot="console">
                <div class="row">
                    <div class="item">
                        <admin-input-component label="用户名称" v-model="args.name"/>
                    </div>
                    <div class="item">
                        <admin-input-component label="账号" v-model="args.account"/>
                    </div>
                    <div class="item">
                        <a-button type="primary" @click="onLoadData">搜索数据</a-button>
                    </div>
                    <a-divider type="vertical"/>
                    <div class="item">
                        <a-button type="primary" @click="onOpenDialog">新增用户</a-button>
                    </div>
                </div>
            </div>
        </admin-table-component>

        <!-- 新增/修改 对话框 -->
        <a-modal title="新增用户" v-model="dialog.user" @ok="">
            <a-form :label-col="{span:5}" :wrapper-col="{span:14}">
                <a-form-item label="自在小铺ID">
                    <a-input></a-input>
                </a-form-item>
                <a-form-item label="角色">
                    <a-select>
                        <a-select-option v-for="item of roleList" :value="item.id">{{item.name}}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<style lang="scss" scoped>
    .user-admin {

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
                title: '用户ID',
                width: '100px',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名称',
                width: '200px',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '用户账号',
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
                title: '角色',
                width: '100px',
                key: 'roleName',
                dataIndex: 'roleName',
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
        public dialog: any = {user: false};
        public roleList: any[] = [];

        public async onLoadData() {
            this.$refs.table.loadData();
        }

        public async onOpenDialog() {
            this.dialog.user = true;
        }
    }
</script>