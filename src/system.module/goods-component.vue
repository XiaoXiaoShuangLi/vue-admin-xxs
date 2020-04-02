<template>
    <div class="order">
        <admin-area-title-component label="商品管理"></admin-area-title-component>
        <admin-table-component :columns="columns" :url="this['$api'].getGoodsList" :args="args"
                               :autoLoad="true"
                               :rowKey="row => row.id"
                               :isExpandedRowRender="true"
                               ref="table">
            <div slot="console">
                <div class="row">
                    <div class="item">
                        <a-button type="primary" @click="onAddGoods">新建商品</a-button>
                    </div>
                    <a-divider type="vertical"/>
                    <div class="item">
                        <admin-input-component label="商品名称" v-model="args.goodsName"/>
                    </div>
                    <div class="item">
                        <admin-select-component label="商品状态"
                                                :data="[{name:'全部',value:''},{name:'上架',value:'1'},
                                                {name:'下架',value:'0'}]"
                                                v-model="args.status"/>
                    </div>
                    <div class="item">
                        <admin-price-component label="价格" @change="(v)=>{args.price1=v[0];args.price2=v[1]}"/>
                    </div>
                    <div class="item">
                        <admin-date-component label="上架时间" @change="(v)=>{args.dateStart=v[0];args.dateEnd=v[1]}"/>
                    </div>
                    <div class="item">
                        <a-button type="primary" @click="onLoadData">搜索数据</a-button>
                    </div>
                </div>
            </div>
            <div slot="expandedRowRender" slot-scope="row">
                <p class="row-render-title">规格参数</p>
                <div class="sku-rows">
                    <div class="row">
                        <div class="item">SKU</div>
                        <div class="item">规格</div>
                        <div class="item">平台价</div>
                        <div class="item">成本价</div>
                        <div class="item">销售价</div>
                        <div class="item">库存</div>
                    </div>
                    <div class="row" v-for="item of row.row.sku">
                        <div class="item">SKU: {{item.sku}}</div>
                        <div class="item">{{item.specificationDetail}}</div>
                        <div class="item">平台价: {{item.platformPrice == null ? '-' : item.platformPrice.toFixed(2)}}
                        </div>
                        <div class="item">成本价: {{item.costPrice == null ? '-' : item.costPrice.toFixed(2)}}</div>
                        <div class="item">销售价: {{item.price == null ? '-' : item.price.toFixed(2)}}</div>
                        <div class="item">库存: {{item.stock}}</div>
                    </div>
                </div>
                <p class="row-render-title" v-if="row.row.attributes != null && row.row.attributes.length > 0">产品参数</p>
                <div class="sku-labels" v-if="row.row.attributes != null && row.row.attributes.length > 0">
                    <div class="row">
                        <div class="item">规格</div>
                        <div class="item">属性</div>
                    </div>
                    <div class="row" v-for="item of row.row.attributes">
                        <div class="item">{{item.name}}</div>
                        <div class="item">{{item.value}}</div>
                    </div>
                </div>
                <p class="row-render-title" v-if="row.row.labels != null && row.row.labels.length > 0">产品标签</p>
                <div class="sku-labels" v-if="row.row.labels != null && row.row.labels.length > 0">
                    <div class="row">
                        <div class="item">名称</div>
                        <div class="item">值</div>
                    </div>
                    <div class="row" v-for="item of row.row.labels">
                        <div class="item">{{item.name}}</div>
                        <div class="item">{{item.value}}</div>
                    </div>
                </div>
            </div>
        </admin-table-component>
        <!-- 新增商品 -->
        <a-drawer
                title="新增商品"
                placement="right"
                :closable="false"
                :visible="addGoodsDialog"
                wrapClassName="goods"
                width="80%"
        >

            <!-- 类别选择器 -->
            <div class="type" v-if="false">
                <h2 class="title">选择商品种类</h2>
                <div class="group">
                    <div class="list">
                        <p class="title">一级分类</p>
                        <div class="item">
                            123
                            <i class="iconfont icon-xiayiye icon"/>
                        </div>
                        <div class="item">123<i class="iconfont icon-xiayiye icon"/></div>
                        <div class="item">123<i class="iconfont icon-xiayiye icon"/></div>
                    </div>
                    <div class="list">
                        <p class="title">二级分类</p>
                        <div class="item">123</div>
                    </div>
                    <div class="list">
                        <p class="title">三级分类</p>
                        <div class="item">123</div>
                    </div>
                </div>
                <p class="desc">已选择 xxxx分类</p>
                <a-button type="primary">确认创建该类商品</a-button>
            </div>

            <!-- 商品选择器 -->
            <div class="content">
                <div class="card">
                    <div class="title">商品基本信息</div>
                    <div class="body">
                        <div class="row">
                            <div>
                                <span class="color-red">*</span> 商品分类
                            </div>
                            <div>
                                {{goodsInfo.categoryName}}
                                <a>修改商品分类</a>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <span class="color-red">*</span> 商品标题
                            </div>
                            <div>
                                <a-input style="width: 400px" placeholder="商品标题65字以内 (必填)" v-model="goodsInfo.name"/>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                短标题
                            </div>
                            <div>
                                <a-input style="width: 400px" placeholder="商品短标题15字以内 (选填)"
                                         v-model="goodsInfo.shortName"/>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <span class="color-red">*</span> 品牌
                            </div>
                            <div>
                                <a-select style="width: 200px" v-model="goodsInfo.brandName">
                                    <a-select-option v-for="item of brandList" :value="item.name">{{item.name}}
                                    </a-select-option>
                                </a-select>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <span class="color-red">*</span> 商品轮播图
                            </div>
                            <div>
                                <p class="color-red">尺寸宽高需均大于480px, 大小2M以内, 图片格式仅支持JPG,PNG格式</p>
                                <admin-upload-component @changt="" :totalPage="20" v-model="goodsInfo.bannerImage"/>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                商品详情图
                            </div>
                            <div>
                                <p class="color-red">尺寸要求宽度480~1200px, 高度100~1500px, 大小2M以内, 图片格式仅支持JPG,PNG格式</p>
                                <admin-upload-component @changt="" :totalPage="20" v-model="goodsInfo.detailImage"/>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                商品描述
                            </div>
                            <div>
                                <a-textarea style="width: 400px" placeholder="请输入商品详情描述 (选填)" :rows="4"
                                            v-model="goodsInfo.description"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="title">商品规格与库存</div>
                    <div class="body">
                        <div class="row">
                            <div>
                                <span class="color-red">*</span> 商品规格
                            </div>
                            <div>
                                <div class="specification" v-for="sp of goodsInfo.specification">
                                    <div>
                                        <a-select style="width:160px" v-model="sp.id"
                                                  v-if="goodsInfo.specificationStatus === 0">
                                            <a-select-option v-for="item of specificationList" :value="item.id">
                                                {{item.name}}
                                            </a-select-option>
                                        </a-select>
                                        <a-select style="width:160px" v-model="sp.id" disabled
                                                  v-if="goodsInfo.specificationStatus === 1">
                                            <a-select-option v-for="item of specificationList" :value="item.id">
                                                {{item.name}}
                                            </a-select-option>
                                        </a-select>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <a-popconfirm
                                                title="确认删除规格吗?"
                                                v-if="goodsInfo.specificationStatus === 0"
                                                @confirm="onRemoverSpecification(sp)"
                                                okText="是"
                                                cancelText="否"
                                        >
                                            <a>删除</a>
                                        </a-popconfirm>
                                    </div>
                                    <div class="tags">
                                        <template v-for="c of sp.tag" v-if="goodsInfo.specificationStatus === 0">
                                            <a-tag closable>{{c.name}}</a-tag>
                                        </template>
                                        <template v-for="c of sp.tag" v-if="goodsInfo.specificationStatus === 1">
                                            <a-tag>{{c.name}}</a-tag>
                                        </template>
                                    </div>
                                    <div>
                                        <a-input style="width:160px" placeholder="请输入规格名称"
                                                 v-model="sp.value"
                                                 v-if="goodsInfo.specificationStatus === 0"
                                                 @keydown="onConfirmSpecification($event,sp)"/>
                                    </div>
                                </div>
                                <div>
                                    <a @click="onAddSpecification"
                                       v-if="goodsInfo.specificationStatus === 0 && goodsInfo.specification!=null && goodsInfo.specification.length !==3">添加规格</a>
                                    <a @click="onSaveSpecification"
                                       v-if="goodsInfo.specificationStatus === 0 && goodsInfo.specification!=null && goodsInfo.specification.length > 0">保存规格</a>
                                    <a v-if="goodsInfo.specificationStatus === 1"
                                       @click="onUpdateSpecification">修改规格</a>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if="goodsInfo.specificationStatus === 1">
                            <div>
                                <span class="color-red">*</span> 价格及库存
                            </div>
                            <div>
                                <div class="table">
                                    <div class="row header">
                                        <div class="c1">规格</div>
                                        <div class="c2">库存</div>
                                        <div class="c3">成本价</div>
                                        <div class="c4">销售价</div>
                                        <div class="c5">货号(选填)</div>
                                        <div class="c6">预览图(选填)</div>
                                    </div>
                                    <div class="row body" v-for="item of goodsInfo.sku">
                                        <div class="c1">
                                            <p v-for="n of item.specificationName">
                                                {{n.parentName + ':' + n.name}}
                                            </p>
                                        </div>
                                        <div class="c2">
                                            <a-input v-model="item.stock"/>
                                        </div>
                                        <div class="c3">
                                            <a-input v-model="item.costPrice"/>
                                        </div>
                                        <div class="c4">
                                            <a-input v-model="item.price"/>
                                        </div>
                                        <div class="c5">
                                            <a-input v-model="item.externalNo"/>
                                        </div>
                                        <div class="c6">
                                            <admin-upload-component type="single"
                                                                    v-model="item.mainImage"></admin-upload-component>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <span class="color-red">*</span> 商品平台价格
                            </div>
                            <div>
                                <a-input placeholder="对应其他平台价格 (必填)" style="width: 200px"
                                         v-model="goodsInfo.platformPrice"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="title">服务与承诺</div>
                    <div class="body">
                        <div class="row">
                            <div>
                                <span class="color-red">*</span> 运费模板
                            </div>
                            <div>
                                <a-select style="width: 200px" v-model="goodsInfo.logisticsId">
                                    <a-select-option v-for="item of logisticsList" :value="item.id">{{item.name}}
                                    </a-select-option>
                                </a-select>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <span class="color-red">*</span> 服务
                            </div>
                            <div>
                                <a-checkable-tag v-model="item.value" v-for="item of serviceTypeList">{{item.name}}
                                </a-checkable-tag>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel">
                    <a-button type="primary" @click="saveGoods('SUBMIT')">确认提交</a-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a-button @click="saveGoods('SAVE')">保存草稿</a-button>
                </div>
            </div>

        </a-drawer>
    </div>
