import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPhone, faUserSecret, faSpinner, faSearch, faSignInAlt, faUserMd, faEye, faHeartbeat, faBaby, faHeadSideCough, faMapMarker, faMapMarkerAlt, faTrash, faEdit , faTrashAlt, faHome, faEnvelope, faPaperPlane, faFrown, faCheck, faArrowLeft, faVideo} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueRouter from 'vue-router';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import DocCats from './components/DocCats';
import Threads from './components/Threads';
import Phome from './components/Phome';
import Pitched from './components/Pitched';
import Searched from './components/Searched';
import Chat from './components/Chat';
import Inbox from './components/Inbox';
import Dhome from  './components/Dhome';
import Video from './components/Video';
import Payment from './components/Payment';

library.add(faPhone ,faHome, faEnvelope, faFrown , faVideo ,faUserSecret,faSpinner,faSearch,faSignInAlt,faUserMd,faEye,faHeartbeat,faBaby,faHeadSideCough,faMapMarker,faMapMarkerAlt,faTrash,faEdit,faTrashAlt ,faPaperPlane , faCheck , faArrowLeft)
Vue.component('fa-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(VueRouter)

const routes = [
  
  { path: '/' , component:LandingPage },
  { path: '/register/:id' , component:Register },
  { path: '/DocCats/:id' , component:DocCats },
  { path: '/threads' , component:Threads },
  { path: '/Phome' , component:Phome },
  { path: '/Chat/:id/:name' , component:Chat },
  { path: '/Pitch/:id' , component:Pitched },
  { path : '/Searched/:loc/:name/', component : Searched},
  {path: '/Inbox' , component : Inbox},
  {path: '/Dhome' , component : Dhome},
  {path : '/Video' , component : Video},
  {path : '/Payment' , component : Payment},

];

const router = new VueRouter({
  routes : routes,
  mode: "history"
});

Vue.config.productionTip = false;
new Vue({
  router:router,
  render : h =>h(App),
}).$mount('#app')
