import Vue from "vue";
import Router from "vue-router";
import Documents from "./views/documents";
import Register from "./views/register";
import Login from "./views/login";
import Profile from "./views/profile";
import Document from "./views/document";

Vue.use(Router)

export default new Router({
  base: "/app/",
  linkExactActiveClass: "is-current",
  routes: [
    // {
    //   path: "/",
    //   component: Documents
    // },
    {
      path: "/register/",
      component: Register
    },
    {
      path: "/login/",
      component: Login
    },
    {
      path: "/profile/",
      component: Profile
    },
    {
      path: "/",
      component: Document
    },
    {
      path: "/request-reset",
      component: () => import("./views/password-reset-request")
    },
    {
      path: "/reset",
      component: () => import("./views/password-reset")
    }
  ]
})
