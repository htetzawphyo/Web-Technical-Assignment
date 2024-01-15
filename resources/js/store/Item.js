import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import cookie from '../composables/cookie.js';

export const useItemStore = defineStore('itemStore', () => {
    // TOKEN
    const token = cookie.getCookie('accessToken');

    // ROUTER
    const router = useRouter();

    //STATE
    const item = ref();
    let metas = ref([]);
    const edit_item = ref();
    const errMsg = ref([]);

    //GETTER
    const getItem = computed(() => {
        return item.value;
    });
    const getMeta = computed( () => {
        return metas.value;
    })
    const getIndex = computed( () => {
        return metas.value.from;
    })

    const getEditItem = computed(() => {
        return edit_item.value;
    })

    const getErrMsg = computed( () => {
        return errMsg.value;
    })

    //ACTION
    const indexItem = (page=1) => {
        axios.get(`/api/items?page=${page}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then( response => {
            item.value = response.data.data;
            metas.value = response.data.meta;
        })
        .catch( error => {
            console.log(error)
        })
    }

    const addItem = (item) => {
        axios.post(`/api/items`, item, {
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
			}
        })
        .then( response => {
            router.push({name: 'item'});
        })
        .catch( error => {
            if(error.response.data.errors){
                errMsg.value = error.response.data.errors;
            }
        })
    }

    const editItem = (id) => {
        axios.get(`/api/items/${id}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then( response => {
            let result = response.data
            
            // For change 1 or 0 => true or false
            result.publish == 1 ? result.publish = true : result.publish = false;
            
            // For contact_number
            const hyphenIndex = result.contact_number.indexOf('-');
            let country_code = result.contact_number.slice(0, hyphenIndex);
            let contact_number = result.contact_number.slice(hyphenIndex + 1);
            
            result.contact_number = contact_number;
            result['country_code'] = country_code;

            edit_item.value = response.data;
        })
        .catch( error => {
            console.log(error)
        })
    }

    const updateItem = (id, formData) => {
        axios.post(`/api/items/${id}`, formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then( response => {
            // console.log(response)
            router.push({name: 'item'});
        })
        .then( error => {
            if(error.response.data.errors){
                errMsg.value = error.response.data.errors;
            }
        })
    }

    const updatePublish = (id) => {
        axios.patch(`/api/items/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then( response => {
            indexItem();
        })
        .then( error => {
            console.log(error)
        })
    }

    const deleteItem = (id) => {
        axios.delete(`/api/items/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then( response => {
            indexItem();
        })
        .then( error => {
            console.log(error)
        })
    }

    return { getItem, indexItem, addItem, editItem, updateItem , updatePublish, deleteItem, getEditItem, getErrMsg, getMeta, getIndex};
})