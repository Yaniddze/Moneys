import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc';
import OidcCallback from '@/views/Callback.vue';
import store from '@/store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/callback',
    name: 'callback',
    component: OidcCallback,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});
router.beforeEach(vuexOidcCreateRouterMiddleware(store));

export default router;
