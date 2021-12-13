import Vue from 'vue'
import qs from 'qs'
import VueCookies from 'vue-cookies';


Vue.prototype.$qs = qs
Vue.prototype.$cookies = VueCookies;
 