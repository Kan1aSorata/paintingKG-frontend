import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import Axios from "axios";

Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app');
