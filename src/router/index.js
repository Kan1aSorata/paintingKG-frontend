import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

/***
 * @author LiuShuoYan <panilsy@icloud.com>
 * @date 2020/10/11
 * @description 路由配置表
 * @type {{path: string, component: (function(): (Promise<*>|*))}[]}
 */
const routes = [
    // 首页
    { path:'/', component: () => import('../pages/home/index') },
    // 画作详情页
    { path: '/paintingDetail/:id', component: () => import('../pages/detail/index') },
    // 作者详情页
    { path: '/painterDetail/:id', component: () => import('../pages/detail/painter') },

];

export default new VueRouter({
    routes: routes
});
