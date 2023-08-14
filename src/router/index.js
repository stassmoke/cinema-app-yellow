import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router);


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('../views/HomePage.vue')
        },
        {
            path: '/:id',
            name: 'movie-one',
            component: () => import('../views/OneMovie.vue')
        },
    ],
});

export default router