import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueRouter from 'vue-router'
import Home from './components/HomePage'
import Admin from './components/AdminPage'
import user from './components/UserSignInPage'
import adminsingin from './components/AdminSignInPage'
import Receipt from './components/ReceiptTemplate'
import Admission from "./components/AdmissionTemplate"
import EditReceipt from "./components/EditReceiptPage"
import EditAdmission from "./components/EditAdmissionPage"
import ShowAdmissionLetters from "./components/ShowAllAdmissionLetters"
import ShowReceipts from "./components/ShowAllReceipt"

Vue.use(VueRouter)

const router = new VueRouter({
mode: "history",
  routes: [
    {path: "/", name: "Home", component: Home},
    {path: "/admin", name: "Admin", component: Admin},
    {path: "/admin/signin", name: "AdminSignIn", component: adminsingin},
    {path: "/user/signin", name: "UserSignIn", component: user},
    {path: "/user/ReceiptTemplate", name: "Receipt", component: Receipt},
    {path: "/user/AdmissionTemplate", name: "Admission", component: Admission},
    {path: "/user/EditReceipt/:id", name: "EditReceipt", component: EditReceipt},
    {path: "/user/EditAdmission/:id", name: "EditReceipt", component: EditAdmission},
    {path:  "/user/ShowReceipts" , name: "ShowReceipts", component: ShowReceipts},
    {path: "/user/ShowAdmissionLetters", name: "ShowAdmissionLetters", component: ShowAdmissionLetters}
  ],

})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
