import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import SignInView from "../views/SignInView.vue"
import AddCompany from "../views/AddCompany.vue"
import CompanyDetail from "../views/CompanyDetail.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/signin",
    name: "signIn",
    component: SignInView,
  },
  {
    path: "/addcompany",
    name: "addCompany",
    component: AddCompany,
  },
  {
    path: "/companydetail",
    name: "companyDetail",
    component: CompanyDetail,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
