import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./firebase"

//グローバル変数の定義しようとした（できてない）
// new Vue({
//   beforeCreate: function () {
//     console.log(this.$appName)
//   },
// })
// Vue.prototype.$appName = "My App"
createApp(App).use(router).mount("#app")
