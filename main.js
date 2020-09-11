import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import store from './store'
import {http,togo} from './common/uilts/ulits.js'

Vue.use(uView);

Vue.prototype.$navTo = togo;
Vue.prototype.$http = http;
Vue.prototype.$store = store;
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