</template>
<style lang="scss" scoped>
    .goods {
        & .ant-drawer-wrapper-body {
            & .ant-drawer-header {
                padding: 13px 24px !important;
            }
        }

        & .ant-drawer-body {
            padding: 0;
        }


        & .type {
            width: 800px;
            display: block;
            margin: auto;

            & > h2 {
                text-align: center;
                font-size: 18px;
                margin: 18px 0;
            }

            & > .group {
                width: 100%;
                height: 400px;
                display: flex;

                & > .list {
                    width: 100%;
                    height: 400px;
                    border: 1px solid #ddd;
                    margin: 0 10px;
                    border-radius: 4px;
                    position: relative;
                    padding: 40px 0 0 0;
                    overflow: hidden;

                    & > .title {
                        height: 40px;
                        line-height: 40px;
                        background: #f9fafc;
                        margin: 0;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        text-align: center;
                        border-bottom: 1px solid #ddd;
                        font-size: 14px !important;
                    }

                    & > .item {
                        display: block;
                        height: 32px;
                        line-height: 32px;
                        width: 100%;
                        border-bottom: 1px solid rgb(229, 229, 229);
                        cursor: pointer;
                        font-size: 13px !important;
                        padding: 0 15px;

                        & > .icon {
                            position: absolute;
                            font-size: 12px;
                            color: #888;
                            right: 10px;
                        }
                    }

                    & > .item:hover {
                        background: #efefef;
                    }
                }


            }

            & > .desc {
                color: #888;
                text-align: center;
                margin: 20px 0;
            }

            & > .ant-btn {
                display: block;
                margin: 10px auto;
            }
        }

        & .content {
            & > .card {
                border: 1px solid #ebeef5;
                font-size: 13px;
                padding: 20px;
                margin: 15px 0;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

                & > .title {
                    font-size: 24px;
                    color: #333333;
                    height: 50px;
                    line-height: 50px;
                }

                & > .body {
                    & > .row {
                        display: flex;
                        min-height: 40px;
                        line-height: 40px;
                        margin: 10px 0;

                        & > div:first-child {
                            width: 100px;
                            font-size: 14px;
                            text-align: right;
                            margin: 0 10px 0 0;
                        }

                        & > div:last-child {
                            width: 100%;
                            flex: 1;
                            font-size: 14px;
                            margin: 0 10px 0 0;

                            & p {
                                font-size: 13px;
                                margin: 0;
                            }

                            & a {
                                font-size: 13px;
                                margin: 0;
                            }

                            & .specification {
                                background: #efefef;
                                padding: 10px 20px;
                                margin: 0 0 20px 0;
                                max-width: 800px;

                                & .ant-tag {
                                    font-size: 13px;
                                    height: 32px !important;
                                    line-height: 32px !important;
                                }
                            }

                            & .table {
                                border: 1px solid #d9d9d9;
                                max-width: 800px;

                                & > .header {
                                    background: #eeeeee;
                                    height: 56px !important;
                                    line-height: 56px !important;

                                    & > div {
                                        text-indent: 10px;
                                        border-top: none !important;
                                    }
                                }

                                & > .row {
                                    display: flex;
                                    height: 86px;
                                    line-height: 86px;
                                    overflow: hidden;


                                    & > div {
                                        flex: 1;
                                        font-size: 13px;
                                        border-right: 1px solid #d9d9d9;
                                        border-top: 1px solid #d9d9d9;

                                        & > .ant-input {
                                            border: none;
                                            height: 84px;
                                            line-height: 84px;
                                        }
                                    }

                                    & > .c1 {
                                        position: relative;
                                        text-indent: 5px;
                                        & > span {
                                            position: absolute;
                                            line-height: 20px;
                                            left: 8px;
                                            top: 8px;
                                            right: 8px;
                                            bottom: 8px;
                                        }
                                    }
                                }

                                & > .row {
                                    & > div:last-child {
                                        border-right: none;
                                    }
                                }
                            }

                            & .ant-tag-checkable {
                                font-size: 13px;
                                height: 30px;
                                line-height: 30px;
                            }
                        }

                        & .color-red {
                            font-size: 17px;
                        }
                    }
                }
            }


            & > .panel {
                width: 185px;
                margin: 40px auto 100px auto;
            }
        }
    }
    .row-render-title{
        margin: 20px 15px 8px 0;
        font-size: 14px;
        color: #666;
    }
    .sku-rows {
        max-width: 800px;
        margin: 0 15px 20px 0;
        background: #fff;
        border: 1px solid #ddd;

        & .row {
            display: flex;
            padding: 0 20px;
            height: 32px;
            line-height: 32px;
            border-bottom: 1px solid #ccc;


            & > .item {
                flex: 1;
            }
        }

        & .row:last-child {
            border-bottom: none;
        }
    }
    .sku-labels {
        max-width: 400px;
        margin: 0 15px 20px 15px;
        background: #fff;
        border: 1px solid #ddd;

        & .row {
            display: flex;
            padding: 0 20px;
            height: 32px;
            line-height: 32px;
            border-bottom: 1px solid #ccc;


            & > .item {
                flex: 1;
            }
        }

        & .row:last-child {
            border-bottom: none;
        }
    }
