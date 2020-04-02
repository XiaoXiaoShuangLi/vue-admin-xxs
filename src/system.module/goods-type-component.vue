<template>
    <div class="merchant-goods-type">
        <admin-area-title-component label="商品类别"></admin-area-title-component>
        <admin-table-component :columns="columns" :url="this['$api'].getGoodsCategoryList" :args="args"
                               :autoLoad="true"
                               :rowKey="row => row.id"
                               ref="table">
            <div slot="console">
                <div class="row">
                    <div class="item">
                        <a-radio-group v-model="args.level" class="radio-group" @change="onLoadData">

                        </a-radio-group>
                    </div>
                    <div class="item">
                        <admin-select-component label="类别状态"
                                                :data="[{name:'全部',value:''},{name:'启用',value:'1'},
                                                {name:'停用',value:'0'}]"
                                                v-model="args.status"/>
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
    .merchant-goods-type {

    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import AdminAreaTitleComponent from '../component/admin-area-title-component.vue';
    import AdminTableComponent from '../component/admin-table-component.vue';
    import AdminSelectComponent from '../component/admin-select-component.vue';

    @Component({
        components: {AdminSelectComponent, AdminTableComponent, AdminAreaTitleComponent}
    })
    export default class MerchantGoods extends Vue {
        public columns: any[] = [
            {
                title: '序号',
                width: '60px',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '图标',
                width: '80px',
                dataIndex: 'imageUrl',
                key: 'imageUrl',
                customRender: (text => {
                    return this.$createElement('img', {
                        attrs: {
                            'src': text,
                            'class': 'table-img',
                        },
                    }, '');
                })
            },
            {
                title: '名称',
                width: '200px',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '状态',
                width: '80px',
                dataIndex: 'status',
                key: 'status',
                customRender: (text => {
                    switch (text.toString()) {
                        case '0':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-red'
                                },
                            }, '停用');
                        case '1':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-blue'
                                },
                            }, '启用');
                    }
                })
            },
            {
                title: '关键字',
                width: '180px',
                dataIndex: 'keyword',
                key: 'keyword',
            },
            {
                title: '描述',
                width: '150px',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '',
                dataIndex: '_panel',
                key: '_panel',
                customRender: (() => {
                    return this.$createElement('a', {
                        attrs: {

                        },
                    }, '下级种类');
                })
            },
        ];
        public args: any = {
            parentId: '0'
        };

        public async onLoadData() {
            this.$refs.table.loadData();
        }
    }
</script>