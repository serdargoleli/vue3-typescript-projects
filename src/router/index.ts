import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/photos",
      name: "photos",
      component: () => import("../views/Photos.vue"),
    },
    {
      path: "/univercity",
      name: "univercity",
      component: () => import("../views/Univercity.vue"),
    },
  ],
});

export default router;
