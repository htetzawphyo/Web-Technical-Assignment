import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import cookie from '../composables/cookie.js';

export const useAuthStore = defineStore('authStore', () => {
    // TOKEN
    const token = cookie.getCookie('accessToken');

    // ROUTER
    const router = useRouter();

    // STATE
    const accessToken = ref(cookie.getCookie('accessToken') || null);
    const authorizeUser = ref([]);
    const errMsg = ref([]);

    // GETTER
    const getErrMsg = computed( () => {
        return errMsg.value;
    })

    // ACTIONS
    const login = (formData) => {
        axios.post(`/api/login`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response.data)
            let isToken = response.data.token
            if(isToken){
                accessToken.value = isToken;
                cookie.setCookie('accessToken', isToken);
                authorizeUser.value = response.data;
                router.push({name: 'item'});
            }else{
                errMsg.value = response.data.message;
            }
        })
        .catch( error => {
            if(error.response.data.errors){
                errMsg.value = error.response.data.errors;
            }
        })
    }

    const logout = () => {
        axios.post('/api/logout', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then( response => {
            console.log(response)
            if(response.status == 200){
                accessToken.value = null;
                cookie.deleteCookie('accessToken');
                router.push({name: 'login'})
            }
        })
        .catch( error => {
            console.log(error)
        })
    }

    return { accessToken, getErrMsg, login, logout }
})