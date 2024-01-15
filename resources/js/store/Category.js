import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import cookie from '../composables/cookie.js';

export const useCategoryStore = defineStore('categoryStore', () => {
    // TOKEN
    const token = cookie.getCookie('accessToken');
    
    // ROUTER
    const router = useRouter();

    //STATE
    const category = ref();
    let metas = ref([]);
    const edit_category = ref();
    const errMsg = ref([]);

    //GETTER
    const getCategory = computed(() => {
        return category.value;
    });
    const getMeta = computed( () => {
        return metas.value;
    })
    const getIndex = computed( () => {
        return metas.value.from;
    })

    const getEditCategory = computed(() => {
        return edit_category.value;
    })

    const getErrMsg = computed( () => {
        return errMsg.value;
    })

    //ACTION
    const indexCategory = (page=1) => {
        axios.get(`/api/category?page=${page}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then( response => {
            category.value = response.data.data;
            metas.value = response.data.meta
            // console.log(response)
        })
        .catch( error => {
            console.log(error)
        })
    }

    const addCategory = (category) => {
        axios.post(`/api/category`, category, {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
			}
        })
        .then( response => {
            router.push({name: 'category'});
        })
        .catch( error => {
            if(error.response.data.errors){
                errMsg.value = error.response.data.errors;
            }
        })
    }

    const editCategory = (id) => {
        axios.get(`/api/category/${id}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then( response => {
            let result = response.data
            result.publish == 1 ? result.publish = true : result.publish = false;
            edit_category.value = response.data;
        })
        .catch( error => {
            console.log(error)
        })
    }

    const updateCategory = (id,formData) => {
        axios.post(`/api/category/${id}`, formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then( response => {
            router.push({name: 'category'});
        })
        .catch( error => {
            if(error.response.data.errors){
                errMsg.value = error.response.data.errors;
            }
        })
    }

    const updatePublish = (id) => {
        axios.patch(`/api/category/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then( response => {
            console.log(response)
            indexCategory();
        })
        .catch( error => {
            console.log(error)
        })
    }

    const deleteCategory = (id) => {
        axios.delete(`/api/category/${id}`, {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        })
        .then( response => {
            indexCategory();
        })
        .catch( err => {
            console.log(err)
        })
    }

    return { category, addCategory, indexCategory, editCategory, updateCategory, getCategory, getEditCategory, getMeta, getIndex, getErrMsg, deleteCategory, updatePublish };
});