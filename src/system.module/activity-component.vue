<template>
    <div class="merchant-activity">
        <admin-area-title-component label="活动管理"></admin-area-title-component>
        <div class="main">
            <div class="activity">
                <admin-table-component :columns="columns" :url="this['$api'].getActivityList" :args="args"
                                       :autoLoad="true"
                                       :rowKey="row => row.id"
                                       ref="table">
                    <div slot="console">
                        <div class="row">
                            <div class="item">
                                <a-input placeholder="活动名称"></a-input>
                            </div>
                            <a-divider type="vertical"/>
                            <div class="item">
                                <admin-select-component label="状态"
                                                        :data="[{name:'全部',value:''},{name:'草稿',value:'0'},{name:'正在进行',value:'1'},{name:'已结束',value:'9'}]"></admin-select-component>
                            </div>
                            <div class="item">
                                <a-button type="primary">搜索</a-button>
                            </div>
                        </div>
                    </div>
                </admin-table-component>
            </div>
            <div class="content">
                <a-tabs defaultActiveKey="1">
                    <a-tab-pane tab="活动简介" key="1">
                        <div class="activity-info">
                            <div class="row">
                                <div class="label">活动代码</div>
                                <div class="content">
                                    <a-input placeholder="活动代码20个字母以内 (必填)" disabled=""/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="label">活动摘要</div>
                                <div class="content">
                                    <a-input placeholder="活动摘要 (必填)"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="label">活动简介</div>
                                <div class="content">
                                    <a-textarea
                                            placeholder="活动简介 (选填)"
                                            :autoSize="{ minRows: 3, maxRows: 5 }"></a-textarea>
                                </div>
                            </div>
                            <div class="row">
                                <div class="label">活动描述</div>
                                <div class="content">
                                    <a-textarea
                                            placeholder="活动描述 (选填)"
                                            :autoSize="{ minRows: 3, maxRows: 5 }"></a-textarea>
                                </div>
                            </div>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane tab="活动种类" key="2" forceRender class="category-list">
                        <admin-table-component :columns="columnsCategory" :url="this['$api'].getActivityCategoryList"
                                               :args="argsCategory"
                                               :autoLoad="true"
                                               :rowKey="row => row.id"
                                               ref="table">
                            <div slot="console">
                                <div class="row">
                                    <div class="item">
                                        <a-button type="primary">新增种类</a-button>
                                    </div>
                                    <a-divider type="vertical"/>
                                    <div class="item">
                                        <a-button type="primary">刷新</a-button>
                                    </div>
                                </div>
                            </div>
                        </admin-table-component>
                    </a-tab-pane>
                    <a-tab-pane tab="活动商品" key="3" forceRender class="goods-list">
                        <admin-table-component :columns="columnsGoods" :url="this['$api'].getActivityGoodsList"
                                               :args="argsGoods"
                                               :autoLoad="true"
                                               :rowKey="row => row.id"
                                               ref="table">
                            <div slot="console">
                                <div class="row">
                                    <div class="item">
                                        <admin-select-component label="种类"
                                                                :data="[{name:'全部',value:''},{name:'草稿',value:'0'},{name:'正在进行',value:'1'},{name:'已结束',value:'9'}]"></admin-select-component>
                                    </div>
                                    <a-divider type="vertical"/>
                                    <div class="item">
                                        <a-input placeholder="商品名称"></a-input>
                                    </div>
                                    <div class="item">
                                        <a-button type="primary">搜索</a-button>
                                    </div>
                                </div>
                            </div>
                        </admin-table-component>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .merchant-activity {
        & > .main {
            display: flex;
            padding: 20px 20px;

            & > .activity {
                width: 400px;
                background: #fff;
                border: 1px solid #e5e5e5;
                margin-right: 20px;
                padding: 10px;

                & .admin-table {
                    margin: 0;
                }

                & .table, & .pagination-info {
                    -webkit-box-shadow: none !important;
                    box-shadow: none !important;
                }

                & .table-console {
                    display: flex;
                    border-bottom: 1px solid #e5e5e5;


                    & .ant-input {
                        width: 120px;
                    }

                    & .admin-select {
                        width: 160px;
                    }
                }
            }

            & > .content {
                width: 100%;
                flex: 1;
                background: #fff;
                min-height: 600px;
                border: 1px solid #e5e5e5;
                padding: 8px 10px;
                position: relative;

                & .activity-info {
                    max-width: 600px;
                    padding: 0 20px;

                    & > .row {
                        margin: 10px 0;

                        & > .label {
                            font-size: 13px;
                            line-height: 32px;
                        }
                    }
                }

                & .category-list {
                    & .admin-table {
                        margin: 0;
                    }

                    & .table, & .pagination-info {
                        -webkit-box-shadow: none !important;
                        box-shadow: none !important;
                    }
                }

                & .goods-list {
                    & .admin-table {
                        margin: 0;
                    }

                    & .table, & .pagination-info {
                        -webkit-box-shadow: none !important;
                        box-shadow: none !important;
                    }
                }
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
                title: '代码',
                width: '60px',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '活动摘要',
                dataIndex: 'summary',
                key: 'summary',
            }
        ];
        public columnsCategory: any[] = [
            {
                title: '活动代码',
                width: '80px',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '种类名称',
                width: '200px',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '开始时间',
                width: '160px',
                dataIndex: 'startTime',
                key: 'startTime',
            }, {
                title: '结束时间',
                width: '160px',
                dataIndex: 'endTime',
                key: 'endTime',
            },
            {
                title: '',
                dataIndex: '_panel',
                key: '_panel',
            }
        ];
        public columnsGoods: any[] = [
            {
                title: '活动代码',
                width: '80px',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '种类名称',
                width: '120px',
                dataIndex: 'summary',
                key: 'summary',
            },
            {
                title: '商品Id',
                width: '80px',
                dataIndex: 'goodsId',
                key: 'goodsId',
            },
            {
                title: '商品名称',
                width: '400px',
                dataIndex: 'goodsName',
                key: 'goodsName',
            },
            {
                title: '',
                dataIndex: '_panel',
                key: '_panel',
            }
        ];
        public args: any = {
            type: '1'
        };

        public argsCategory: any = {
            activityId: '2'
        };

        public argsGoods: any = {
            activityCategoryId: '3'
        };

        public onLoadData() {
            this.$refs.table.loadData();
        }
    }
</script>