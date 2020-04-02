<template>
    <div class="order">
        <admin-area-title-component :label="pageType === '1' ? '订单列表': pageType === '2' ? '退款订单': '退货订单'">

        </admin-area-title-component>
        <admin-table-component :columns="columns"
                               :url="this['$api'].getOrderList"
                               :args="args"
                               :autoLoad="true"
                               :rowKey="row => row.id"
                               :isExpandedRowRender="true"
                               v-if="pageType === '1'"
                               ref="table">
            <div slot="console">
                <div class="row">
                    <div class="item">
                        <admin-input-component label="订单号" v-model="args.orderNo"/>
                    </div>
                    <div class="item">
                        <admin-input-component label="店铺名称"
                                               v-model="args.shopName"/>
                    </div>
                    <div class="item">
                        <admin-select-component label="订单状态"
                                                :select="args.status"
                                                v-model="args.status"
                                                :data="[{name:'全部',value:''},{name:'待付款',value:'0'},
                                                {name:'待发货',value:'1'},{name:'待收货',value:'2'},{name:'待结算',value:'3'}]"
                                                />
                    </div>
                    <div class="item">
                        <admin-date-component label="创建时间" @change="(v)=>{args.dateStart = v[0];args.dateEnd = v[1]}"/>
                    </div>
                    <div class="item">
                        <a-button type="primary" @click="onLoadData">搜索数据</a-button>
                    </div>
                </div>
            </div>
            <div slot="expandedRowRender" slot-scope="row" class="order-render">
                <div class="info">
                    <div class="order-info">
                        <div class="row"><span>订单号: </span>{{row.row.orderNo}}</div>
                        <div class="row" v-if="row.row.channelCode != null && row.row.channelCode !== ''">
                            <span>订单渠道: </span>{{row.row.channelCode}}
                        </div>
                        <div class="row"><span>订单类型: </span>{{row.row.typeName}}</div>
                        <div class="row"><span>订单总金额: </span>{{row.row.totalAmount == null ? '-' :
                            row.row.totalAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>折扣金额: </span>{{row.row.discountAmount == null ? '-' :
                            row.row.discountAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>店铺优惠: </span>{{row.row.shopDeductionAmount == null ? '-' :
                            row.row.shopDeductionAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>VIP优惠: </span>{{row.row.vipDeductionAmount == null ? '-' :
                            row.row.vipDeductionAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>满减金额: </span>{{row.row.deductionAmount == null ? '-' :
                            row.row.deductionAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>优惠券抵扣: </span>{{row.row.couponAmount == null ? '-' :
                            row.row.couponAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>付款金额: </span>{{row.row.payAmount == null ? '-' :
                            row.row.payAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>订单状态: </span>
                            {{
                            row.row.status.toString() === '0' ? '待付款'
                            :row.row.status.toString() === '1' ? '待发货'
                            :row.row.status.toString() === '2' ? '待收货'
                            :row.row.status.toString()=== '3' ? '待结算'
                            :row.row.status.toString() === '4' ? '已完成'
                            :row.row.status.toString()=== '5' ? '已关闭'
                            :row.row.status.toString()=== '6' ? '不显示'
                            :row.row.status.toString()=== '7' ? '退款中'
                            :row.row.status.toString()=== '8' ? '退货中':'-'
                            }}
                        </div>
                    </div>
                    <div class="order-pay-info" v-if="row.row.payTime != null">
                        <div class="row"><span>支付方式: </span>{{row.row.paymentName}}</div>
                        <div class="row"><span>支付流水: </span>{{row.row.payFlowNo}}</div>
                        <div class="row"><span>支付时间: </span>{{row.row.payTime}}</div>
                    </div>
                    <div class="panel">
                        <div class="row"><span>收件人: </span>{{row.row.recipient}}</div>
                        <div class="row"><span>手机号: </span>{{row.row.recipientPhone}}</div>
                        <div class="row"><span>详细地址: </span>{{row.row.detailAddress}}</div>
                        <a>查看物流</a>
                    </div>
                </div>
                <div class="goods-list">
                    <div class="item" v-for="item of row.row.itemList">
                        <div class="image">
                            <img v-lazy="item.mainImage">
                        </div>
                        <div class="info">
                            <div class="text">{{item.name}}</div>
                            <div class="text specification">{{item.specificationName}}</div>
                            <div class="text">商品单价: {{item.salesPrice == null ? '-' : item.salesPrice.toFixed(2)}}&nbsp;&nbsp;&nbsp;&nbsp;购买数量:
                                {{item.number == null ? '-' : item.number}}
                            </div>
                            <div class="text">商品总价: {{item.totalPrice == null ? '-' : item.totalPrice.toFixed(2)}}</div>
                            <div class="text">优惠金额: {{item.discountPrice == null ? '-' :
                                item.discountPrice.toFixed(2)}}
                            </div>
                            <div class="text">购买价格: {{item.payPrice == null ? '-' : item.payPrice.toFixed(2)}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </admin-table-component>
        <admin-table-component :columns="columnsRefund"
                               :url="this['$api'].getRefundOrderList"
                               :args="argsRefund"
                               :autoLoad="true"
                               :rowKey="row => row.id"
                               :isExpandedRowRender="true"
                               v-if="pageType === '2'"
                               ref="tableRefund">
            <div slot="console">
                <div class="row">
                    <div class="item">
                        <admin-input-component label="订单号" v-model="argsRefund.orderNo"/>
                    </div>
                    <div class="item">
                        <admin-input-component label="退款号" v-model="argsRefund.refundNo"/>
                    </div>
                    <div class="item">
                        <admin-select-component label="退款状态"
                                                :data="[{name:'全部',value:'-'},{name:'待审核',value:'0'},
                                                {name:'退款完成',value:'1'},{name:'退款拒绝',value:'2'},{name:'退款关闭',value:'9'}]"
                                                v-model="argsRefund.status"/>
                    </div>
                    <div class="item">
                        <admin-date-component label="申请时间" @change="(v)=>{argsRefund.dateStart = v[0];argsRefund.dateEnd = v[1]}"/>
                    </div>
                    <div class="item">
                        <a-button type="primary" @click="onLoadData">搜索数据</a-button>
                    </div>
                </div>
            </div>
            <div slot="expandedRowRender" slot-scope="row" class="order-render">
                <div class="info">
                    <div class="order-info">
                        <div class="row"><span>订单号: </span>{{row.row.orderInfo.orderNo}}</div>
                        <div class="row"
                             v-if="row.row.orderInfo.channelCode != null && row.row.orderInfo.channelCode !== ''">
                            <span>订单渠道: </span>{{row.row.orderInfo.channelCode}}
                        </div>
                        <div class="row"><span>订单类型: </span>{{row.row.orderInfo.typeName}}</div>
                        <div class="row"><span>订单总金额: </span>{{row.row.orderInfo.totalAmount == null ? '-' :
                            row.row.orderInfo.totalAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>折扣金额: </span>{{row.row.orderInfo.discountAmount == null ? '-' :
                            row.row.orderInfo.discountAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>店铺优惠: </span>{{row.row.orderInfo.shopDeductionAmount == null ? '-' :
                            row.row.orderInfo.shopDeductionAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>VIP优惠: </span>{{row.row.orderInfo.vipDeductionAmount == null ? '-' :
                            row.row.orderInfo.vipDeductionAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>满减金额: </span>{{row.row.orderInfo.deductionAmount == null ? '-' :
                            row.row.orderInfo.deductionAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>优惠券抵扣: </span>{{row.row.orderInfo.couponAmount == null ? '-' :
                            row.row.orderInfo.couponAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>付款金额: </span>{{row.row.orderInfo.payAmount == null ? '-' :
                            row.row.orderInfo.payAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>订单状态: </span>
                            {{
                            row.row.orderInfo.status.toString() === '0' ? '待付款'
                            :row.row.orderInfo.status.toString() === '1' ? '待发货'
                            :row.row.orderInfo.status.toString() === '2' ? '待收货'
                            :row.row.orderInfo.status.toString()=== '3' ? '待结算'
                            :row.row.orderInfo.status.toString() === '4' ? '已完成'
                            :row.row.orderInfo.status.toString()=== '5' ? '已关闭'
                            :row.row.orderInfo.status.toString()=== '6' ? '不显示'
                            :row.row.orderInfo.status.toString()=== '7' ? '退款中'
                            :row.row.orderInfo.status.toString()=== '8' ? '退货中':'-'
                            }}
                        </div>
                    </div>
                    <div class="order-pay-info" v-if="row.row.orderInfo.payTime != null">
                        <div class="row"><span>支付方式: </span>{{row.row.orderInfo.paymentName}}</div>
                        <div class="row"><span>支付流水: </span>{{row.row.orderInfo.payFlowNo}}</div>
                        <div class="row"><span>支付时间: </span>{{row.row.orderInfo.payTime}}</div>
                    </div>
                    <div class="order-refund">
                        <div class="row"><span>退款号: </span>{{row.row.refundNo}}</div>
                        <div class="row"><span>申请时间: </span>{{row.row.createTime}}</div>
                        <div class="row" v-if="row.row.handelTime != null"><span>处理时间: </span>{{row.row.handelTime}}
                        </div>
                        <div class="row"><span>退款理由: </span>{{row.row.reason}}</div>
                        <div class="row" v-if="row.row.remark != null && row.row.remark !== ''"><span>退款备注: </span>{{row.row.remark}}
                        </div>
                        <div class="row"><span>退款总金额: </span>{{row.row.amount == null ? '-' :
                            row.row.amount.toFixed(2)}}
                        </div>
                    </div>
                    <div class="panel">
                        <div class="row"><span>收件人: </span>{{row.row.orderInfo.recipient}}</div>
                        <div class="row"><span>手机号: </span>{{row.row.orderInfo.recipientPhone}}</div>
                        <div class="row"><span>详细地址: </span>{{row.row.orderInfo.detailAddress}}</div>
                        <a>查看物流</a>
                    </div>
                </div>
                <div class="goods-list">
                    <div class="item" v-for="item of row.row.goodsSkuList">
                        <div class="image">
                            <img v-lazy="item.mainImage">
                        </div>
                        <div class="info">
                            <div class="text">{{item.name}}</div>
                            <div class="text specification">{{item.specificationName}}</div>
                            <div class="text">退款金额: {{item.price == null ? '-' : item.price.toFixed(2)}}
                            </div>
                            <div class="text">退款数量: {{item.number == null ? '-' : item.number}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </admin-table-component>
        <admin-table-component :columns="columnsReturns"
                               :url="this['$api'].getRefundOrderList"
                               :args="argsReturns"
                               :autoLoad="true"
                               :rowKey="row => row.id"
                               :isExpandedRowRender="true"
                               v-if="pageType === '3'"
                               ref="tableReturns">
            <div slot="console">
                <div class="row">
                    <div class="item">
                        <admin-input-component label="订单号" v-model="argsReturns.orderNo"/>
                    </div>
                    <div class="item">
                        <admin-input-component label="退款号" v-model="argsReturns.refundNo"/>
                    </div>
                    <div class="item">
                        <admin-select-component label="退款状态"
                                                :data="[{name:'全部',value:'-'},{name:'待审核',value:'0'},
                                                {name:'退款完成',value:'1'},{name:'退款拒绝',value:'2'},{name:'退款关闭',value:'9'}]"
                                                v-model="argsReturns.status"/>
                    </div>
                    <div class="item">
                        <admin-date-component label="申请时间" @change="(v)=>{argsReturns.dateStart = v[0];argsReturns.dateEnd = v[1]}"/>
                    </div>
                    <div class="item">
                        <a-button type="primary" @click="onLoadData">搜索数据</a-button>
                    </div>
                </div>
            </div>
            <div slot="expandedRowRender" slot-scope="row" class="order-render">
                <div class="info">
                    <div class="order-info">
                        <div class="row"><span>订单号: </span>{{row.row.orderInfo.orderNo}}</div>
                        <div class="row"
                             v-if="row.row.orderInfo.channelCode != null && row.row.orderInfo.channelCode !== ''">
                            <span>订单渠道: </span>{{row.row.orderInfo.channelCode}}
                        </div>
                        <div class="row"><span>订单类型: </span>{{row.row.orderInfo.typeName}}</div>
                        <div class="row"><span>订单总金额: </span>{{row.row.orderInfo.totalAmount == null ? '-' :
                            row.row.orderInfo.totalAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>折扣金额: </span>{{row.row.orderInfo.discountAmount == null ? '-' :
                            row.row.orderInfo.discountAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>店铺优惠: </span>{{row.row.orderInfo.shopDeductionAmount == null ? '-' :
                            row.row.orderInfo.shopDeductionAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>VIP优惠: </span>{{row.row.orderInfo.vipDeductionAmount == null ? '-' :
                            row.row.orderInfo.vipDeductionAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>满减金额: </span>{{row.row.orderInfo.deductionAmount == null ? '-' :
                            row.row.orderInfo.deductionAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>优惠券抵扣: </span>{{row.row.orderInfo.couponAmount == null ? '-' :
                            row.row.orderInfo.couponAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>付款金额: </span>{{row.row.orderInfo.payAmount == null ? '-' :
                            row.row.orderInfo.payAmount.toFixed(2)}}
                        </div>
                        <div class="row"><span>订单状态: </span>
                            {{
                            row.row.orderInfo.status.toString() === '0' ? '待付款'
                            :row.row.orderInfo.status.toString() === '1' ? '待发货'
                            :row.row.orderInfo.status.toString() === '2' ? '待收货'
                            :row.row.orderInfo.status.toString()=== '3' ? '待结算'
                            :row.row.orderInfo.status.toString() === '4' ? '已完成'
                            :row.row.orderInfo.status.toString()=== '5' ? '已关闭'
                            :row.row.orderInfo.status.toString()=== '6' ? '不显示'
                            :row.row.orderInfo.status.toString()=== '7' ? '退款中'
                            :row.row.orderInfo.status.toString()=== '8' ? '退货中':'-'
                            }}
                        </div>
                    </div>
                    <div class="order-pay-info" v-if="row.row.orderInfo.payTime != null">
                        <div class="row"><span>支付方式: </span>{{row.row.orderInfo.paymentName}}</div>
                        <div class="row"><span>支付流水: </span>{{row.row.orderInfo.payFlowNo}}</div>
                        <div class="row"><span>支付时间: </span>{{row.row.orderInfo.payTime}}</div>
                    </div>
                    <div class="order-refund">
                        <div class="row"><span>退款号: </span>{{row.row.refundNo}}</div>
                        <div class="row"><span>申请时间: </span>{{row.row.createTime}}</div>
                        <div class="row" v-if="row.row.handelTime != null"><span>处理时间: </span>{{row.row.handelTime}}
                        </div>
                        <div class="row"><span>退款理由: </span>{{row.row.reason}}</div>
                        <div class="row" v-if="row.row.remark != null && row.row.remark !== ''"><span>退款备注: </span>{{row.row.remark}}
                        </div>
                        <div class="row"><span>退款总金额: </span>{{row.row.amount == null ? '-' :
                            row.row.amount.toFixed(2)}}
                        </div>
                    </div>
                    <div class="panel">
                        <div class="row"><span>收件人: </span>{{row.row.orderInfo.recipient}}</div>
                        <div class="row"><span>手机号: </span>{{row.row.orderInfo.recipientPhone}}</div>
                        <div class="row"><span>详细地址: </span>{{row.row.orderInfo.detailAddress}}</div>
                        <a>查看物流</a>
                    </div>
                </div>
                <div class="goods-list">
                    <div class="item" v-for="item of row.row.goodsSkuList">
                        <div class="image">
                            <img v-lazy="item.mainImage">
                        </div>
                        <div class="info">
                            <div class="text">{{item.name}}</div>
                            <div class="text specification">{{item.specificationName}}</div>
                            <div class="text">退款金额: {{item.price == null ? '-' : item.price.toFixed(2)}}
                            </div>
                            <div class="text">退款数量: {{item.number == null ? '-' : item.number}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </admin-table-component>
    </div>
</template>
<style lang="scss">
    .order-render {
        min-height: 300px;
        position: relative;

        & > .info {
            float: left;
            width: 360px;

            & > .order-info {
                background: #fff;
                border: 1px solid #ddd;
                padding: 6px 10px;

                & > .row {
                    font-size: 13px;
                    line-height: 32px;
                    display: flex;

                    & > span {
                        width: 80px;
                        text-align: center;
                        display: block;
                        font-size: 13px;
                    }
                }
            }

            & > .order-pay-info {
                border: 1px solid #ddd;
                padding: 6px 10px;
                margin-top: 10px;
                background: #fff;

                & > .row {
                    font-size: 13px;
                    line-height: 32px;
                    display: flex;

                    & > span {
                        width: 80px;
                        text-align: center;
                        display: block;
                        font-size: 13px;
                    }
                }
            }

            & > .order-refund {
                border: 1px solid #ddd;
                padding: 6px 10px;
                margin-top: 10px;
                background: #fff;

                & > .row {
                    font-size: 13px;
                    line-height: 32px;
                    display: flex;

                    & > span {
                        width: 80px;
                        text-align: center;
                        display: block;
                        font-size: 13px;
                    }
                }
            }

            & > .panel {
                border: 1px solid #ddd;
                padding: 6px 10px;
                margin-top: 10px;
                background: #fff;

                & > .row {
                    font-size: 13px;
                    line-height: 32px;
                    display: flex;

                    & > span {
                        width: 80px;
                        text-align: center;
                        display: block;
                        font-size: 13px;
                    }
                }

                & > a {
                    margin-left: 10px;
                    line-height: 40px;
                }
            }
        }

        & > .goods-list {
            padding: 0 0 0 400px;
            width: 800px;

            & > .item {
                display: flex;
                border: 1px solid #ddd;
                padding: 5px 12px;
                background: #fff;
                margin-bottom: 15px;

                & > .image {
                    width: 100px;
                    margin-right: 10px;

                    & > img {
                        width: 100%;
                        margin: 4px auto;
                    }
                }

                & > .info {
                    & > .text {
                        font-size: 13px;
                        line-height: 24px;
                        height: 24px;
                        overflow: hidden;
                    }

                    & .text.specification {
                        background: rgba(236, 236, 236, 0.298);
                        color: rgb(153, 153, 153);
                        text-indent: 3px;
                        margin: 3px 0;
                    }
                }
            }
        }
    }
</style>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Watch} from 'vue-property-decorator';
    import AdminTableComponent from "../component/admin-table-component.vue";
    import AdminAreaTitleComponent from "../component/admin-area-title-component.vue";
    import AdminInputComponent from "../component/admin-input-component.vue";
    import AdminPriceComponent from '../component/admin-price-component.vue';
    import AdminSelectComponent from '../component/admin-select-component.vue';
    import AdminDateComponent from '../component/admin-date-component.vue';

    @Component({
        components: {
            AdminDateComponent,
            AdminSelectComponent,
            AdminPriceComponent, AdminInputComponent, AdminAreaTitleComponent, AdminTableComponent
        }
    })
    export default class OrderComponent extends Vue {
        public visible: boolean = false;
        public columns: any[] = [
            {
                title: '订单号',
                width: 180,
                dataIndex: 'orderNo',
                key: 'orderNo',
                ellipsis: true,
            },
            {
                title: '订单名称',
                width: 200,
                dataIndex: 'orderName',
                key: 'orderName',
                ellipsis: true,
            },
            {
                title: '总金额',
                width: 60,
                key: 'totalAmount',
                dataIndex: 'totalAmount',
                customRender: (text => {
                    return Number(text).toFixed(2);
                })
            },
            {
                title: '优惠金额',
                width: 80,
                key: 'action',
                dataIndex: 'totalAmount',
                customRender: (text => {
                    return Number(text).toFixed(2);
                })
            },
            {
                title: '付款金额',
                width: 80,
                key: 'payAmount',
                dataIndex: 'payAmount',
                customRender: (text => {
                    return Number(text).toFixed(2);
                })
            },
            {
                title: '创建时间',
                width: 160,
                key: 'createDate',
                dataIndex: 'createTime',
            },
            {
                title: '订单状态',
                width: 100,
                key: 'status',
                dataIndex: 'status',
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
                                    class: 'color-color-red'
                                },
                            }, '待发货');
                        case '2':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-orange'
                                },
                            }, '待收货');
                        case '3':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-green'
                                },
                            }, '待结算');
                        case '4':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-cyan'
                                },
                            }, '已完成');
                        case '5':
                            return this.$createElement('span', {
                                attrs: {
                                    class: 'color-blue'
                                },
                            }, '已关闭');
                    }
                },
            },
            {
                title: '订单类型',
                width: 140,
                key: 'typeName',
                dataIndex: 'typeName',
            },
            {
                title: '支付时间',
                width: 160,
                key: 'payTime',
                dataIndex: 'payTime',
            },
            {
                title: '付款方式',
                width: 100,
                key: 'paymentName',
                dataIndex: 'paymentName',
            },

            {
                title: '渠道信息',
                width: 100,
                key: 'channelCode',
                dataIndex: 'channelCode',
            },
            {
                title: '订单备注',
                width: 180,
                key: 'remark',
                dataIndex: 'remark',
            },
            {
                title: '面板',
                key: '_panel',
                dataIndex: '_panel',
                customRender: () => {
                    // return this.$createElement('a', {
                    //     attrs: {
                    //         class: 'color-blue'
                    //     },
                    // }, '查看物流');
                }
            }
        ];
        public columnsRefund: any[] = [
            {
                title: '退款号',
                width: 180,
                dataIndex: 'refundNo',
                key: 'refundNo',
                ellipsis: true,
            },
            {
                title: '订单号',
                width: 180,
                dataIndex: 'orderNo',
                key: 'orderNo',
                ellipsis: true,
            },
            {
                title: '退款金额',
                width: 80,
                key: 'amount',
                dataIndex: 'amount',
                customRender: (text => {
                    return Number(text).toFixed(2);
                })
            },
            {
                title: '申请时间',
                width: 160,
                key: 'createTime',
                dataIndex: 'createTime',
            },
            {
                title: '退款状态',
                width: 100,
                key: 'status',
                dataIndex: 'status',
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
                title: '审核时间',
                width: 160,
                key: 'handelTime',
                dataIndex: 'handelTime',
            },
            {
                title: '退款理由',
                width: 180,
                key: 'reason',
                dataIndex: 'reason',
            },
            {
                title: '退款备注',
                width: 180,
                key: 'remark',
                dataIndex: 'remark',
            },
            {
                title: '面板',
                key: '_panel',
                dataIndex: '_panel',
                customRender: () => {
                    // return this.$createElement('a', {
                    //     attrs: {
                    //         class: 'color-blue'
                    //     },
                    // }, '查看物流');
                }
            }
        ];
        public columnsReturns: any[] = [
            {
                title: '退款号',
                width: 180,
                dataIndex: 'refundNo',
                key: 'refundNo',
                ellipsis: true,
            },
            {
                title: '订单号',
                width: 180,
                dataIndex: 'orderNo',
                key: 'orderNo',
                ellipsis: true,
            },
            {
                title: '退款金额',
                width: 80,
                key: 'amount',
                dataIndex: 'amount',
                customRender: (text => {
                    return Number(text).toFixed(2);
                })
            },
            {
                title: '申请时间',
                width: 160,
                key: 'createTime',
                dataIndex: 'createTime',
            },
            {
                title: '退款状态',
                width: 100,
                key: 'status',
                dataIndex: 'status',
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
                title: '审核时间',
                width: 160,
                key: 'handelTime',
                dataIndex: 'handelTime',
            },
            {
                title: '退款理由',
                width: 180,
                key: 'reason',
                dataIndex: 'reason',
            },
            {
                title: '退款备注',
                width: 180,
                key: 'remark',
                dataIndex: 'remark',
            },
            {
                title: '面板',
                key: '_panel',
                dataIndex: '_panel',
                customRender: () => {
                    // return this.$createElement('a', {
                    //     attrs: {
                    //         class: 'color-blue'
                    //     },
                    // }, '查看物流');
                }
            }
        ];
        public args: any = {};
        public argsRefund: any = {};
        public argsReturns: any = {};
        public pageType = '';

        public mounted() {
            this.init();
        }


        @Watch('$route')
        public route() {
            this.init();
        }

        public init() {
            const split = this.$route.path.split('/');
            this.pageType = split[split.length - 1];
        }

        public onLoadData() {
            switch (this.pageType) {
                case '1':
                    this.$refs.table.loadData();
                    break;
                case '2':
                    this.$refs.tableRefund.loadData();
                    break;
                case '3':
                    this.$refs.tableReturns.loadData();
                    break;
            }
        }

    }
</script>

