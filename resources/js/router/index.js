import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/auth/Login.vue';
import ItemList from '../views/item/ItemList.vue';
import ItemAdd from '../views/item/ItemAdd.vue';
import ItemEdit from '../views/item/ItemEdit.vue';
import CategoryList from '../views/category/CategoryList.vue';
import CategoryAdd from '../views/category/CategoryAdd.vue';
import CategoryEdit from '../views/category/CategoryEdit.vue';
import NotFoundPage from '../components/NotFoundPage.vue';

import { useAuthStore } from "../store/Auth";

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/item',
        name: 'item',
        component: ItemList,
        meta: { requiresAuth: true }
    },
    {
        path: '/item/add',
        name: 'item-add',
        component: ItemAdd,
        meta: { requiresAuth: true }
    },
    {
        path: '/item/edit/:id',
        name: 'item-edit',
        component: ItemEdit,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/category',
        name: 'category',
        component: CategoryList,
        meta: { requiresAuth: true }
    },
    {
        path: '/category/add',
        name: 'category-add',
        component: CategoryAdd,
        meta: { requiresAuth: true }
    },
    {
        path: '/category/edit/:id',
        name: 'category-edit',
        component: CategoryEdit,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/:catchAll(.*)',
        component: NotFoundPage
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = !!authStore.accessToken;
    
    if(to.meta.requiresAuth && !isAuthenticated){
        next({name: 'login'});
    }else{
        next();
    }
})

export default router