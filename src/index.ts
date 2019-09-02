import Vue from 'vue';
import SearchBooks from './SearchBooks.vue';
import store from './store/index';

export default new Vue({
  el: '#app',
  store,
  components: {
    'search-books': SearchBooks,
  },
}).$mount('#app');
