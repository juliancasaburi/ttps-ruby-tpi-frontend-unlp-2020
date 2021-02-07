import Vue from 'vue';
import Router from 'vue-router';
import Books from '@/views/Books.vue';
import Book from '@/views/Book.vue';
import Notes from '@/views/Notes.vue';
import LoginSignup from '@/views/LoginSignup.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Notes },
    { path: '/notes', component: Notes },
    { path: '/books', component: Books },
    { path: '/book/:bookId', name: 'book', component: Book },
    { path: '/login', component: LoginSignup },
    { path: '*', redirect: '/' }, // otherwise redirect to the home
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
});

export default router;
