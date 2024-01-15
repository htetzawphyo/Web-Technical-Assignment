<template>
    <Navbar />
    <Sidebar />
  
    <div class="p-6 mt-12 md:ml-64">
        <h1 class="text-md text-indigo-500" id="header">Category</h1>
  
        <div class="flex justify-end">
            <router-link :to="{ name: 'category-add' }" class="bg-indigo-500 px-6 pb-2 pt-2.5 text-xs rounded-md text-neutral-200">
              <font-awesome-icon icon="fa-solid fa-plus" />
              Add Category
            </router-link>
        </div>
  
        <div v-if="getCategory" class="mt-5">
            <table class="w-full text-sm text-left text-gray-800 mb-5">
                <thead class="text-xs text-gray-700 uppercase bg-indigo-500 ">
                    <tr>
                        <th scope="col" class="pl-2 text-center py-3 ">
                            Action
                        </th>
                        <th scope="col" class="px-6 py-3">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Publish
                        </th>
                    </tr>
                </thead>
                <tbody class="">
                    <tr v-for="(category, index) in getCategory" :key="index" class="bg-white border-b  hover:bg-indigo-100 " >
                        <th scope="row" class="w-6 ml-2 text-center py-4 font-medium text-gray-900 flex items-center gap-2">
                            <div class="cursor-pointer bg-green-600 p-1 rounded-md">
                                <router-link :to="{ name: 'category-edit', params:{id: category.id} }">
                                    <font-awesome-icon icon="fa-solid fa-pen-to-square" class="w-8 h-4 text-neutral-200 hover:cursor-pointer"/>
                                </router-link>
                            </div>
                            <div class="cursor-pointer bg-red-600 p-1 rounded-md" @click="handleDeleteClick(category.id)">
                                <font-awesome-icon icon="fa-solid fa-trash" 
                                class="w-8 h-4 text-neutral-200 hover:cursor-pointer"/>
                            </div>
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap ">
                            {{ getIndex + index }}
                        </th>
                        <td class="px-6 py-4 font-medium  whitespace-nowrap">
                            {{ category.name }}
                        </td>
                        <td class="px-6 py-4 flex">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer" :checked="category.publish" @change="updatePublish(category.id)">
                                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>    
            
            <Pagination :meta="getMeta" @updatePage="handlePageUpdate"/>
        </div>
    </div>
</template>

<script setup>
    import Navbar from '../../components/Navbar.vue';
    import Sidebar from '../../components/Sidebar.vue';
    import Pagination from '../../components/Pagination.vue';
    import { ref, onMounted } from 'vue';
    import { useCategoryStore } from '../../store/Category';
    import { storeToRefs } from 'pinia';

    const categoryStore = useCategoryStore();
    const { getCategory, getMeta, getIndex } = storeToRefs(categoryStore);

    categoryStore.indexCategory();

    const handlePageUpdate = (currentPage) => {
        categoryStore.indexCategory(currentPage)
    }

    const updatePublish = (id) => {
        categoryStore.updatePublish(id);
    }

    const handleDeleteClick = (id) => {
        confirm('Are you sure you want to Delete?') ? categoryStore.deleteCategory(id) : '';
    }
</script>

<style scoped>

</style>