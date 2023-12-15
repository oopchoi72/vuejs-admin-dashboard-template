import { createRouter, createWebHistory } from "vue-router";
import Main from "./pages/Main.vue";
import SignIn from "./pages/SignIn.vue";
import Codes from "./pages/Codes.vue";
import Users from "./pages/Users.vue";
import Error404 from "./pages/Error404.vue";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: Main,
    },
    {
      path: "/signin",
      component: SignIn,
    },
    {
      path: "/manage/codes",
      component: Codes,
    },
    {
      path: "/manage/users",
      component: Users,
    },
    {
      path: "/404",
      name: "notFound",
      component: Error404,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
});

export default router;
