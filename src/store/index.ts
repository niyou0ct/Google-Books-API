import Vue from 'vue';
import Vuex from 'vuex';
import states from './states';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const store = {
  state: states,
  mutations,
  actions,
  getters,
};

Vue.use(Vuex);

export default new Vuex.Store(store);
