<template>
    <div class="merchant-banner">
        <admin-area-title-component label="广告和Banner管理"></admin-area-title-component>
        <admin-table-component :columns="columns" :url="this['$api'].getBannerList" :args="args"
                               :autoLoad="true"
                               :rowKey="row => row.id"
                               :isExpandedRowRender="true"
                               ref="table">
            <div slot="console">
                <div class="row">
                    <div class="item">
                        <a-radio-group v-model="args.type" class="radio-group" @change="onLoadData">
                            <a-radio-button value="1">Banner</a-radio-button>
                            <a-radio-button value="2">腰花</a-radio-button>
                            <a-radio-button value="3">四方图</a-radio-button>
                            <a-radio-button value="99">商品详情</a-radio-button>
                            <a-radio-button value="98">订单列表</a-radio-button>
                            <a-radio-button value="97">我的中心</a-radio-button>
                        </a-radio-group>
                    </div>
                    <a-divider type="vertical"/>
                    <div class="item">
                        <admin-select-component label="状态"
                                                :data="[{name:'全部',value:''},{name:'使用中',value:'1'},
                                                {name:'未使用',value:'0'}]"
                                                v-model="args.status"/>
                    </div>
                    <div class="item">
                        <a-button type="primary" @click="onLoadData">搜索数据</a-button>
                    </div>
                </div>
            </div>
            <div slot="expandedRowRender" slot-scope="row" class="row-render">
                <img :src="row.row.cover">
            </div>
        </admin-table-component>

    </div>
</template>
<style lang="scss" scoped>
    .merchant-banner {
        & > .radio-group {
            margin: 20px;
        }

        & .row-render {
            & img {
                max-width: 600px;
            }
        }
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
    export default class MerchantBannerComponent extends Vue {
        public columns: any[] = [
            {
                title: '序号',
                width: '60px',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '封面',
                width: '180px',
                dataIndex: 'cover',
                key: 'cover',
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
                title: '跳转地址',
                width: '260px',
                dataIndex: 'link',
                key: 'link',
            },
            {
                title: '排序',
                width: '60px',
                dataIndex: 'sort',
                key: 'sort',
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
            },
        ];
        public args: any = {
            type: '1'
        };

        public onLoadData() {
            this.$refs.table.loadData();
        }
    }
</script>