</style>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import AdminTableComponent from "../component/admin-table-component.vue";
    import AdminAreaTitleComponent from "../component/admin-area-title-component.vue";
    import AdminInputComponent from "../component/admin-input-component.vue";
    import AdminPriceComponent from '../component/admin-price-component.vue';
    import AdminSelectComponent from '../component/admin-select-component.vue';
    import AdminDateComponent from '../component/admin-date-component.vue';
    import AdminUploadComponent from '../component/admin-upload-component.vue';


    @Component({
        components: {
            AdminUploadComponent,
            AdminDateComponent,
            AdminSelectComponent,
            AdminPriceComponent, AdminInputComponent, AdminAreaTitleComponent, AdminTableComponent
        }
    })
    export default class OrderComponent extends Vue {
        public visible: boolean = false;
        public columns: any[] = [
            {
                title: '商品ID',
                width: '60px',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '商品主图',
                width: '100px',
                dataIndex: 'mainImage',
                key: 'mainImage',
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
                title: '商品名称',
                width: '300px',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '品牌',
                width: '140px',
                dataIndex: 'brandName',
                key: 'brandName',
            },
            {
                title: '商品分类',
                width: '200px',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title: '销售价格',
                width: '80px',
                dataIndex: 'price',
                key: 'price',
                customRender: (text => {
                    return Number(text).toFixed(2);
                })
            },
            {
                title: '平台价格',
                width: '80px',
                key: 'platformPrice',
                dataIndex: 'platformPrice',
                customRender: (text => {
                    return Number(text).toFixed(2);
                })
            },
            {
                title: '销量',
                width: '80px',
                dataIndex: 'sales',
                key: 'sales',
            },

            {
                title: '是否推荐',
                width: '100px',
                key: 'recommend',
                dataIndex: 'recommend',
            },
            {
                title: '状态',
                width: '100px',
                key: 'status',
                dataIndex: 'status',
            },
            {
                title: '发布时间',
                width: '160px',
                key: 'createTime',
                dataIndex: 'createTime',
            },
            {
                title: '面板',
                key: '_panel',
                dataIndex: '_panel',
                customRender: (() => {
                    return this.$createElement('div', {
                        attrs: {},
                    }, [
                        this.$createElement('a', {
                            attrs: {},
                        }, '编辑商品'),
                        this.$createElement('span', {
                            attrs: {
                                'class': 'table-split'
                            },
                        }, ''),
                        this.$createElement('a', {
                            attrs: {},
                        }, '查看商品')
                    ]);
                })
            }
        ];
        public args: any = {};
        public addGoodsDialog: boolean = false;

        public serviceTypeList = [
            {
                name: '全国联保',
                value: false,
                id: 1
            },
            {
                name: '7天无理由退换',
                value: false,
                id: 2
            }
        ];
        public brandList: any[] = [];
        public logisticsList: any[] = [];
        public specificationList: any[] = [];
        public goodsInfo: any = {
            category: '1',
            categoryName: '饰品/流行首饰/时尚饰品 > 保养鉴定用品 > 其他',
            name: '',
            shortName: '',
            brandName: '',
            bannerImage: [],
            detailImage: [],
            description: '',
            platformPrice: '',
            type: '1',
            logisticsId: '',
            specification: [],
            sku: [],

            specificationStatus: 0
        };

        public async mounted() {
            this.brandList = (await this['$api'].getGoodsBrandList.execute({})).asObject().data;
            this.logisticsList = (await this['$api'].getLogisticsTemplateList.execute({})).asObject().data;
            this.specificationList = (await this['$api'].getGoodsSpecificationList.execute({})).asObject().data;
        }

        public onLoadData() {
            this.$refs.table.loadData();
        }

        public onAddGoods() {
            this.addGoodsDialog = true;
        }

        public onAddSpecification() {
            let flag: boolean = false;
            this.goodsInfo.specification.forEach(it => {
                if (!flag) {
                    flag = it.tag == null || it.tag.length == 0;
                }
            });
            if (!flag) {
                this.goodsInfo.specification.push({
                    id: '1',
                    tag: [],
                    value: ''
                });
            }
        }

        public onSaveSpecification() {
            this.goodsInfo.specificationStatus = 1;
            this.refreshSku();
        }

        public onUpdateSpecification() {
            this.goodsInfo.specificationStatus = 0;
        }

        public onConfirmSpecification(event: any, item: any) {
            if (event.keyCode === 13) {
                const name = event.currentTarget.value.trim();
                if (name.length <= 0) {
                    return;
                }
                item.tag = item.tag || [];
                const r = item.tag.find(r => {
                    return r.name === name;
                });
                if (r == null) {
                    const select = this.specificationList.find(r => {
                        return r.id = item.id;
                    });
                    item.tag.push({name: name, parentName: select.name});
                    item.value = '';
                }
            }
        }

        public onRemoverSpecification(item: any) {
            const index = this.goodsInfo.specification.findIndex(r => {
                return r === item;
            });
            this.goodsInfo.specification.splice(index, 1);
        }


        private refreshSku() {

            let index: number[] = [];
            let maxIndex: number[] = [];
            for (let i = 0; i < this.goodsInfo.specification.length; i++) {
                if (this.goodsInfo.specification[i].tag.length > 0) {
                    maxIndex.push(this.goodsInfo.specification[i].tag.length);
                    index.push(0);
                }
            }

            const get = () => {

                //如果index已经最大就返回null
                if (index.length === 0) {
                    return null;
                }


                const flag = index.concat();
                for (let i = index.length - 1; i >= 0; i--) {
                    if (index[i] + 1 < maxIndex[i]) {
                        index[i]++;
                        break;
                    }
                    index[i] = 0;
                    if (i == 0) {
                        index = [];
                    }
                }
                return flag;
            };


            let i = 0;
            this.goodsInfo.sku = [];
            while (true) {
                i++;
                if (i > 50) {
                    return;
                }
                const v = get();
                if (v == null) {
                    break;
                }

                const row: any = {
                    specificationId: [],
                    specificationName: [],
                    stock: '',
                    costPrice: '',
                    price: '',
                    externalNo: '',
                    mainImage: []
                };
                for (let i = 0; i < v.length; i++) {
                    row.specificationId.push(this.goodsInfo.specification[i]);
                    row.specificationName.push(this.goodsInfo.specification[i].tag[v[i]]);
                }
                const findResult = this.goodsInfo.sku.find(r => {
                    let flag = false;
                    for (let i = 0; i < r.specificationName.length; i++) {
                        if (r.specificationName[i].name === row.specificationName[i].name &&
                            r.specificationName[i].parentName === row.specificationName[i].parentName) {
                            flag = true;
                        } else {
                            flag = false;
                            break;
                        }
                    }
                    return flag;
                });

                if (findResult == null) {
                    this.goodsInfo.sku.push(row);
                }
            }

            // const specification = this.goodsInfo.specification[0];
            // for (const item of specification.tag) {
            //     if (row == null) {
            //         row = {
            //             specificationId: [specification.id],
            //             specificationName: [item.name],
            //             stock: '',
            //             costPrice: '',
            //             price: '',
            //             externalNo: '',
            //             mainImage: ''
            //         };
            //     } else {
            //         row.specificationId.push(specification.id);
            //         row.specificationId.push(item.name);
            //     }
            // }


        }

        public async saveGoods(type: string) {
            if (this.goodsInfo.name.trim() === '' || this.goodsInfo.name.trim().length > 65) {
                await this.$message.error('商品名称是空或者超过最大限制');
                return;
            }
            if (this.goodsInfo.shortName.trim().length > 15) {
                await this.$message.error('短标题超过最大限制');
                return;
            }
            if (this.goodsInfo.bannerImage.length <= 0) {
                await this.$message.error('请至少上传一张Banner图');
                return;
            }
            if (this.goodsInfo.description.trim().length > 300) {
                await this.$message.error('商品描述超过最大限制');
                return;
            }
            if (this.goodsInfo.platformPrice === '' || isNaN(Number(this.goodsInfo.platformPrice))) {
                await this.$message.error('平台价格错误');
                return;
            }
            if (this.goodsInfo.sku.length <= 0) {
                await this.$message.error('请选择商品的规格属性');
                return;
            }
            for (let item of this.goodsInfo.sku) {
                if (item.stock === '' || isNaN(Number(item.stock))) {
                    await this.$message.error('库存错误');
                    return;
                }
                if (item.costPrice === '' || isNaN(Number(item.costPrice))) {
                    await this.$message.error('成本价格错误');
                    return;
                }
                if (item.price === '' || isNaN(Number(item.price))) {
                    await this.$message.error('销售价格错误');
                    return;
                }
            }
            if (this.goodsInfo.logisticsId === '') {
                await this.$message.error('请选择物流模板');
                return;
            }

            const serviceType: any[] = [];
            this.serviceTypeList.forEach(it => {
                if (it.value) {
                    serviceType.push(it.id);
                }
            });
            const request = JSON.parse(JSON.stringify(Object.assign(this.goodsInfo, {
                type: type,
                serviceType: serviceType
            })));
            request.sku.forEach(it => {
                if (it.mainImage != null && it.mainImage.length > 0) {
                    it.mainImage = it.mainImage[0].ossId || it.mainImage[0].url;
                } else {
                    it.mainImage = null;
                }
            });

            const bannerImage: any[] = [];
            for (let i = 0; i < request.bannerImage.length; i++) {
                bannerImage.push(request.bannerImage[i].ossId || request.bannerImage[i].url);
            }
            request.bannerImage = bannerImage;

            if (request.detailImage != null) {
                const detailImage: any[] = [];
                for (let i = 0; i < request.detailImage.length; i++) {
                    detailImage.push(request.detailImage[i].ossId || request.detailImage[i].url);
                }
                request.detailImage = detailImage;
            }

            console.log(request);
            (await this['$api'].saveGoods.execute(request)).asObject();
        }
    }
</script>

