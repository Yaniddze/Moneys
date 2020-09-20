import Vue from 'vue';
import Vuex from 'vuex';
import { oidcSettings } from '@/configuration/oidcSettings';
import { vuexOidcCreateStoreModule } from 'vuex-oidc';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    oidcStore: vuexOidcCreateStoreModule(oidcSettings),
  },
});
