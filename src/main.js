import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import router from './router'
import vuetify from './plugins/vuetify';
import VueSession from '../node_modules/vue-session';
import GmapCustomMarker from 'vue2-gmap-custom-marker';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCtIhtOqRSNJgWAt9DSVEoeMxySD51MhRI',
    libraries: 'places'
  },
  installComponents: true
});

Vue.use(VueSession);
Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://catatansaya.xyz/tubespaw';
Vue.config.productionTip = false
export const serverBus = new Vue ();
new Vue({
  render: h => h(App),
  router,
  vuetify,
  components: {
    App,
    'gmap-custom-marker': GmapCustomMarker
  }
}).$mount('#app')