import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faPlay, faPause, faBackward, faForward, faTrash, faHome, faUser, faSignOutAlt, faMusic, faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(faPlay, faPause, faBackward, faForward, faTrash, faHome, faUser, faMusic, faSignOutAlt, faHeart);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
