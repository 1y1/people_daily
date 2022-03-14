import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";
import audioList from "../views/audioList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "audioList",
    // component: audioList,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/audioList.vue"),
  },
  {
    path: "/articleDetail",
    name: "articleDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/articleDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
