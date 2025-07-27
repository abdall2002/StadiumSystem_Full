import { createRouter, createWebHistory } from 'vue-router';
import StadiumsView from '../Views/StadiumsView.vue';
import StadiumDetailsView from '../Views/StadiumDetailsView.vue';
import LoginView from '../Views/LoginView.vue';
import RegisterView from '../Views/RegisterView .vue';

const routes = [
  {
    path: '/',
    name: 'Stadiums',
    component: StadiumsView
  },
  { 
    path: '/stadiums/:id', 
    name: 'StadiumDetails', 
    component: StadiumDetailsView 
  },
  { 
    path: '/login', 
    component: LoginView 
  },
  { 
    path: '/register', 
    component: RegisterView 
  },

  // باقي الصفحات هنا
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
