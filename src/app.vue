<template>
    <div class="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "static/font/iconfont.css";

    body, html {
        padding: 0;
        margin: 0;
    }

    body, html, h1, h2, h3, h4, h5, h6, div, p, span, em, b {
        font-family: PingFangSC, helvetica neue, hiragino sans gb, arial, microsoft yahei ui, microsoft yahei, simsun, sans-serif;
        font-size: 12px;
    }


    .ant-divider {
        background: #aaa !important;
    }

    .ant-btn {
        padding: 0 16px !important;
        height: 32px !important;

        & > span {
            font-size: 12px !important;
        }
    }

    .ant-btn.ant-btn-primary {
        background: rgb(0, 110, 255) !important;
        border: 1px solid #006eff !important;
    }

    .ant-radio-button-wrapper.ant-radio-button-wrapper-checked {
        background: #006eff !important;
        border-color: #006eff !important;
        color: #fff !important;
        box-shadow: none !important;
    }

    .ant-tabs .ant-tabs-tab {
        font-size: 13px !important;
    }



    .color-pink {
        color: #eb2f96;
    }

    .color-red {
        color: #f5222d;
    }

    .color-orange {
        color: #fa8c16;
    }

    .color-green {
        color: #52c41a;
    }

    .color-cyan {
        color: #13c2c2 !important;
    }

    .color-blue {
        color: #1890ff !important;
    }

    .color-purple {
        color: #722ed1 !important;
    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Utils from './utils/utils';

    declare const window: any;

    @Component
    export default class App extends Vue {
        public async mounted() {
            this.login();
        }

        public async login() {
            // 读取头部token进行登陆
            let token = Utils.getParam('token');
            let flag = Utils.getItem('token');
            window.userInfo = Utils.getItem('userInfo') || null;
            if (window.userInfo == null && token != null && token.toString() !== '' && (flag == null || flag.toString().trim() <= 1)) {
                const result = (await this['$api'].loginByToken.execute({token: token})).asObject();
                if (result.success) {
                    window.userInfo = result.data;
                    Utils.setItem('userInfo', result.data);
                    Utils.setItem('token', result.data.token);
                } else {
                    window.location.href = '//id.zizaixp.com/failure';
                    return;
                }
            }
            // 读取本地缓存
            token = Utils.getItem('token');
            if (token == null || token.toString() === '') {
                window.location.href = '//id.zizaixp.com/shopLogin?r=' + window.location.origin;
            }
        }
    }
</script>