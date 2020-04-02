import VueRouter from "vue-router";

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/system/home'
        },
        {
            path: '/system/:id',
            component: (() => import('../system.module/merchant.vue')),
            children: [
                {
                    path: '/system/home',
                    component: (() => import('../system.module/home-component.vue'))
                },
                {
                    path: '/system/order-list/:type',
                    component: (() => import('../system.module/order-component.vue'))
                },
                {
                    path: '/system/goods-list',
                    component: (() => import('../system.module/goods-component.vue'))
                },
                {
                    path: '/system/goods-type',
                    component: (() => import('../system.module/goods-type-component.vue'))
                },
                {
                    path: '/system/banner',
                    component: (() => import('../system.module/banner-component.vue'))
                },
                {
                    path: '/system/activity',
                    component: (() => import('../system.module/activity-component.vue'))
                },
                {
                    path: '/system/funds-flow',
                    component: (() => import('../system.module/funds-flow-component.vue'))
                },
                {
                    path: '/system/merchant-funds-flow',
                    component: (() => import('../system.module/merchant-funds-flow-component.vue'))
                },
                {
                    path: '/system/merchant-admin',
                    component: (() => import('../system.module/merchant-admin-component.vue'))
                },
                {
                    path: '/system/user-admin',
                    component: (() => import('../system.module/user-admin-component.vue'))
                }
            ]
        },
        {
            path: '/merchant/:id',
            component: (() => import('../merchant.module/merchant.vue')),
            children: [
                {
                    path: '/system/home',
                    component: (() => import('../merchant.module/home-component.vue'))
                }
            ]
        },
        {
            path: '/tool/preview',
            component: (() => import('../tool.module/preview-component.vue'))
        }
    ]
});
export default router;