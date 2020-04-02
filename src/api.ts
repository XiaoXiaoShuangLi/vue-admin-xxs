import Vue from 'vue';
import Axios, {AxiosRequestConfig} from 'axios';
import Utils from './utils/utils';

declare const window: any;
declare const FormData: any;

// API地址配置
const api = {
    login: {url: '/user/login', method: 'post', format: 'json'},
    getOrderList: {url: '/order/getOrderList', method: 'post', format: 'json'},
    getRefundOrderList: {url: '/order/getRefundOrderList', method: 'post', format: 'json'},
    getGoodsList: {url: '/goods/getGoodsList', method: 'post', format: 'json'},
    getMenusList: {url: '/index/getMenusList', method: 'post', format: 'json'},
    upload: {url: '/index/uploadImage', method: 'post', format: 'file'},
    getGoodsBrandList: {url: '/goods/getGoodsBrandList', method: 'post', format: 'json'},
    getGoodsSpecificationList: {url: '/goods/getGoodsSpecificationList', method: 'post', format: 'json'},
    getLogisticsTemplateList: {url: '/goods/getLogisticsTemplateList', method: 'post', format: 'json'},
    saveGoods: {url: '/goods/saveGoods', method: 'post', format: 'json'},
    getBannerList: {url: '/operator/getBannerList', method: 'post', format: 'json'},
    getGoodsCategoryList: {url: '/goods/getGoodsCategoryList', method: 'post', format: 'json'},
    getMerchantList: {url: '/shop/getShopList', method: 'post', format: 'json'},
    getUserList: {url: '/user/getUserList', method: 'post', format: 'json'},

    getActivityList: {url: '/operator/activity/getActivityList', method: 'post', format: 'json'},
    getActivityCategoryList: {url: '/operator/activity/getActivityCategoryList', method: 'post', format: 'json'},
    getActivityGoodsList: {url: '/operator/activity/getActivityGoodsList', method: 'post', format: 'json'},

    getFundsFlowList: {url: '/funds/getFundsFlowList', method: 'post', format: 'json'},
    getMerchantFundsFlowList: {url: '/funds/getMerchantFundsFlowList', method: 'post', format: 'json'},

    loginByToken: {url: '/user/loginByToken', method: 'post', format: 'json'},
};


const axios_instance = Axios.create();
axios_instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const token = window.localStorage.getItem('token') || '';
    if (token != null && token !== '') {
        config.headers.token = token;
    }
    return config;
});

axios_instance.interceptors.response.use();
const execute = (c: any, body?: any) => {
    // 缓存
    if (c.expireTime != null && !isNaN(Number(c.expireTime))) {
        const r = Utils.getItem(c.url + '_' + JSON.stringify(body));
        if (r != null && r !== '' && r.expireTime >= new Date().getTime()) {
            return new Promise(resolve => {
                resolve(new HttpResponse(r));
            });
        }
    }
    const config = {
        headers: {}
    };
    switch (c.method) {
        case 'post':
            switch (c.format) {
                case 'json':
                    config.headers = {'Content-Type': 'application/json; charset=UTF-8'};
                    break;
                case 'form':
                    config.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
                    if (body != null) {
                        const form = new FormData();
                        for (const name in body) {
                            if (body.hasOwnProperty(name)) {
                                form.append(name, body[name]);
                            }
                        }
                        body = form;
                    }
                    break;
                case 'file':
                    config.headers = {'Content-Type': 'multipart/form-data'};
                    if (body != null) {
                        const form = new FormData();
                        for (const name in body) {
                            if (body.hasOwnProperty(name)) {
                                form.append(name, body[name]);
                            }
                        }
                        body = form;
                    }
                    break;
            }
            return axios_instance.post(window.C.BASE_URL + c.url, body, config).then((r: any) => {
                // 是否需要缓存
                if (c.expireTime != null && !isNaN(Number(c.expireTime))) {
                    r.expireTime = new Date().getTime() + Number(c.expireTime);
                    Utils.setItem(c.url + '_' + JSON.stringify(body), r);
                }
                return new HttpResponse(r);
            }).catch(r => {
                return new HttpResponse({
                    data: {
                        data: {
                            success: false,
                            message: r.message
                        }
                    }
                });
            });
        case 'get':
            return axios_instance.get(window.C.BASE_URL + c.url, body).then((r: any) => {
                // 是否需要缓存
                if (c.expireTime != null && !isNaN(Number(c.expireTime))) {
                    r.expireTime = new Date().getTime() + Number(c.expireTime);
                    Utils.setItem(c.url + '_' + JSON.stringify(body), r);
                }
                return new HttpResponse(r);
            }).catch(r => {
                return new HttpResponse({
                    data: {
                        data: {
                            success: false,
                            message: r.message
                        }
                    }
                });
            });
        default:
            break;
    }
};
// tslint:disable-next-line:forin
for (const name in api) {
    api[name].execute = (args?: any) => {
        return execute(api[name], args);
    };
}
Vue.prototype.$api = api;

export class HttpResponse {
    private data;

    constructor(data) {
        this.data = data;
    }

    public asObject() {
        return this.data.data;
    }
}