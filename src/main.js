import Vue from 'vue'
import App from './App.vue'
import router from './router';
// import axios from './utils/axios-config.js';

import './styles/_global.sass';

// Vue.config.productionTip = false
// Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
